import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { getDirname, path } from 'vuepress/utils';

const __dirname = getDirname(import.meta.url);


export default defineUserConfig({
  base: '/',

  lang: 'zh-CN',
  title: '人生何处不青山',
  description: 'vuepress-theme-hope 的博客演示',

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
