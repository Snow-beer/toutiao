<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="form" :model="user" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop='checked'>
          <el-checkbox v-model="user.checked" 
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            :loading="loginloding"
            type="primary"
            @click="onLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: "LoginIdex",
  components: {},
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
        checked: false,
      },

      loginloding: false,
      rules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        checked: [
          {
            validator: (rele, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请同意用户协议"));
              }
            },
            trigger: 'change'
          },
        ],
      },
    };
  },
  methods: {
    //登陆btn点击事件
    onLogin() {
      const user = this.user;
      //验证rules是否通过
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          //验证失败
          return;
        } else {
          //验证通过
          this.login();
        }
      });
    },

    //登陆方法
    login() {
      this.loginloding = true;
      // 验证通过，提交登录
      login(this.user).then((res) => {
          // 登录成功
          this.loginloding = false;
          //储存本地loken
          window.localStorage.setItem('user', JSON.stringify(res.data.data))
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success",
          });
          this.$router.push({ name : 'home'})
        })
        .catch((err) => {
          this.loginloding = false;
          //登录失败
          this.$message({
            message: "请输入正确的账号验证码",
            type: "error",
          });
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