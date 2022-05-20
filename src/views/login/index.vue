<template>
  <div class="login-container">
    <el-image class="loginBackground" :src="require('@/assets/img/login.png')" fit="fill" />
    <div class="loginFormOther">
      <el-image class="textLogin" :src="require('@/assets/img/newR.png')" fit="fill" />

      <div class="title-container">
        <h3 class="title">对党忠诚 纪律严明 赴汤蹈火 竭诚为民</h3>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="right" label-width="120px">
        <div class="formTopText">
          <el-image style="width:60px;margin-right:5px;" :src="require('@/assets/img/logo.jpeg')" fit="fill" />
          <div>消防执法营商环境监督系统</div>
        </div>
        <el-divider class="loginDivider" />
        <el-form-item prop="username" label="用户名">
          <el-input ref="username" v-model="loginForm.username" placeholder="输入用户名" name="username" tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="输入密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item label="验证码">
          <drag-verify ref="dragVerify" :width="300" radius="0" :is-passing.sync="isPassing" text="请向右滑块拖动" success-text="验证通过" handler-icon="el-icon-d-arrow-right" success-icon="el-icon-circle-check" />
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button :loading="loading" type="danger" size="small" style="text-indent:20px;letter-spacing:20px;font-size:16px;" @click.native.prevent="handleLogin">登入</el-button>
        </el-form-item>
        <div class="forget-password">
          <el-link :underline="false">忘记密码？</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import dragVerify from 'vue-drag-verify2'

export default {
  name: 'Login',
  components: {
    dragVerify
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于六位'))
      } else {
        callback()
      }
    }
    return {
      msg: '',
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: false, trigger: 'blur', validator: validateUsername }],
        password: [{ required: false, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      isPassing: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      if (this.isPassing) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$message({
          message: '未验证',
          type: 'error'
        })
      }
    },
    // passcallback () {
    //   console.log(this.isPassing)
    //   this.$message({
    //     message: '验证通过',
    //     type: 'success'
    //   })
    // },
    reset () {
      this.isPassing = false
      this.$refs.dragVerify.reset()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  .el-input {
    // display: inline-block;
    // height: 47px;
    width: 300px;
    border-radius: 0px;
    color: $light_gray;
    .el-input__inner {
      border-radius: 0px;
    }
  }
  .el-button {
    width: 300px;
    margin-bottom: 30px;
    margin-left: 20px;
    border-radius: 0px;
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    // border-radius: 5px;
    // color: #454545;
    margin: 20px;
    .el-form-item__label {
      padding-right: 30px;
    }
  }
  .loginDivider {
    margin: 16px 0 30px;
  }
}

.verifybox {
  display: flex;
}
.dv_handler {
  border: 1px solid rgba(238, 238, 238, 1) !important;
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #b8860b;

.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover;
  box-sizing: border-box;
  z-index: 1;

  .login-form {
    position: relative;
    width: 600px;
    z-index: 1001;
    padding: 20px 30px;
    border-radius: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 1001;
    background-color: rgba(255, 255, 255, 1);
  }

  // 对党忠诚 纪律严明 赴汤蹈火 竭诚为民
  .title-container {
    z-index: 1001;
    margin-top: 20px;
    .title {
      font-size: 24px;
      color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: 900;
      letter-spacing: 2px;
    }
  }
}
// 居中的大框
.loginFormOther {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
}
// 背景
.loginBackground {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100vh;
}
// 新时代新征程
.textLogin {
  z-index: 1001;
  width: 750px;
}
// 表单顶上的文字
.formTopText {
  width: 100%;
  font-size: 24px;
  line-height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: Source-Han-Serif-CN-Bold;
  color: #931621;
}
.forget-password {
  position: absolute;
  bottom: 7%;
  left: 10%;
  z-index: 1002;
  font-size: 12px;
}
</style>
