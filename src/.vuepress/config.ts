import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { getDirname, path } from 'vuepress/utils';

const __dirname = getDirname(import.meta.url);


export default defineUserConfig({
  base: '/blog/',
  dest: path.join(__dirname, '../../dist'),
  lang: 'zh-CN',
  title: 'Long',
  description: 'Long的前端博客，关于javascript,typescript,vue,nodejs,koa2,egg,mysql,mangodb,sequelize,docker,前端博客,前端技术',

  theme,

  alias: {
    '@theme-hope/modules/blog/components/BlogHero': path.resolve(
      __dirname,
      './components/BlogHome.vue'
    ),
  },

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
