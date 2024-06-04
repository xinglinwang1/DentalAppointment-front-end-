<script>
import { defineComponent } from "vue";
import axios from "axios";
import store from "@/store";

export default defineComponent({
  name: "MyAppointmentPanel",
  mounted() {
    this.getAppointments();
  },
  computed: {
    // 分页预约数据
    paginatedAppointmentInfoList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.appointments_display.slice(start, end);
    },
  },
  methods: {
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
    async getAppointments() {
      try {
        const response = await axios.get(
          "http://118.178.253.118:8201/api/appointment/get/patient/" +
            store.state.username
        );
        this.appointments = response.data.data;
        this.appointments_display = this.appointments;
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }

      await this.fetchDoctorName();
    },
    async fetchDoctorName() {
      for (let appointment of this.appointments) {
        try {
          // 获取医生信息
          const response = await axios.get(
            "http://47.116.162.133:8101/api/doctor/" + appointment.doctorId
          );

          // 更新预约信息中的医生名称
          appointment.doctorName = response.data.data.name;
        } catch (error) {
          console.error("Error fetching doctor information:", error);
        }
      }
      this.appointments_display = this.appointments;
    },
    async cancel(row) {
      console.log("Edit row:", row.id, "Operation:", "cancel");

      // 打开对话框前先清空输入框
      this.orderId = row.id;
      this.cancelDialogVisible = true;
    },
    async confirmCancel() {
      console.log(this.orderId);
      console.log(this.selectedReason);
      try {
        const response = await axios({
          method: "put",
          url: "http://118.178.253.118:8201/api/appointment/cancel/patient/",
          data: {
            orderId: this.orderId,
            cancelReason: this.selectedReason,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data.code === 200) {
          this.$message({
            message: "取消预约成功",
            type: "success",
          });
        } else if (response.data.message === "waiting for approval") {
          this.$message({
            message: "等待审核",
            type: "warning",
          });
        } else if (
          response.data.message === "failed to cancel an appointment"
        ) {
          this.$message({
            message: "取消失败",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }

      this.cancelDialogVisible = false;
      await this.getAppointments();
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      orderId: 0,
      cancelDialogVisible: false,
      cancelReason: "",
      appointments: [
        {
          id: 0,
          patientId: "",
          patientName: "",
          doctorId: "",
          doctorName: "",
          orderTime: "",
          clinicTime: "",
          orderDepartment: "",
          diseaseDescription: "",
          hospital: "",
          approvalStatus: "",
        },
      ],
      appointments_display: [],
      selectedReason: '', // 存储选中的取消原因
      cancelReasons: [
        { value: '预约信息有误'},
        { value: '时间冲突'},
        { value: '更换医院'},
        { value: '病情自愈'},
        { value: '其它原因'},
        // 可以添加更多的取消原因
      ],
    };
  },
});
</script>

<template>
  <!-- 表格组件：预约信息 -->
  <el-table :data="paginatedAppointmentInfoList" stripe style="width: 100%">
    <!-- 表格列定义，根据实际数据结构进行调整 -->
    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column
      label="就诊时间"
      prop="clinicTime"
      width="200px"
    ></el-table-column>
    <el-table-column label="就诊医生" prop="doctorName"></el-table-column>
    <el-table-column label="就诊医院" prop="hospital"></el-table-column>
    <el-table-column label="就诊部门" prop="orderDepartment"></el-table-column>
    <el-table-column
      label="病情描述"
      prop="diseaseDescription"
    ></el-table-column>
    <el-table-column label="审核状态" prop="approvalStatus"></el-table-column>
    <el-table-column
      label="预约时间"
      prop="orderTime"
      width="200px"
    ></el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <!-- 使用 v-model 替代 .sync -->
        <el-button
          v-if="scope.row.approvalStatus === '正常'"
          type="text"
          @click="cancel(scope.row)"
          style="color: rgb(255, 1, 1)"
          >取消</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :hide-on-single-page="true"
    :current-page="currentPage"
    :page-size="pageSize"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="prev, pager, next, jumper"
    :total="this.appointments_display?.length"
    @size-change="handleSizeChange"
    @current-change="handlePageChange"
  />

<!--  <el-dialog v-model="cancelDialogVisible" title="取消原因">-->
<!--    <el-input-->
<!--      v-model="cancelReason"-->
<!--      placeholder="请输入取消原因"-->
<!--      :rows="5"-->
<!--      type="textarea"-->
<!--      style="margin-bottom: 20px"-->
<!--    />-->
<!--    <span class="dialog-footer">-->
<!--      <el-button type="primary" @click="confirmCancel">确认</el-button>-->
<!--      <el-button @click="cancelDialogVisible = false">取消</el-button>-->
<!--    </span>-->
<!--  </el-dialog>-->

    <!-- 申请取消 -->
    <el-dialog v-model="cancelDialogVisible" width="50%" title="申请取消" align-center>
      <el-radio-group v-model="selectedReason">
        <el-radio :label="reason.value" :key="reason" v-for="reason in cancelReasons">
          {{ reason.value }}
        </el-radio>
      </el-radio-group>
      <div style="display: flex; justify-content: flex-end; margin-top: 40px;margin-right: 40px;">
        <el-button plain type="danger" size="mini" @click="confirmCancel">
          申请取消
        </el-button>
      </div>
    </el-dialog>
    <!-- 取消成功提示 -->

</template>

<style scoped>
</style>