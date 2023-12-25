<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "DoctorInfoPanel",
  data() {
    return {
      dialogVisible: false,
      doctor_info: {
        id: 999,
        username: "用户名",
        phone: "1234567890",
        email: "email@gmail.com",
        hospitalId: 1,
        name: "姓名",
        jobNumber: 100001
      },
    }
  },
  mounted() {
    this.getDoctorData()

  },
  methods: {
    async getDoctorData() {
      try {
        const response = await axios.get('http://localhost:8101/api/doctor/医生1');
        this.doctor_info = response.data.data;
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    },
    handleEdit() {
      this.dialogVisible = true
    },
    async handleCancel(){
      await this.getDoctorData()
      this.dialogVisible = false
    },
    async handleSubmit() {
      try {
        const response = await axios({
          method: 'put',
          url: 'http://localhost:8101/api/doctor',
          data: {
            username: this.doctor_info.username,
            phone: this.doctor_info.phone,
            email: this.doctor_info.email,
            hospitalId: this.doctor_info.hospitalId,
            name: this.doctor_info.name,
            jobNumber: this.doctor_info.jobNumber,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      } catch (error) {
        console.error('Error changing doctor data:', error);
      }

      await this.getDoctorData()
      this.dialogVisible = false
    }
  }
})
</script>

<template>
  <el-descriptions class="margin-top"
                   title="个人信息"
                   :column="2"
                   size="large"
                   border
  >
    <template #extra>
      <el-button type="primary" @click="handleEdit">修改个人信息</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><user/></el-icon>
          用户名
        </div>
      </template>
      {{ doctor_info.username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <iphone />
          </el-icon>
          电话
        </div>
      </template>
      {{ doctor_info.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><Message /></el-icon>
          邮箱
        </div>
      </template>
      {{ doctor_info.email }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><User /></el-icon>
          姓名
        </div>
      </template>
      {{ doctor_info.name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><Clock /></el-icon>
          所属医院
        </div>
      </template>
      {{ doctor_info.hospitalId }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <tickets />
          </el-icon>
          工号
        </div>
      </template>
      {{ doctor_info.jobNumber }}
    </el-descriptions-item>
  </el-descriptions>

  <el-dialog v-model="dialogVisible" title="Shipping address">
    <el-form :model="doctor_info">

      <el-form-item label="电话" label-width="140px">
        <el-input v-model="doctor_info.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="140px">
        <el-input v-model="doctor_info.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" label-width="140px">
        <el-input v-model="doctor_info.name" autocomplete="off" />
      </el-form-item>


    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>