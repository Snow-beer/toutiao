<template>
  <div>
    <el-container class="layout-container">
      <el-aside width="200px" class="aside">
        <Aside class="aside-menu"></Aside>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <div>
            <i class="el-icon-s-fold"></i>
            <span>头条管理系统</span>
          </div>

          <el-dropdown>
            <span class="el-dropdown-link">
              <span>{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
            <!-- 路由出口 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 子路由出口 -->
  </div>
</template>

<script>
// import Home from '@/views/home'
import Aside from "./component/aside";
// import { login } from '@/api/user'
import { getUserProfile } from "@/api/user"

export default {
  data() {
    return {
        user: {}
    };
  },
  components: {
    Aside,
  },
  methods: {
      loadUserProfile(){
          getUserProfile().then(res =>{
              this.user = res.data.data
              console.log(this.user)
          })
      }
  },
  created(){
    this.loadUserProfile()
    console.log(getUserProfile())
  }
};
</script>

<style scoped lang='less'>
.layout-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // background-color: pink;
    border-bottom: 1px solid #ccc;
  }
  .aside {
    background-color: #555;
    .aside-menu {
      height: 100%;
    }
  }
}
</style>