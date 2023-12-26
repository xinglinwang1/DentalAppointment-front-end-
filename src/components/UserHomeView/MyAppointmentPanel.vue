<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
import store from "@/store";

export default defineComponent({
  name: "MyAppointmentPanel",
  mounted() {
    this.getAppointments()
  },
  methods: {
    handleSizeChange(size: number) {
      this.pageSize = size;
    },
    handlePageChange(currentPage: number) {
      this.currentPage = currentPage;
    },
    async getAppointments() {
      try {
        const response = await axios.get('http://localhost:8201/api/appointment/get/' + store.state.username);
        this.appointments = response.data.data;
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    },
    async Cancel(row: any) {
      console.log('Edit row:', row.id, 'Operation:', "cancel");
      try {
        const response = await axios.put('http://localhost:8201/api/appointment/cancel/patient/' + row.id);
        this.appointments = response.data.data;
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
      await this.getAppointments()
    },
    async Update(row: any) {
      console.log('Edit row:', row, 'Operation:', "update");

      this.getAppointments()
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      appointments: [
        {
          id: 0,
          doctorId: "1",
          orderTime: "2",
          clinicTime: "3",
          orderDepartment: "4",
          diseaseDescription: "5",
          hospital: "6",
          approvalStatus: "7",}
      ]
    }
  }
})
</script>

<template>
  <!-- 表格组件：预约信息 -->
  <el-table :data="appointments" style="width: 100%">
    <!-- 表格列定义，根据实际数据结构进行调整 -->
    <el-table-column label="就诊时间" prop="clinicTime"></el-table-column>
    <el-table-column label="医生id" prop="doctorId"></el-table-column>
    <el-table-column label="就诊医院" prop="hospital"></el-table-column>
    <el-table-column label="就诊部门" prop="orderDepartment"></el-table-column>
    <el-table-column label="病情描述" prop="diseaseDescription"></el-table-column>
    <el-table-column label="审核状态" prop="approvalStatus"></el-table-column>
    <el-table-column label="预约时间" prop="orderTime"></el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <!-- 使用 v-model 替代 .sync -->
        <el-button type="text" @click="Cancel(scope.row)" style="color: rgb(255,1,1);">取消</el-button>
        <!-- 添加自定义按钮 -->
        <el-button type="text" @click="Update(scope.row)" style=";">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件 -->
  <el-pagination v-if="appointments.length > pageSize" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                 :page-size="pageSize" :total="appointments.length" @size-change="handleSizeChange"
                 @current-change="handlePageChange"></el-pagination>
</template>

<style scoped>

</style>