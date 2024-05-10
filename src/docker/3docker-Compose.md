---
title: Docker compose
order: 3
#article: false
category:
  - 云服务器
tag:
  - docker
---

Docker compose 是 Docker 官方推出的工具，用来管理和共享多个容器的应用。

Mac 和 Windows 假如安装客户端的话，是会自动安装 Docker compose 的。

docker compose 通过一个特殊的 yml 文件，进行配置，这个文件必须命名为 docker-compose.yml

例如，启动一个 mongodb 和一个 nodejs 服务:

首先 nodejs 服务的 Dockerfile:

```yml
FROM node:16-alpine
# 创建文件夹
RUN mkdir -p /usr/src/app
# 指定工作区
WORKDIR /usr/src/app
# 复制项目文件进工作区
COPY . /usr/src/app/
RUN npm install
RUN npm run tsc
RUN npm run build:template:prod
EXPOSE 7001
CMD npx egg-scripts start --title=dadi-server
```

然后在项目根目录创建一个 `docker-compose.yml` 文件:

```yaml
# 版本
version: '3'
# 服务
services:
  #mongo 服务
  dadi-mongo:
    # 基于镜像
    image: mongo
    # 容器名
    container_name: dadi-mongo
    # 数据卷
    volumes:
      - '.docker-volumes/mongo/data:/data/db'
    ports:
      - 27017:27017
  
  # nodejs 服务
  dadi-server:
    # 要依赖于 mongo 服务
    depends_on:
      - dadi-mongo
    # node 需要自己打包
    build:
      # 打包需要操作的上下文
      context: .
      dockerfile: Dockerfile 
    image: dadi-server
    container_name: dadi-server
    ports:
      - 7001:7001
```

在目录下执行命令:

```bash
docker-compose up -d
```

关闭可以执行：

```bash
docker-compose down
```

其实简单理解就是，把多个容器组合在一起运行，并且能够提供同一个网络。
