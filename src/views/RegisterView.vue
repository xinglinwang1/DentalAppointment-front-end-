<script lang="ts">
/* eslint-disable */
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "RegisterView",
  data() {
    return {
      role: 'patient', // 默认角色为普通用户
      formData: {
        patientInfo: {
          username: '',
          password: '',
          phone: '',
          email: '',
          idNumber: '',
          name: '',
          gender: '',
          birthday: '',
        },
        doctorInfo: {
          username: '',
          password: '',
          phone: '',
          email: '',
          hospitalId: null,
          name: '',
          jobNumber: '',
        },
        adminInfo: {
          username: '',
          password: '',
          phone: '',
          email: '',
          hospitalId: null,
          name: '',
          jobNumber: '',
        },
        // 其他角色的信息字段...
      },
      hospitals: [ // 医院选项数据，根据实际情况修改
        { id: 1, name: '医院1' },
        { id: 2, name: '医院2' },
        // 其他医院...
      ],

    }
  },
  methods: {
    async register() {
      // 处理注册逻辑，根据角色调用不同的注册接口
      if(this.role === 'patient') {
        // console.log('Registration data:', this.formData.patientInfo);
        try {
          const response = await axios({
            method: 'post',
            url: 'http://121.43.108.102:8101/api/patient/register',
            data: {
              username: this.formData.patientInfo.username,
              password: this.formData.patientInfo.password,
              phone: this.formData.patientInfo.phone,
              email: this.formData.patientInfo.email,
              idNumber: this.formData.patientInfo.idNumber,
              name: this.formData.patientInfo.name,
              gender: this.formData.patientInfo.gender,
              birthday: this.formData.patientInfo.birthday,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        } catch (error) {
          console.error('Error changing patient data:', error);
        }
      }

      // 注册成功，跳转首页
      await this.$router.push({ name: 'HomeView' })
    },

  },
})
</script>

<template>
  <div class="loginContainer">
    <h3 class="loginTitle">系统注册</h3>
    <!-- 选择角色部分 -->
    <el-radio-group v-model="role">
      <el-radio label="patient">普通用户</el-radio>
      <el-radio label="doctor">医生</el-radio>
      <el-radio label="admin">管理员</el-radio>
    </el-radio-group>

    <!-- 用户信息表单 -->
    <el-form :model="formData" label-position="top" >
      <!-- 普通用户信息 -->
      <el-form-item v-if="role === 'patient'" label="普通用户信息">
        <el-input v-model="formData.patientInfo.username" placeholder="用户名"></el-input>
        <el-input v-model="formData.patientInfo.password" type="password" placeholder="密码"></el-input>
        <el-radio-group v-model="formData.patientInfo.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
        <el-input v-model="formData.patientInfo.phone" placeholder="手机号"></el-input>
        <el-input v-model="formData.patientInfo.email" placeholder="邮箱"></el-input>
        <el-input v-model="formData.patientInfo.idNumber" placeholder="身份证号"></el-input>
        <el-input v-model="formData.patientInfo.name" placeholder="姓名"></el-input>
        <el-date-picker
            v-model="formData.patientInfo.birthday"
            type="date"
            placeholder="选择生日"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>

      <!-- 医生信息 -->
      <el-form-item v-if="role === 'doctor'" label="医生信息">
        <el-input v-model="formData.doctorInfo.username" placeholder="用户名"></el-input>
        <el-input v-model="formData.doctorInfo.password" type="password" placeholder="密码"></el-input>
        <el-input v-model="formData.doctorInfo.phone" placeholder="手机号"></el-input>
        <el-input v-model="formData.doctorInfo.email" placeholder="邮箱"></el-input>
        <el-select v-model="formData.doctorInfo.hospitalId" placeholder="选择医院">
          <el-option v-for="hospital in hospitals" :key="hospital.id" :label="hospital.name" :value="hospital.id"></el-option>
        </el-select>
        <el-input v-model="formData.doctorInfo.name" placeholder="医生姓名"></el-input>
        <el-input v-model="formData.doctorInfo.jobNumber" placeholder="工号"></el-input>
        <!-- 其他医生信息字段... -->
      </el-form-item>

      <!-- 管理员信息 -->
      <el-form-item v-if="role === 'admin'" label="管理员信息">
        <el-input v-model="formData.adminInfo.username" placeholder="用户名"></el-input>
        <el-input v-model="formData.adminInfo.password" type="password" placeholder="密码"></el-input>
        <el-input v-model="formData.adminInfo.phone" placeholder="手机号"></el-input>
        <el-input v-model="formData.adminInfo.email" placeholder="邮箱"></el-input>
        <el-select v-model="formData.adminInfo.hospitalId" placeholder="选择医院">
          <el-option v-for="hospital in hospitals" :key="hospital.id" :label="hospital.name" :value="hospital.id"></el-option>
        </el-select>
        <el-input v-model="formData.adminInfo.name" placeholder="医生姓名"></el-input>
        <el-input v-model="formData.adminInfo.jobNumber" placeholder="工号"></el-input>
        <!-- 其他管理员信息字段... -->
      </el-form-item>

      <div style="display: flex; gap: 10px">
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        <!-- 取消按钮 -->
        <el-form-item>
          <el-button type="primary" plain @click="this.$router.push({ name: 'HomeView' })">取消</el-button>
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

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

.el-input {
  margin-bottom: 10px;
}
</style>