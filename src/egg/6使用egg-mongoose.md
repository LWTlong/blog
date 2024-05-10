---
title: egg-mongoose
order: 6
#article: false
category:
    - Nodejs
    - egg
tag:
  - egg
---


### 安装

```shell
npm install egg-mongoose --save
# 如果 package.json 里面没有安装 mongoose 可能还需要手动安装一下，有则忽略
npm install mongoose --save
```

### 使用

插件注册，在 `config/plugin.ts` 添加配置:

```text
mongoose: {
    enable: true,
    package: 'egg-mongoose',
}
```

配置属性, 在 `config/config.default.ts` 添加配置:

```typescript
config.mongoose = {
    url: 'mongodb://localhost:27017/yourDatabase',
};
```

### 创建数据模型

创建一个 User 模型为例

```typescript
import { Application } from 'egg';
import { Schema } from 'mongoose';

// 定义数据类型接口
export interface UserProps {
  username: string
  password: string
  email?: string
  nickName?: string
  picture?: string
  phoneNumber?: string
  createdAt: Date
  updatedAt: Date
}

// 初始化函数 可以接收一个 app 实例
function initUserModel(app: Application) {
  const UserSchema = new Schema<UserProps>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nickName: { type: String },
    picture: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
  }, { timestamps: true });

  return app.mongoose.model<UserProps>('User', UserSchema);
}
```

### 类型定义

当创建了 `app/model/user.ts` 的时候，会自动生成类型定义文件 `typing/app/model/index.d.ts`, 但是还是需要手动的重载定义

在 `typing/index.d.ts` 里扩展 `MongooseModels` 类型：

```typescript
declare module 'egg' {
    interface MongooseModels extends IModel {
        [key: string]: Model<any>
    }
}
```


### toJSON transform 过滤字段

假如我们查询 user 信息的时候，不想返回一些字段给用户，比如 `password`，可以在 Schema 中通过 `toJSON` 属性来过滤：

```typescript
 const UserSchema = new Schema<UserProps>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nickName: { type: String },
    picture: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
}, { timestamps: true, toJSON: {
    // 当文档模型调用 toJSON 方法的时候，过滤一些字段
    transform(_doc, ret) {
        delete ret.password;
        delete ret.__v;
    },
} });
```

直接把不需要的删除就好了，再 controller 里面返回数据的时候, 使用文档对象调用 `toJSON` 方法即可

```typescript
ctx.helper.success({ ctx, res: user.toJSON(), msg: '登录成功！' });
```

### 添加 id 并且自增

如果不想使用 mongodb 自带的特殊 `_id`，想自己添加一个 `id` 字段并且实现自增，可以通过插件来实现

``mongoose-sequence`` 插件

```shell
npm install mongoose-sequence --save
```

使用也很简单，Schema 对象有个 `plugin` 方法，调用方法传入插件即可。

```typescript
// 导入它的工厂函数，并且传入 mongoose 连接
const AutoIncrement = AutoIncrementFactory(app.mongoose);
// ....一些操作 比如定义 Schema
// 添加自增字段 字段名 id, 第二个 id 是插件实例 id，防止冲突
UserSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'users_id_counter' });
```
