<template>
  <div class="banner" id="home">
	<!--整个图片点阵样式-->
	<div class="banner-dott"><div class="correction">..</div>
      <!--上半部分样式-->
      <div class="header-top">
        <div class="container banner-drop">
          <div class="header">
            <!--首页上方标题-->
            <div class="agile-logo">
              <h1><a>口腔就诊预约平台</a><span>Facilitate your appointments and hospital visits</span></h1>
            </div>
          </div>
        </div>
      </div>

      <div class="loginContainer">
        <h3 class="loginTitle">系统登录</h3>
        <el-radio-group v-model="role">
          <el-radio label="patient">普通用户</el-radio>
          <el-radio label="doctor">医生</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户名：" prop="user_id">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
  
          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="ruleForm.password" />
          </el-form-item>
  
          <el-form-item>
            <el-button class="loginButton" type="primary" @click="submit">登录</el-button>
          </el-form-item>
       
        </el-form>
        <el-link type="primary" @click="this.$router.push({ name: 'RegisterView' })">没有账号？注册一个</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from "axios";
import store from "@/store";

export default defineComponent({
  name: 'LoginBackground',
  components: {},
  data() {
    return {
      role: "patient",
      receiveData:{
        message: "",
        data: {
          access_token: ""
        }
      },
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '用户名长度必须在1~10个字符之间', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 10, message: '密码长度必须在1~10个字符之间', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    async submit() {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://121.43.108.102:8101/api/' + this.role + '/login',
          data: {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        this.receiveData = response.data;
        if(this.receiveData.message === "操作成功"){
          store.state.token = this.receiveData.data.access_token
          store.commit('setRole', this.role)
          store.commit('setUsername', this.ruleForm.username)
          store.commit('setToken', this.receiveData.data.access_token)
          console.log(store.state.role)
          console.log(store.state.username)
          console.log(store.state.token)
          // 跳转至首页
          this.$router.push({ name: 'HomeView' });
        }

      } catch (error) {
        this.$message({
          message: '用户名或密码错误',
          type: 'error'
        });
        console.error('Error login', error);
      }

    }
  },
})
</script>

<style scoped>
.loginContainer {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 120px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #9ea5ae;
}

.loginTitle {
  text-align: center;
  margin-bottom: 40px;
}
.loginButton {
  margin-left: 30px;
}

.hText {
	color: #FFF;
	font-size: 30px;
}
body {
	padding: 0;
	margin: 0;
	background: #FFF;
	font-family: 'Open Sans', sans-serif;
}
body a {
	transition: 0.5s all;
	-webkit-transition: 0.5s all;
	-moz-transition: 0.5s all;
	-o-transition: 0.5s all;
	-ms-transition: 0.5s all;
	text-decoration: none;
}
body a:hover {
	text-decoration: none;
}
body a:focus, a:hover {
	text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
	margin: 0;
	padding: 0;
	font-family: 'Abel', sans-serif;
}

/*-- banner --*/
.banner{
  background: url(../../assets/images/background.jpg) no-repeat 0px 0px;
  background-size: cover;
  padding: 0em 0 0em;

  overflow: auto;
  height:100vh;
}
.banner-dott {
  /* background: url(../../assets/images/dott.png)repeat 0px 0px; */
  background-size: 2px;
  -webkit-background-size: 2px;
  -moz-background-size: 2px;
  -o-background-size: 2px;
  -ms-background-size: 2px;
	padding:0em 0;
  height: 100%;
}
.header-top {
	outline:none;
}
.header {
  margin-top: 3em;
  text-align: center;
}
.agile-logo h1{
	margin:0;
}
.agile-logo h1 a {
  color: #FFFFFF;
  font-size: 1em;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0px 20px;
  letter-spacing: 4px;
}
.agile-logo h1 span{
  display: block;
  font-size: .4em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 12px;
  margin: 1em 0 0 .3em;
	color:#fff;
}
.w3l-banner-grids {
	padding: 15em 0 20em 0;
}
.correction {
	color: (255, 255, 255, 0);
}
</style>