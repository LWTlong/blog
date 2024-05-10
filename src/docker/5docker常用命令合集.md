---
title: 常用命令合集
order: 5
#article: false
category:
  - 云服务器
tag:
  - docker
---

```bash
# 查看 docker 运行的容器
docker ps
# 停止容器服务
docker stop [container-name]
# 删除容器
docker rm [container-name]
# 打包镜像
docker build -t [image-name] [context]
# 例如 在项目根目录
docker build -t my-serve .

# docker compose 运行镜像
docker-compose -f docker-compose.yml up -d
# 停止
docker-compose -f docker-compose.yml down
```
