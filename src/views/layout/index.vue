<template>
  <div>
    <el-container class="layout-container">
      <el-aside width="auto" class="aside">
        <Aside class="aside-menu" :iscollapse="iscollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <div>
            <i :class="{
              'el-icon-s-fold': iscollapse,
              'el-icon-s-unfold': !iscollapse
            }" 
            
            @click="iscollapse = !iscollapse"></i>
            <span>头条管理系统</span>
          </div>

          <el-dropdown>
            <span class="el-dropdown-link">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
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
import Aside from "./component/aside";
import { getUserProfile } from "@/api/user";

export default {
  data() {
    return {
      user: {},
      iscollapse: true,
    };
  },
  components: {
    Aside,
  },
  methods: {
    loadUserProfile() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
        console.log(this.user);
      });
    },
    logout() {
       this.$confirm('确认退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem('user')
          this.$router.push('/login')
          ;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
    }
  },
  created() {
    this.loadUserProfile();
    console.log(getUserProfile());
  },
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