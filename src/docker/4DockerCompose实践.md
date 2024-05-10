---
title: 实践
order: 4
#article: false
category:
  - 云服务器
tag:
  - docker
---

实践参数:
- 服务器：`CenterOS 7.9`
- 后端程序：`Nodejs-egg`
- 数据库：`mongodb`
- 内存存储：`redis`


## 安装

根据官网说明，如果是 windows 和 mac 在安装 docker 软件的时候，会自动安装 docker compose。

如果是 linux 服务器，需要单独安装。

### 安装 docker

进入服务器，最好用 root 权限的用户，执行

```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

或许有一些需要你确认的，根据提示选择 y 或者其他, 安装完成后不会启动，需要手动去启动

```bash
sudo systemctl start docker
# 或者
sudo service docker start
```

到此，安装完毕。

### 安装 docker compose

docker compose 需要单独的安装。安装也很简单：

首先可以查看最[新的版本](https://github.com/docker/compose/releases), 然后执行:

```bash
curl -L "https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

如果版本号太老，查看最新版本，然后替换版本号就行。

下载完成后，给目录授权，执行：

```bash
chmod +x /usr/local/bin/docker-compose
```

测试是否安装好:

```bash
Docker Compose version
```

弹出版本号即可。

### 安装完成后的操作

在安装完成了 docker 和 docker compose 后，还需要一些操作才能很好的使用。

#### 以非 root 用户身份管理 Docker

首先就是用户授权，很可能使用服务器登录的用户不是 root 用户，就需要把用户添加到 docker 组里

```bash
sudo usermod -aG docker $USER
```

如果没有 docker 这个组，创建一个就好了

```bash
sudo groupadd docker
```

注销并重新登录，以便重新评估您的组成员身份。 重新登录后，可以执行:

```bash
groups
```

看使用的登录用户是否添加了 docker 组。

#### 将 Docker 配置为使用 systemd 启动时启动

如果期望 docker 随着服务器启动时就自动启动，执行:

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

如果要停止自动启动

```bash
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```

## docker compose

### 打包服务镜像

首先需要打包服务程序镜像，以 Nodejs Egg 为例，在项目根目录创建 Dockerfile 文件.

Dockerfile:

```dockerfile
# 使用 node v20 alpine 镜像， alpine 体积会更小
FROM node:20-alpine
# 创建一个文件夹作为工作区
RUN mkdir -p /usr/src/app
# 定义工作区
WORKDIR /usr/src/app
# 拷贝项目文件进入工作区
COPY . /usr/src/app
# 安装依赖
RUN npm install --registry=https://registry.npmmirror.com
# 运行相关程序相关命令
RUN npm run tsc
RUN npm run build:template:prod
# 端口
EXPOSE 7001
# 启动执行的命令
CMD npx egg-scripts start --title=dadi-server
```

打包的文件，肯定需要忽略的，因为我们直接在镜像中安装依赖了，还有一些不需要打包的文件，
例如，我的项目使用 ts 编写的，执行 tsc 后，只需要打包对应的 js 文件即可，那么可以创建一个 `.dockerignore` 的文件来忽略你不想打包到镜像里的文件

这里打包，我推荐使用阿里云的ACR，[阿里云ACR](https://cr.console.aliyun.com/cn-hangzhou/instances)

如果不使用，也可以直接打包

```bash
docker build -t [image-name] [context]
# 例如 我在项目根目录
docker build -t my-serve .
```

#### 如果使用阿里云的ACR，跟随操作指南即可。

首先就是需要登录阿里云ACR：

```bash
docker login --username=[aliyun-username] registry.cn-hangzhou.aliyuncs.com
```

密码为开通服务时设置的密码。

将镜像推送到Registry

```bash
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/longwt/dadi:[镜像版本号]
docker push registry.cn-hangzhou.aliyuncs.com/longwt/dadi:[镜像版本号]
```

请根据实际镜像信息替换示例中的 ImageId 和 镜像版本号 参数。


### mongodb

服务打包好了，需要配置 mongodb 的权限验证，希望 mongodb 的连接需要密码。

docker mongo 里面说明，可以在 `mongo-entrypoint` 文件夹下定义启动时初始化 mongo 的脚本，接受 `*.js` `*.sh` 等等文件。

我这里使用 sh 来初始化 mongo

首先在项目目录下，创建一个 `mongo-entrypoint` 文件夹，然后里面放一个 `setup.sh` 的文件：

`mongo-entrypoint/setup.sh`:

```shell
#!/bin/bash
# shell脚本中发生错误，即命令返回值不等于0，则停止执行并退出shell
set -e
# <<EOF 表示一下命令作为子命令执行，直到碰见 EOF 结束
mongosh <<EOF
use admin
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')
use dadi
db.createUser({
  user:'$MONGO_DB_USERNAME',
  pwd:'$MONGO_DB_PASSWORD',
  roles: [{
    role: 'dbOwner',
    db: 'dadi'
  }]
})
EOF
```

这里需要注意，你的目标数据库不能写错，不然会导致你的后端程序无法连接到对应的数据库。而且我这里的用户密码是使用了环境变量，可以自己在根目录添加一个 `.env` 文件，或者你直接写对应的用户密码也可以。

> [!tip]
> 这里需要注意的是，老版本的 docker mongo 使用的命令是 `mongo`, 新版后使用的 `mongosh`， 如果出现命令不存在的报错，可以换一个命令试试
>
> 这里我先在 admin 里面配置了一个 root 权限的用户，接着在业务数据库里面配置了一个有读写权限的用户，后来查资料，发现不用在 admin 里面定也可以，直接在目标数据库添加用户即可。这里我后面懒得删了，反正没影响。
>
> 如果你定义了 `volumes` 并且已经生成了对应文件夹，那么初始化的配置脚本不会被执行，所以如果你的初始化脚本出现了问题，你也许需要先删除对应的 `volumes` 文件夹。

### 运行 docker compose

前面工作都准备好了，在项目根目录下创建一个 `docker-compose.yml` 的文件。

`docker-compose.yml`:

```yml
# 使用 compose 3 版本
version: '3'
# 需要的服务
services:
  # mongo 服务, 这里名称最好和里面统一
  dadi-mongo:
    # 镜像
    image: mongo
    # 容器名称 这个很重要
    container_name: dadi-mongo
    # 数据映射
    volumes:
      - '.docker-volumes/mongo/data:/data/db'
      - '$PWD/mongo-entrypoint/:/docker-entrypoint-initdb.d/'
    ports:
      - 27017:27017
    # 环境变量文件
    env_file:
      - .env
  # redis 服务
  dadi-redis:
    image: redis:6
    container_name: dadi-redis
    # 设置密码 从环境变量中取
    command: >
      --requirepass ${REDIS_PASSWORD}
    ports:
      - 6379:6379
    env_file:
      - .env

  # 后端程序
  dadi-server:
    # 表示需要依赖 mongo 和 redis 服务
    depends_on:
      - dadi-mongo
      - dadi-redis
    # 镜像，我使用的阿里云的ACR
    image: registry.cn-hangzhou.aliyuncs.com/longwt/dadi:[version]
    container_name: dadi-server
    ports:
      - 7001:7001
    env_file:
      - .env
```

有了 `docker-compose.yml` 文件后，先别着急运行，先去后端程序里面修改 `mongodb` 和 `redis` 的连接配置。

连接的配置，就是 `docker-compose.yml` 里的 `container_name` 值， docker 在内部会自动解析出对应的地址。

例如 mongodb 的连接配置:

```text
url: 'mongodb://dadi-mongo:27017/dadi
```

需要连接的服务都修改了，再运行 docker compose

> [!warning]
> 一定要注意修改对应的服务连接配置。修改为 docker 定义的容器名，否则程序会无法连接上对应的服务。

此时执行:

```bash
docker-compose -f docker-compose.yml up -d
```

`-f` 表示指定文件来执行。

这个时候，就可以了，测试一下，访问 `7001` 端口：

```bash
curl 127.0.0.1:7001/test
```

就会得到后端程序测试接口返回的内容，表示已经成功。

## 最后

docker 的出现，让我们部署服务不在需要手动的在服务器上安装各种软件。更加方便服务的扩展，也被大量的应用在微服务的架构体系里。


