import { navbar } from 'vuepress-theme-hope';

export default navbar([
  '/',
  // '/demo/',
  {
    text: 'JavaScript',
    link: '/JavaScript/',
  },
  {
    text: 'TypeScript',
    link: '/typescript/',
  },
  {
    text: 'Vue',
    link: '/vue/',
  },
  {
    text: 'webpack',
    link: '/webpack/',
  },
  {
    text: '设计模式',
    link: '/设计模式/',
  },
  {
    text: 'Nodejs',
    link: '/nodejs/',
  },
  {
    text: 'Koa2',
    link: '/koa2/',
  },
  {
    text: 'Egg',
    link: '/egg/',
  },
  {
    text: '性能优化',
    link: '/性能优化/',
  },
  {
    text: '数据库相关',
    children: [
      {
        text: 'mongodb',
        link: '/mongodb/'
      },
      {
        text: 'MySql',
        link: '/MySql/'
      },
      {
        text: 'sequelize',
        link: '/sequelize/'
      }
    ]
  },
  {
    text: 'docker',
    link: '/docker/',
  },
  {
    text: '服务器和自动部署',
    link: '/服务器和自动部署/',
  },
  {
    text: '杂项',
    link: '/杂项/',
  },
  // {
  //   text: 'uni-app',
  //   link: '/uni-app/',
  // },
  // {
  //   text: '博文',
  //   icon: 'pen-to-square',
  //   prefix: '/posts/',
  //   children: [
  //     {
  //       text: '苹果',
  //       icon: 'pen-to-square',
  //       prefix: 'apple/',
  //       children: [
  //         { text: '苹果1', icon: 'pen-to-square', link: '1' },
  //         { text: '苹果2', icon: 'pen-to-square', link: '2' },
  //         '3',
  //         '4',
  //       ],
  //     },
  //     {
  //       text: '香蕉',
  //       icon: 'pen-to-square',
  //       prefix: 'banana/',
  //       children: [
  //         {
  //           text: '香蕉 1',
  //           icon: 'pen-to-square',
  //           link: '1',
  //         },
  //         {
  //           text: '香蕉 2',
  //           icon: 'pen-to-square',
  //           link: '2',
  //         },
  //         '3',
  //         '4',
  //       ],
  //     },
  //     { text: '樱桃', icon: 'pen-to-square', link: 'cherry' },
  //     { text: '火龙果', icon: 'pen-to-square', link: 'dragonfruit' },
  //     'tomato',
  //     'strawberry',
  //   ],
  // },
  // {
  //   text: 'V2 文档',
  //   icon: 'book',
  //   link: 'https://theme-hope.vuejs.press/zh/',
  // },
]);
