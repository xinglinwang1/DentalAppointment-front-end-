<script lang="ts">
import {defineComponent} from 'vue'
import {Clock, Iphone, Message, Tickets, User} from "@element-plus/icons-vue";
import axios from "axios";
import store from "@/store";

export default defineComponent({
  name: "PatientInfoPanel",
  components: {Clock, Message, Tickets, Iphone, User},
  data() {
    return {
      patient_username: store.state.username,
      dialogVisible: false,
      patient_info: {
        id: 999,
        username: "用户名",
        phone: "18888888888",
        email: "email@gmail.com",
        idNumber: "8888888888888888",
        name: "姓名",
        gender: "男",
        birthday: "2000-01-01"
      },
    }
  },
  mounted() {
    this.getPatientData()

  },
  methods: {
    async getPatientData() {
      try {
        const response = await axios.get('http://localhost:8101/api/patient/' + this.patient_username);
        this.patient_info = response.data.data;
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    },
    handleEdit() {
      this.dialogVisible = true
    },
    async handleCancel(){
      await this.getPatientData()
      this.dialogVisible = false
    },
    async handleSubmit() {
      try {
        const response = await axios({
          method: 'put',
          url: 'http://localhost:8101/api/patient',
          data: {
            username: this.patient_info.username,
            phone: this.patient_info.phone,
            email: this.patient_info.email,
            IDNumber: this.patient_info.idNumber,
            name: this.patient_info.name,
            gender: this.patient_info.gender,
            birthday: this.patient_info.birthday
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      } catch (error) {
        console.error('Error changing patient data:', error);
      }

      await this.getPatientData()
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
      {{ patient_info.username }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><user/></el-icon>
          性别
        </div>
      </template>
      {{ patient_info.gender }}
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
      {{ patient_info.phone }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><Message /></el-icon>
          邮箱
        </div>
      </template>
      {{ patient_info.email }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><User /></el-icon>
          姓名
        </div>
      </template>
      {{ patient_info.name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon><Clock /></el-icon>
          出生日期
        </div>
      </template>
      {{ patient_info.birthday }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <tickets />
          </el-icon>
          身份证号
        </div>
      </template>
      {{ patient_info.idNumber }}
    </el-descriptions-item>
  </el-descriptions>

  <el-dialog v-model="dialogVisible" title="Shipping address">
    <el-form :model="patient_info">
      <el-form-item label="性别" label-width="140px">
        <el-select v-model="patient_info.gender" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="电话" label-width="140px">
        <el-input v-model="patient_info.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="140px">
        <el-input v-model="patient_info.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号" label-width="140px">
        <el-input v-model="patient_info.idNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" label-width="140px">
        <el-input v-model="patient_info.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" label-width="140px">
        <el-date-picker
            v-model="patient_info.birthday"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择日期"
            size="large"
        />
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