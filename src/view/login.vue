<template>
  <div class="fill-contain">
    <vue-particles class="login-background"
                   color="#dedede"
                   :particleOpacity="0.7"
                   :particlesNumber="80"
                   shapeType="circle"
                   :particleSize="4"
                   linesColor="#dedede"
                   :linesWidth="1"
                   :lineLinked="true"
                   :lineOpacity="0.4"
                   :linesDistance="150"
                   :moveSpeed="3"
                   :hoverEffect="true"
                   hoverMode="grab"
                   :clickEffect="true"
                   clickMode="push"
    >
    </vue-particles>
    <div class="container">
      <div class="form-position">
        <div style="margin: 0 auto;text-align: center;margin-bottom: -15px;">
          <img class="logo-style" src="../assets/img/largePE.png" />
        </div>
        <div class="form-container">
          <div class="form-container-border">
            <div style="margin: 10px auto;text-align: center;">
              <p style="font-size: 24px;text-align: center">登&nbsp;&nbsp;&nbsp;录</p>
            </div>
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm"  v-show="!VRCODE">
              <el-form-item prop="schoolId">
                <el-select style="width: 100%;" v-model="loginForm.schoolId" filterable placeholder="请选择学校">
                  <el-option v-for="(item,index) in schoolList"
                             :key="index"
                             :label="item.schoolName"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="usernumber">
                <el-input v-model="loginForm.usernumber" placeholder="请输入学号" clearable></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password clearable></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 10px;">
                <p class="login-text-btn" style="float: left;" @click="show">扫码登录</p>
                <p class="login-text-btn" style="float: right;" @click="setPasswordDialogVisible  = true">忘记密码？</p>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%; float: left;" @click="login('loginForm')" :disabled="loginDisable">登录</el-button>
              </el-form-item>
            </el-form>
            <div v-show="VRCODE">
              <div class="form-row">
                <img src="../assets/img/PE.png" alt="">
              </div>
              <p class="form-row login-text-btn" @click="show">返回账号登录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog width="400px" ref="setPasswordDialog" title="密码找回" :visible.sync="setPasswordDialogVisible" :close-on-click-modal="false">
      <el-form :model="setPasswordForm">
        <el-form-item>
          <el-input style="width: 360px;" v-model="setPasswordForm.phoneNumber" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 240px;" v-model="setPasswordForm.code" placeholder="请输入验证码"></el-input>
          <el-button style="width: 115px;" :disabled="isSend" @click.native="sendMsgCode">{{isSend ? countdown + '秒后再发送' : '发送验证码'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 360px;" v-model="setPasswordForm.password" type="password" placeholder="请输入新的密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="setPasswordDialogVisible = false">取消</el-button>
          <el-button style="float: right;" @click.native="setPassword">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      VRCODE: false,
      loginForm: {
        schoolId: null,
        usernumber: null,
        password: null
      },
      loginFormRules: {
        schoolId: [
          {required: true, message: '请选择学校', trigger: 'blur'}
        ],
        usernumber: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      },
      setPasswordForm: {
        phoneNumber: '',
        code: '',
        password: ''
      },
      schoolList: [],
      loginDisable: false,
      setPasswordDialogVisible: false,
      isSend: false,
      countdown: 60,
      timer: null // 计时器
    }
  },
  methods: {
    show () {
      this.VRCODE = !this.VRCODE
    },
    // 获取学校信息列表
    getSchoolList () {
      this.$api.http.get('/school/querySchoolList')
        .then(res => {
          this.schoolList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 发送短信验证码
    sendMsgCode () {
      let endMsRes = (new Date()).getTime() + 60000
      localStorage.setItem('endMsRes', JSON.stringify(endMsRes))
      this.setCountdown(endMsRes)
    },
    // 倒计时方法
    setCountdown (endTime) {
      this.isSend = true
      this.countdown = Math.ceil((endTime - (new Date()).getTime()) / 1000)
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown < 0) {
          this.isSend = false
          this.countdown = 60
          localStorage.removeItem('endMsRes')
          window.clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    setPassword () {
    },
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.loginDisable) {
            this.loginDisable = true
            let url = '/login/login'
            console.log(this.loginForm)
            this.$api.http.post(url, this.loginForm)
              .then(res => {
                console.log(res.data)
                this.loginDisable = false
                var session = JSON.stringify(res.data)
                sessionStorage.setItem('userInfo', session)
                this.$router.push('/home')
              })
              .catch(err => {
                this.loginDisable = false
                console.log(err)
              })
          }
        }
      })
    },
    keyDown (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    }
  },
  destroyed () {
    window.clearInterval(this.timer)
    this.timer = null
  },
  created () {
    let endMsRes = localStorage.getItem('endMsRes')
    endMsRes && this.setCountdown(endMsRes)
    window.addEventListener('keydown', this.keyDown)
  },
  mounted () {
    this.getSchoolList()
  }
}
</script>

<style type="less" scoped>

  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .form-position {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .form-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    height: fit-content;
    width: 550px;
  }

  .form-container-border {
    margin: 0 auto;
    width: 500px;
  }

  .login-background {
    position: absolute;
    height: 100%;
    width: 100%;
    background: url(../assets/img/login/background.jpg) no-repeat;
    background-size:100% 100%;;
  }

  .logo-style {
    width: auto;
    height: 40px;
  }

  .form-row {
    padding: 10px 0;
    /*display: flex;*/
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }

  .title {
    font-size: 24px;
    font-weight: 400;
    padding-bottom: 20px;
  }

  .login-text-btn {
    cursor: pointer;
    font-size: 15px;
    color: #409eff;
    /*float: right;*/
  }

  img {
    width: 350px;
    height: 350px
  }

  @media screen and (max-width: 650px) {
    img {
      width: 100%;
      height: 100%;
    }

    .form-container {
      width: 100%;
    }

    .form-container-border {
      margin: 0 auto;
      width: 200px;
    }
  }
</style>
