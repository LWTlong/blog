---
title: sequelize-cli
order: 4
#article: false
category:
    - koa
    - mysql
    - sequelize
tag:
  - sequelize
---

关于 `sequelize` 更推荐使用 `sequelize-cli` 工具。

因为后续有字段添加，表格添加，`sequelize` 同步会清空掉数据库的数据，这肯定不符合需求。

`sequelize-cli` 能辅助创建模型，和数据库同步。并且支持回滚。

具体使用看这里：

[官方介绍](https://www.sequelize.cn/other-topics/migrations#%E5%AE%89%E8%A3%85-cli)

[Egg 里的介绍也挺清晰](https://www.eggjs.org/zh-CN/tutorials/sequelize#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)


## 初始化

在项目根目录下创建 `.sequelizerc` 文件。

```javascript
const path = require('path');
module.exports = {
    config: path.join(__dirname, 'database/config.json'),
    'migrations-path': path.join(__dirname, 'database/migrations'),
    'seeders-path': path.join(__dirname, 'database/seeders'),
    'models-path': path.join(__dirname, 'src/db/models'),
}
```

路径自己看着配置就行。

### ``config`` 

数据库连接的配置。 时间如果有相差8小时，需要添加时区的配置。

```json
{
  "timezone": "+08:00",
  "dialectOptions": {
    "dateStrings": true,
    "typeCast": true
  }
}
```

### ``migrations-path`` 

变更记录的文件。

#### 创建表

创建一张表，以及主键和外键。

```javascript
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fileName: {
        type: Sequelize.STRING
      },
      mimetype: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};
```

#### 添加和修改表字段

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('markers', 'userId', {
      type: Sequelize.INTEGER,
      comment: '关联用户',
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })

    await queryInterface.changeColumn('markers', 'latitude', {
      type: Sequelize.DataTypes.FLOAT,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('markers', 'userId');

    await queryInterface.changeColumn('markers', 'latitude', {
      type: Sequelize.DataTypes.INTEGER,
    });
  }
};
```

### `seeders-path`

种子文件路径，可以用来生成初始数据和测试数据。

### `models-path`

模型路径，数据库查询需要使用模型对象。

## 模型

数据模型对象，使用查询数据库 API 的时候需要使用模型对象。包括定义数据库字段类型。以及外键约束等。

```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  File.init({
    fileName: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'File',
  });

  File.associate = function(models) {
    // associations can be defined here
    File.belongsTo(models.Marker, {
      foreignKey: 'markerId'
    })
  };

  return File;
};
```

## 常用命令

#### 生成变更文件

当数据库有迭代的时候，可以生成一个变更文件。

```shell
npx sequelize migration:generate --name your-chage-record-name
```

#### 执行升级到数据库

编辑了变更文件后，需要执行同步到数据库。

```shell
npx sequelize db:migrate
```

同步到远程

```shell
npx sequelize db:migrate --env production 
```

#### 撤销升级

当同步的变更需要回滚，撤销上一次的变更：

```shell
npx sequelize db:migrate:undo
```

撤销所有变更：

```shell
npx sequelize db:migrate:undo:all
```

#### 创建模型

初始化完成后，需要创建数据模型：

```shell
npx sequelize model:generate --name User --attributes userName:string,password:string
```
