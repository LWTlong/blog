import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { getDirname, path } from 'vuepress/utils';

const __dirname = getDirname(import.meta.url);


export default defineUserConfig({
  base: '/',
  dest: path.join(__dirname, '../../dist'),
  lang: 'zh-CN',
  title: 'Long',
  description: 'Long的前端博客，关于javascript,typescript,vue,nodejs,koa2,egg,mysql,mangodb,sequelize,docker,CI/CD的技术记录和踩坑记录',

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
