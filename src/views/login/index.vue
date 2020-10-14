<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="form" :model="user">
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" 
          :loading="loginloding"
          type="primary" @click="onLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.js";

export default {
  name: "LoginIdex",
  components: {},
  data() {
    return { 
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      checked: false,
      loginloding: false
    };
  },
  methods: {
    onLogin() {
      const user = this.user
      this.loginloding = true
      // 验证通过，提交登录
      request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        // data 用来设置 POST 请求体
        data: user,
      }).then((res) => {
        // 登录成功
        this.loginloding = false
        console.log(res);
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
        
      }).catch(err =>{
        this.loginloding = false
        //登录失败
        this.$message({
          message: '请输入正确的账号验证码',
          type: 'error'
        })
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        // background: url("./logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>