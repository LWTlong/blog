---
title: MySql 的概念和简介
order: 1
article: false
category:
  - koa
  - mysql
tag:
  - mysql
---

## 概念

MySql 开源的关系型数据库。基本上哪怕不熟悉。至少也是听说过的。

安装也不说了，官网直接下载安装就行了，然后工具的话，直接用 MySql 自己的 Workbench 也挺好。

默认数据库也不说了。

## SQL 语句分类

`SQL`:  是用于与关系型数据库进行交互的命令或指定，用于执行各种数据库相关的操作。

`CREATE`:  创建

`SELECT`:  读取

`UPDATE`:  更新

`DELETE`:  删除

`DQL`:  Data Query Language, 数据查询语言，用于查询数据库中的数据，常见的 `SELECT` 。

`DML`:  Data Manipulation Language, 数据操作语言，例如插入、更新、删除等。常见的有 `INSERT` `UPDATE` `DELETE` 等。

`DDL`:  Data Definition Language, 数据定于语言，定义和管理数据库对象。常见的有 `CREATE` `ALTER` `DROP` 等。

`DCL`:  Data Control Language, 数据控制语言，用于用户权限和安全方面。常见的有 `GRANT` `REVOKE` 等。

`TCL`:  Transaction Control Language, 事务控制语言，用于事务提交与回滚。常见的有 `COMMIT` `ROLLBACK` `SAVEPOINT` 等。

## 数据类型

MySql 常用数据类型, 这里写出来的，只是部分举例，并不是标准，全部的类型和范围，还是参考文档规范来。

- 数字类型： `INT` `BIGINT`
- 字符串类型: `CHAR(N)` `VARCHAR(N)` `TEXT`
- 日期和时间类型: `YEAR` `DATE` `TIME` `DATETIME`
- 空间类型
- JSON类型

