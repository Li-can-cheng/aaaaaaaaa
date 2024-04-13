<template>
  <div class="body">
    <div class="content">
      <div class="left">
        <img src="@/assets/login/img2.png" class="people p-animtion"
             alt="people">
        <img src="@/assets/login/img1.png" class="sphere s-animtion"
             alt="sphere">
      </div>
      <div class="right">
        <div class="form-wrappepr">
          <div style="display: block;width: 100%;">
            <h1 style="margin-bottom: 5vh;font-weight: bold;display: block;"
                v-if="pageType === 0">欢迎进入职位推荐系统
            </h1>
            <h1 style="margin-bottom: 5vh;font-weight: bold;display: block;"
                v-if="pageType === 1">欢迎进行用户注册</h1>
          </div>
          <el-form class="login-form" :rules="loginRules" ref="loginForm"
                   :model="loginForm" label-width="0"
                   v-if="pageType === 0"
          >
            <input type="text" class="inputs user" placeholder="请输入用户名"
                   v-model="loginForm.username">
            <input type="password" class="inputs pwd" placeholder="请输入密码"
                   v-model="loginForm.password">

            <div style="display: flex;margin: 0px;padding: 0px;">
              <input type="text" class="inputs user" placeholder="请输入验证码"
                     v-model="loginForm.verificationCode"
                     style="display: flex;margin: 0px;"
              >
              <el-tooltip class="item" effect="dark"
                          content="验证码看不清？点击图片可以刷新"
                          placement="right-end">
                <img :src="'data:image/png;base64,' + verifyCodeImg" alt="image"
                     style="border-radius: 10px;margin-left: 20px;"
                     @click="freshVerificationCode()"
                />
              </el-tooltip>
            </div>

            <div style="margin-top: 30px;">
              <span class="tips">忘记密码</span>
            </div>

            <button v-if="pageType === 0" @click="handleLogin()"
                    class="custom-button">登 录
            </button>

            <div>
                            <span style="float: left">
                                <el-button type="text"
                                           @click="enterEnterpriseRegist()">企业注册</el-button>
                            </span>
              <span style="float: right">
                                没有账号？<el-button type="text"
                                                    @click="enterRegister()">点击注册</el-button>
                            </span>
            </div>


          </el-form>

          <!-- 注册表单 -->
          <el-form class="regist-form" :rules="loginRules" ref="registForm"
                   :model="registForm" label-width="0"
                   v-if="pageType === 1"
          >
            <input type="text" class="inputs user" placeholder="请输入用户名"
                   v-model="registForm.username"
                   @change="usernameCheck()"
            >
            <input type="password" class="inputs pwd" placeholder="请输入密码"
                   v-model="registForm.password">
            <input type="text" class="inputs user" placeholder="请输入邮箱"
                   v-model="registForm.mail">
            <div style="display: flex;margin: 0px;padding: 0px;">
              <input type="text" class="inputs user" placeholder="请输入验证码"
                     v-model="registForm.code"
                     style="display: flex;margin: 0px;"
              >
              <el-button type="text" class="custom-button"
                         style="  background-color: rgb(99, 146, 248);width: 170px; height: 60px;margin:0px 0px 0px 20px;"
                         @click="sendCode()"
              >{{ sendCodeMes1 }}
              </el-button>
            </div>


            <button v-if="pageType === 1" class="custom-button"
                    @click="handleRegist()">注 册
            </button>
            <div>
                            <span style="float: left">
                                <el-button type="text"
                                           @click="enterEnterpriseRegist()">企业注册</el-button>
                            </span>
              <span style="float: right">
                                已有账号？<el-button type="text"
                                                    @click="enterLogin()">点击登录</el-button>
                            </span>
            </div>

          </el-form>

          <!-- 企业注册表单 -->
          <el-form class="enterprise-regist-form" ref="entertpriseRegistForm"
                   :model="registForm" label-width="0"
                   v-if="pageType === 2"
          >
            <div class="logo">
              <div class="block" @click="openAvatarChangeDialog()">
                <el-image style="width:150px;height: 150px"
                          v-if="!entertpriseRegistForm.logo" fit="contain"
                          lazy
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <el-image style="height: 150px"
                          v-if="entertpriseRegistForm.logo"
                          :src="entertpriseRegistForm.logo" :fit="contain"
                >
                  <div slot="error" class="image-slot">
                    <span>加载失败</span>
                  </div>
                </el-image>
              </div>
            </div>

            <input type="text" class="inputs user" placeholder="请输入企业名称"
                   v-model="entertpriseRegistForm.name">
            <input type="password" class="inputs pwd" placeholder="请输入密码"
                   v-model="entertpriseRegistForm.password">
            <input type="text" class="inputs user" placeholder="请输入企业描述"
                   v-model="entertpriseRegistForm.detail"
                   @click="writeEnterpriseDetail()"
            >
            <input type="text" class="inputs user" placeholder="请输入邮箱"
                   v-model="entertpriseRegistForm.mail">
            <div style="display: flex;margin: 0px;padding: 0px;">
              <input type="text" class="inputs user" placeholder="请输入验证码"
                     v-model="entertpriseRegistForm.code"
                     style="display: flex;margin: 0px;"
              >
              <el-button type="text" class="custom-button"
                         style="  background-color: rgb(99, 146, 248);width: 170px; height: 60px;margin:0px 0px 0px 20px;"
                         @click="sendCode()"
              >{{ sendCodeMes2 }}
              </el-button>
            </div>


            <button v-if="pageType === 2" class="custom-button"
                    @click="handleEnterpriseRegist()">企 业 注 册
            </button>
            <div>
                            <span style="float: right">
                                企业已注册？<el-button type="text"
                                                      @click="enterLogin()">回到登录</el-button>
                            </span>
            </div>

            <!-- 企业详情 -->
            <el-dialog title="企业详情" :visible.sync="enterpriseDetailVisible"
                       width="30%" append-to-body>
              <el-input type="textarea" :rows="5" placeholder="请输入内容"
                        v-model="entertpriseRegistForm.detail">
              </el-input>
              <span slot="footer" class="dialog-footer">
                                <el-button type="primary"
                                           @click="enterpriseDetailVisible = false">确 定</el-button>
                            </span>
            </el-dialog>
            <!-- 头像上传对话框 -->
            <el-dialog title="上传logo"
                       :visible.sync="avatarChangeDialogVisible" width="400px"
                       append-to-body>
              <div style="display: flex;justify-content: center;">
                <el-upload class="avatar-uploader"
                           :action="ossPath"
                           :data="dataObj" list-type="picture" :multiple="false"
                           :show-file-list="showFileList"
                           :file-list="fileList" :before-upload="beforeUpload"
                           :on-remove="handleRemove"
                           :on-success="handleUploadSuccess"
                           :on-preview="handlePreview"
                >
                  <div class="centerDiv">
                    <div
                      class="display: flex;justify-content: center;align-items: center;">
                      <i class="el-icon-plus avatar-uploader-icon"
                         style="font-size: 50px;margin: 50px;"
                      ></i>
                    </div>
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过10MB
                    </div>
                  </div>
                </el-upload>
              </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="fileList[0].url" alt=""/>
            </el-dialog>

          </el-form>

          <div class="other-login" v-if="pageType === 0">
            <div class="divider">
              <span class="line"></span>
              <span class="divider-text">使用其他方式登录</span>
              <span class="line"></span>
            </div>
            <div class="other-login-wrapper">
              <div class="other-login-item">
                <img src="@/assets/login/QQ.png" alt="QQ">
              </div>
              <div class="other-login-item" @click="toWxLogin()">
                <img src="@/assets/login/WeChat.png" alt="WeChat">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import verificationCode from './verificationCode.vue'

export default {
  name: 'SmartSchedulingSystemIndex',
  components: {
    verificationCode
  },

  data() {
    return {
      //oss上传地址
      ossPath: process.env.VUE_APP_OSS_PATH,

      ////页面
      loginOrRegisterTitle: '注 册',
      //页面类型 0：登录 1：用户注册 2：企业注册
      pageType: 0,

      ////登录
      loginForm: {
        //用户名
        username: 'a',
        //密码
        password: '123',
        rememberPwd: false,
        uuid: '',
        verificationCode: ''
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, message: '密码长度最少为6位', trigger: 'blur'}
        ]
      },
      ///验证码
      //uuid
      uuid: '',
      //验证码图片
      verifyCodeImg: 'iVBORw0KGgoAAAANSUhEUgAAAHgAAAA8CAIAAAAiz+n/AAABAElEQVR42u3ZvwnCQBTA4dtKEKwdyQnsncHCxsIpXMAFnMAdFGyChpA/L7lc8sGvuvIjvPDu0uP50gQlBKBBCzRo0BRAgxZo0KApgAYt0KBBCzRogQYNWqBBCzRo0AJdabe5fwI9X+jr+dgQ6LAWC3057RvKLr6c0REF/Z0V/+WFvh221fJDtzksC/qHuJP1dDM6ZG5khK5lbW+d1qMcAt3+fL3QIZ9z7+mRSlEGvSLoWS8sscqF/glHhw5cUnooNy+EXdGHzI2JoHNddMRC11rPYnTELtxFX90VA1268ojQQ5Rj12730R2gvbAINGjQAg1aoEGDFmjQAg0atECX3htauJtUKiEdmQAAAABJRU5ErkJggg==',

      ////注册
      registForm: {
        //用户名
        username: '',
        //密码
        password: '',
        //邮箱
        mail: '',
        code: ''
      },
      sendCodeMes1: '发送验证码',
      //倒计时
      countdownNum1: 60,
      interval1: {},
      isCount1: 0,
      //公司选项
      enterpriseOptions: [],

      ////企业注册
      entertpriseRegistForm: {
        //企业名称
        name: '',
        //企业密码
        password: '',
        //企业描述
        detail: '',
        //邮箱
        mail: '',
        code: ''
      },
      sendCodeMes2: '发送验证码',
      //倒计时
      countdownNum2: 60,
      interval2: {},
      isCount2: 0,
      ///图片上传
      //上传弹框组件是否显示
      avatarChangeDialogVisible: false,
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: ''
        // callback:'',
      },
      dialogVisible: false,
      avatarUrl: '',
      ///企业详情
      enterpriseDetailVisible: false
    }
  },

  created() {
    // 获取路径token里面的值
    this.token = this.$route.query.token
    if (this.token) {//有值才判断
      this.wxLogin(this.token)
    } else if (this.$route.query.message) {
      this.$message.error('该微信还未绑定职位推荐系统的账号，请通过账号密码登录')
    }

    this.freshVerificationCode()

    console.log("ossPath:" + this.ossPath)
  },

  computed: {
    imageUrl() {
      return this.value
    },
    imageName() {
      if (this.value != null && this.value !== '') {
        return this.value.substr(this.value.lastIndexOf('/') + 1)
      } else {
        return null
      }
    },
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl
        }
      ]
    },
    showFileList: {
      get: function () {
        return (
          this.value !== null && this.value !== '' && this.value !== undefined
        )
      },
      set: function (newValue) {
      }
    }
  },

  mounted() {
    /**
     * 开启星球的动画事件
     */
    document.querySelector('.people').addEventListener('animationend', function () {
      this.classList.remove('p-animtion')
      this.classList.add('p-other-animtion')
    })
    document.querySelector('.sphere').addEventListener('animationend', function () {
      this.classList.remove('s-animtion')
      this.classList.add('s-other-animtion')
    })
  },

  methods: {

    /**
     * 切换登录
     */
    enterLogin() {
      this.pageType = 0
      this.loginOrRegisterTitle = '登 录'
    },
    /**
     * 切换注册
     */
    enterRegister() {
      this.pageType = 1
      this.loginOrRegisterTitle = '注 册'
    },
    /**
     * 进入企业注册
     */
    enterEnterpriseRegist() {
      this.pageType = 2
      this.loginOrRegisterTitle = '企 业 注 册'
    },
    //跳转到微信登录页面
    toWxLogin() {
      //跳转到登录扫描页面
      location.href = 'http://localhost:8160/api/ucenter/wx/login'
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    wxLogin(token) {
      this.$store
        .dispatch('user/weixinLogin', token)
      this.$router.push({path: this.redirect || '/'})
      //进入首页的时候刷新一下首页，不然样式会残留(相当于f5)
      location.reload(true)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log(this.loginForm)
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            console.log('aaa')
            this.$router.push({path: this.redirect || '/'})
//进入首页的时候刷新一下首页，不然样式会残留(相当于f5)
            location.reload(true)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //处理注册
    handleRegist() {
      regist(this.registForm).then((res) => {
        //提示
        this.$message({
          type: 'success',
          message: '注册成功，请登录系统'
        })
        this.pageType = 0
      })
    },
    //用户名查重
    usernameCheck() {
      // console.log("hduashdusahdush");
      usernameCheck(this.registForm.username).then((res) => {
        // console.log("res:" + JSON.stringify(res));
        if (res.isExist == true) {
          //提示
          this.$message({
            type: 'error',
            message: '用户名重复，请修改用户名!'
          })
        }
      })
    },
    //发送验证码
    sendCode() {
      if (this.pageType == 1) {
        if (this.registForm.mail == '') {
          //提示
          this.$message({
            type: 'error',
            message: '请先输入邮箱，再发送验证码'
          })
        } else {
          if (this.isCount1 == 0) {
            this.registForm.code = ''
            this.sendCodeMes1 = this.countdownNum1 + '后再发送'
            this.isCount1 = 1
            this.interval1 = setInterval(this.countdown, 1000)
            sendMailCode(this.registForm.mail, 0).then((res) => {
            })
          }
        }
      } else if (this.pageType == 2) {
        if (this.entertpriseRegistForm.mail == '') {
          //提示
          this.$message({
            type: 'error',
            message: '请先输入邮箱，再发送验证码'
          })
        } else {
          if (this.isCount2 == 0) {
            this.entertpriseRegistForm.code = ''
            this.sendCodeMes2 = this.countdownNum2 + '后再发送'
            this.isCount2 = 1
            this.interval2 = setInterval(this.countdown, 1000)
            sendMailCode(this.entertpriseRegistForm.mail, 1).then((res) => {
            })
          }
        }
      }

    },
    //倒计时
    countdown() {
      if (this.pageType == 1) {
        this.countdownNum1--
        if (this.countdownNum1 <= 0) {
          //停止运行计时
          clearInterval(this.interval1)
          this.isCount1 = 0
          this.countdownNum1 = 60
          this.sendCodeMes1 = '发送验证码'
        } else {
          this.sendCodeMes1 = this.countdownNum1 + '后再发送'
        }
      } else if (this.pageType == 2) {
        this.countdownNum2--
        if (this.countdownNum2 <= 0) {
          //停止运行计时
          clearInterval(this.interval2)
          this.isCount2 = 0
          this.countdownNum2 = 60
          this.sendCodeMes2 = '发送验证码'
        } else {
          this.sendCodeMes2 = this.countdownNum2 + '后再发送'
        }
      }
    },
    /**
     * 刷新登录验证码
     */
    freshVerificationCode() {
      generateVerificationCode().then(
        res => {

          this.verifyCodeImg = res.image
          this.uuid = res.uuid
          console.log('uuid:' + this.uuid)
        }
      )
    },

    ////企业注册
    ///企业详情
    writeEnterpriseDetail() {
      this.enterpriseDetailVisible = true
    },
    ///图片上传
    openAvatarChangeDialog() {
      this.avatarChangeDialogVisible = true
      this.avatarUrl = ''
    },
    handleRemove(file, fileList) {

    },
    handlePreview(file) {
      this.dialogVisible = true
    },
    beforeUpload(file) {
      ////判断文件类型和大小是否合适
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      ////获取OSS签名
      return new Promise((resolve, reject) => {
        ossApi.getPolicy()
          .then((response) => {
            console.log('policy response:' + JSON.stringify(response))
            debugger;
            this.dataObj.policy = response.data.policy
            this.dataObj.signature = response.data.signature
            this.dataObj.ossaccessKeyId = response.data.accessId
            this.dataObj.key = response.data.dir + uuidApi.getUUID() + '_${filename}'
            this.dataObj.dir = response.data.dir
            this.dataObj.host = response.data.host
            console.log('获取policy成功')
            resolve(true)
          })
          .catch((err) => {
            console.log('获取policy失败')
            reject(false)
          })
      })

    },
    handleUploadSuccess(res, file) {
      console.log('上传成功...')
      this.showFileList = true
      this.fileList.pop()
      this.fileList.push({
        name: file.name,
        url:
          this.dataObj.host +
          '/' +
          this.dataObj.key.replace('${filename}', file.name)
      })
      // console.log("this.fileList[0].url:" + this.fileList[0].url)
      this.avatarUrl = this.fileList[0].url
      this.avatarChangeDialogVisible = false
      this.entertpriseRegistForm.logo = this.avatarUrl
    },
    /**
     * 企业注册
     */
    handleEnterpriseRegist() {
      enterpriseRegister(this.entertpriseRegistForm).then((res) => {
        //提示
        this.$message({
          type: 'success',
          message: '已经发送企业注册请求，请耐心等候，我们将在七个工作日内为您处理，请关注邮箱通知'
        })
      })
    }
  }
}


</script>


<style lang="scss" scoped>
:root {
  font-size: 15px;
}

.body {
  margin: 0;
  min-height: 100vh;
  background-color: #abc6f8;
  background-image: radial-gradient(closest-side, rgb(255, 255, 255), rgba(235, 105, 78, 0)), radial-gradient(closest-side, rgb(250, 203, 203), rgba(243, 11, 164, 0)), radial-gradient(closest-side, rgb(237, 252, 202), rgba(254, 234, 131, 0)), radial-gradient(closest-side, rgb(197, 248, 241), rgba(170, 142, 245, 0)), radial-gradient(closest-side, rgb(206, 200, 243), rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;
  /* 背景颜色4秒循环一次 */
  animation: 4s movement linear infinite;
}

.body::after {
  content: "";
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.content {
  width: 90vw;
  height: 90vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
}

.content .left {
  flex: 1;
  position: relative;
}

.content .left .sphere {
  position: absolute;
  left: 30%;
  width: 90%;
  z-index: 1;
  animation: sphereAnimation 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
}

.content .left .people {
  position: absolute;
  left: -50%;
  top: 20%;
  width: 70%;
  z-index: 2;
}

.content .left .p-animtion {
  animation: peopleAnimation 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
}

.content .left .p-other-animtion {
  animation-name: pOtherAnimation;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 3s;
}

.content .left .s-animtion {
  animation: sphereAnimation 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
}

.content .left .s-other-animtion {
  animation-name: sOtherAnimation;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 3s;
}

.content .right {
  flex: 1;
  position: relative;
  z-index: 12;
}

.content .right .top {
  width: 80%;
  margin-left: 38px;
  color: rgb(51, 52, 124);
  font-size: 20px;
  font-weight: 600;
  font-family: "Century Gothic", Times, serif;
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, 0);
}

.content .right .top .top-item {
  float: left;
  width: 150px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
  transition: 0.5s;
}

.content .right .top .top-item:hover {
  border: 0;
  background-color: #fff;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: -20px 10px 32px 1px rgba(182, 183, 185, 0.37);
}

.content .right .form-wrappepr {
  width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* text-align: right; */
}

.content .right .form-wrappepr h1 {
  float: left;
  font-family: "Century Gothic", Times, serif;
  margin: 30px 0;
}

.content .right .form-wrappepr .inputs {
  display: block;
  width: 100%;
  height: 60px;
  margin: 30px 0;
  border-radius: 10px;
  border: 0;
  background-color: rgb(210, 223, 237);
  color: rgb(80, 82, 84);
  font-family: "Century Gothic", Times, serif;
  outline: none;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;
  /* box-shadow: -10px 18px 22px 0 rgba(210, 223, 237, 0.5); */
  box-shadow: -10px 10px 10px rgba(210, 223, 237, 0.7);
}

.content .right .form-wrappepr .el-collapse {
  display: block;
  width: 100%;
  height: 60px;
  margin: 30px 0;
  border-radius: 10px;
  border: 0;
  background-color: rgb(210, 223, 237);
  color: rgb(80, 82, 84);
  font-family: "Century Gothic", Times, serif;
  outline: none;
  padding: 20px;
  box-sizing: border-box;
  font-size: 20px;
  /* box-shadow: -10px 18px 22px 0 rgba(210, 223, 237, 0.5); */
  box-shadow: -10px 10px 10px rgba(210, 223, 237, 0.7);
}

.content .right .form-wrappepr .logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.content .right .form-wrappepr .el-image {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 0;
  background-color: rgb(210, 223, 237);
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
}

.content .right .form-wrappepr .tips {
  display: block;
  margin-top: -15px;
  color: rgb(160, 170, 182);
  cursor: pointer;
}

.content .right .form-wrappepr .custom-button {
  width: 100%;
  height: 50px;
  background-color: rgb(60, 89, 233);
  border-radius: 10px;
  font-size: 15px;
  color: #fff;
  border: 0;
  font-weight: 600;
  margin: 30px 0;
  cursor: pointer;
  box-shadow: -10px 10px 10px 0 rgba(62, 145, 255, 0.37);
  font-family: "Century Gothic", Times, serif;
}

.content .right .form-wrappepr .other-login .divider {
  width: 100%;
  margin: 20px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content .right .form-wrappepr .other-login .divider .line {
  display: inline-block;
  max-width: 35%;
  width: 35%;
  flex: 1;
  height: 1px;
  background-color: rgb(162, 172, 185);
}

.content .right .form-wrappepr .other-login .divider .divider-text {
  vertical-align: middle;
  margin: 0px 20px;
  display: inline-block;
  width: 150px;
  color: rgb(162, 172, 185);
  white-space: normal;
}

.content .right .form-wrappepr .other-login .other-login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content .right .form-wrappepr .other-login .other-login-wrapper .other-login-item {
  width: 70px;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: rgb(51, 49, 116);
  margin: 0 10px;
  transition: 0.4s;
}

.content .right .form-wrappepr .other-login .other-login-wrapper .other-login-item img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

.content .right .form-wrappepr .other-login .other-login-wrapper .other-login-item span {
  vertical-align: middle;
}

.content .right .form-wrappepr .other-login .other-login-wrapper .other-login-item:hover {
  width: 80px;
  height: 50%;
  background-color: #fff;
  border: 0;
  box-shadow: -20px 10px 32px 1px rgba(182, 183, 185, 0.37);
}

@keyframes movement {

  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
  }

  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax, -40vmax -20vmax, 40vmax 60vmax;
  }

  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax, 60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax, 20vmax 10vmax, 30vmax 70vmax;
  }

  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax, -10vmax 10vmax, 40vmax 60vmax;
  }
}

@keyframes sphereAnimation {
  0% {
    width: 10%;
  }

  100% {
    width: 90%;
    transform: translate(-30%, 5%);
  }
}

@keyframes peopleAnimation {
  0% {
    width: 40%;
  }

  100% {
    width: 70%;
    transform: translate(90%, -10%);
  }
}

@keyframes pOtherAnimation {
  0% {
    transform: translate(90%, -10%);
  }

  100% {
    transform: translate(90%, -15%);
  }
}

@keyframes sOtherAnimation {
  0% {
    transform: translate(-30%, 5%);
  }

  100% {
    transform: translate(-30%, 10%);
  }
}

/*# sourceMappingURL=style.css.map */
</style>
