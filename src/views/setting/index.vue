<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="13">
            <el-form ref="form" :model="user" label-width="80px">
                <el-form-item label="编号"> {{user.id}}</el-form-item>
                <el-form-item label="手机"> {{user.mobile}}</el-form-item>
                <el-form-item label="媒体名称">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍">
                    <el-input el-input v-model="user.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="user.email"></el-input>
                </el-form-item> 
                <el-form-item>
                    <el-button type="primary" @click="handleUserinfo">保存设置</el-button>
                </el-form-item> 
         
            </el-form>
        </el-col>
        <el-col :span="8" :offset="2">
            <el-avatar 
            
            :size="150" 
            shape='square'
            :src="user.photo"></el-avatar>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getUserProfile, editUser } from '@/api/user.js'
export default {
  name: "SettingIndex",
  data() {
    return {
  
      user:{}
    };
  },
  created(){
      this.getUserinfo()
  },
  methods: {
   
    getUserinfo(){
        getUserProfile().then(res =>{
            this.user = res.data.data
        })
    },
    handleUserinfo(){
        
        editUser(this.user).then(res =>{
            
        })
    }
  },
};
</script>

<style>
</style>