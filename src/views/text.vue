<template>
  <div>
    <el-tiptap v-model="content" :extensions="extensions" />
  </div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
// import { ElementTiptapPlugin } from 'element-tiptap';
// 引入 ElementUI 样式
import 'element-ui/lib/theme-chalk/index.css';
// import element-tiptap 样式
import 'element-tiptap/lib/index.css';

// 安装 ElementUI 插件
Vue.use(ElementUI);
// 安装 element-tiptap 插件
Vue.use(ElementTiptapPlugin, { /* 插件配置项 */ });
// 现在你已经在全局注册了 `el-tiptap` 组件。
import {
  // 需要的 extensions
  ElementTiptapPlugin,
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
} from "element-tiptap";

export default {
  components: {
    'el-tiptap': ElementTiptap,
  },
  data() {
    // 编辑器的 extensions
    // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
      // 编辑器的内容
      content: `
        <h1>Heading</h1>
        <p>This Editor is awesome!</p>
      `,
    };
  },
};
</script>