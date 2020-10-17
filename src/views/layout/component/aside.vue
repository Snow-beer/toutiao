<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse='iscollapse'
  >
    <el-menu-item index="/">
      <i class="el-icon-setting"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-chat-line-square"></i>
      <span slot="title">内容管理 </span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-picture"></i>
      <span slot="title">素材管理 </span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-s-promotion"></i>
      <span slot="title">发布文章 </span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-chat-dot-round"></i>
      <span slot="title">评论管理 </span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-present"></i>
      <span slot="title">粉丝管理 </span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置 </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  props: ['iscollapse']
};
</script>

<style>
</style>