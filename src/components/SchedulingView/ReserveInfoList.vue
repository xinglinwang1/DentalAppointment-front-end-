<template>
  <div>
    <div class="search">
      <el-button type="warning" plain style="margin-left: 30px" @click="changeShowingList('all')">全部</el-button>
      <el-button type="info" plain style="margin-left: 30px" @click="showCalendar()">选择日期</el-button>
      <span class="chosenDate" v-if="formattedChosenDate">{{ formattedChosenDate }}</span>
    </div>

    <div class="table">
      <!-- 预约信息列表 -->
      <el-table :data="paginatedReserveInfoList" stripe>
        <el-table-column prop="id" label="单号" width="80" align="center" sortable></el-table-column>
        <el-table-column prop="patientName" label="患者姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orderDepartment" label="预约科室" show-overflow-tooltip></el-table-column>
        <el-table-column prop="clinicTime" label="就诊时间" sortable></el-table-column>
        <el-table-column prop="approvalStatus" label="挂号状态"></el-table-column>

        <el-table-column label="操作" width="120" align="center">
          <template v-slot="scope">
            <el-button plain type="warning" size="mini" @click="seeDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120" align="center">
          <template v-slot="scope">
            <el-button plain type="warning" size="mini" @click="seeCases(scope.row)">查看病历</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120" align="center">
          <template v-slot="scope">
            <el-button plain type="danger" size="mini" @click="seeCancel(scope.row)">申请取消</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 下方分页及跳转 -->
      <div class="pagination">
        <div class="demo-pagination-block tocenter">
          <el-pagination :hide-on-single-page="true" :current-page="currentPage" :page-size="pageSize" :small="small"
            :disabled="disabled" :background="background" layout="prev, pager, next, jumper"
            :total="this.reserveInfoListForPaginat?.length" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>

    <!-- 日历 -->
    <el-dialog v-model="calendarDialogVisible" width="60%" title="选择日期" align-center>
      <div class="calendar">
        <el-calendar v-model="chosenDate">
          <template #date-cell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }}
              {{ data.isSelected ? '✔️' : '' }}
            </p>
          </template>
        </el-calendar>
      </div>
    </el-dialog>

    <!-- 预约详情 -->
    <el-dialog v-model="detailsDialogVisible" width="60%" title="预约详情" align-center>
      <div>单号：{{ reserveDetials.id }}</div>
      <div>患者性别：{{ patientInfo.gender }}</div>
      <div>患者年龄：{{ patientAge }}</div>
      <div>患者姓名：{{ reserveDetials.patientName }}</div>
      <div>病情描述：{{ reserveDetials.diseaseDescription }}</div>
    </el-dialog>

    <!-- 病历 -->
    <el-dialog v-model="caseVisible" width="60%" title="患者病历" align-center>
      <div>单号：{{ reserveDetials.id }}</div>
      <div>患者性别：{{ patientInfo.gender }}</div>
      <div>患者年龄：{{ patientAge }}</div>
      <div>患者姓名：{{ reserveDetials.patientName }}</div>
      <div>病情描述：{{ reserveDetials.diseaseDescription }}</div>
    </el-dialog>

    <!-- 申请取消 -->
    <el-dialog v-model="cancelVisible" width="50%" title="申请取消" align-center>
      <el-radio-group v-model="radio">
        <el-radio :label="3">时间冲突</el-radio>
        <el-radio :label="6">医生生病</el-radio>
        <el-radio :label="9">医生请假</el-radio>
        <el-radio :label="12">其他原因</el-radio>
      </el-radio-group>
      <div>{{ deleteOrder.id }}</div>
      <div style="display: flex; justify-content: flex-end; margin-top: 40px;margin-right: 40px;">
        <el-button plain type="danger" size="mini" @click="cancelSubmit(deleteOrder.id)">
          申请取消
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios'

export default defineComponent({
  name: 'ReserveInfoList',
  props: {
    doctorname: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // 所有的预约数据
      reserveInfoListAll: [],
      // 某天的所有预约数据
      reserveInfoListByDate: [],
      // 用于分页的预约数据
      reserveInfoListForPaginat: [],
      // 当前页面的初始值
      currentPage: 1,
      // 每页中展示的预约信息条数
      pageSize: 10,
      // 日历是否显示
      calendarDialogVisible: false,
      // 选中的日期
      chosenDate: null,
      // 规范化后的日期
      formattedChosenDate: null,
      // 预约详情是否显示
      detailsDialogVisible: false,
      // 预约详情
      reserveDetials: null,
      //申请取消
      //当前选择的值
      radio: 3,
      //取消是否显示
      cancelVisible: false,
      // 当前选择的描述
      description: '',
      //要取消的订单
      deleteOrder: {},
      //要查看详情的患者信息
      patientInfo: {},
      //要查看患者的年龄
      patientAge: null,
      //病历是否显示
      caseVisible: false,
      //要查看的病历
      patientCase: [],
      //医生用户名
      doctorUsername: '',
    }
  },
  mounted() {
    //取得医生信息
    this.getDoctorInfo(this.doctorname)
  .then(() => {
    this.getReserveInfoListAll(this.doctorUsername)
      .then(() => {
        this.reserveInfoListForPaginat = this.reserveInfoListAll;
      });
  });

    console.log(this.reserveInfoListForPaginat);
// 获取所有的预约数据
// this.getReserveInfoListAll(1)
//   .then(() => {
//     this.reserveInfoListForPaginat = this.reserveInfoListAll;
//   });
// console.log(this.reserveInfoListForPaginat);
// // 将上面解注释，下面注释

// this.reserveInfoListAll = [
//   {
//     "id": 109,
//     "doctorId": 1,
//     "orderDepartment": "Dentistry",
//     "patientId": "yz",
//     "patientName": "王一",
//     "patientGender": 1,
//     "patientAge": 50,
//     "clinicTime": "2024-02-02T09:00:00",
//     "diseaseDescription": "牙缝修复，希望预约口腔科",
//     "approvalStatus": "正常"
//   },
//   {
//     "id": 45,
//     "doctorId": 1,
//     "orderDepartment": "Dentistry",
//     "patientId": "a",
//     "patientName": "刘二",
//     "patientGender": 1,
//     "patientAge": 50,
//     "clinicTime": "2024-02-02T10:00:00",
//     "diseaseDescription": "牙缝修复，希望预约口腔科",
//     "approvalStatus": "正常"
//   },
//   {
//     "id": 46,
//     "doctorId": 1,
//     "orderDepartment": "Dentistry",
//     "patientId": "b",
//     "patientName": "孙三",
//     "patientGender": 1,
//     "patientAge": 50,
//     "clinicTime": "2024-02-03T09:00:00",
//     "diseaseDescription": "牙缝修复，希望预约口腔科",
//     "approvalStatus": "正常"
//   },
//   {
//     "id": 47,
//     "doctorId": 2,
//     "orderDepartment": "Dentistry",
//     "patientId": "c",
//     "patientName": "赵四",
//     "patientGender": 1,
//     "patientAge": 50,
//     "clinicTime": "2023-12-03T09:00:00",
//     "diseaseDescription": "牙缝修复，希望预约口腔科",
//     "approvalStatus": "正常"
//   },
//   {
//     "id": 48,
//     "doctorId": 3,
//     "orderDepartment": "Dentistry",
//     "patientId": "d",
//     "patientName": "李五",
//     "patientGender": 1,
//     "patientAge": 50,
//     "clinicTime": "2024-02-02T09:00:00",
//     "diseaseDescription": "牙缝修复，希望预约口腔科",
//     "approvalStatus": "正常"
//   },
// ]
// this.reserveInfoListForPaginat = this.reserveInfoListAll
},
computed: {
  // 分页预约数据
  paginatedReserveInfoList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.reserveInfoListForPaginat.slice(start, end);
  },
},
watch: {
  chosenDate(newValue) {
    console.log('chosenDate changed:', newValue);
    // 格式化处理选中的日期
    this.formattedChosenDate = this.formatDate(this.chosenDate);
    // 按日期获取预约数据
    // if (!this.reserveInfoListByDate) {
    // 如果reserveInfoListByDate为空才从后端获取，避免重复性工作
    this.getReserveInfoListByDate(this.formattedChosenDate)
    // }
    // 将reserveInfoListByDate赋值给reserveInfoListForPaginat
    this.reserveInfoListForPaginat = this.reserveInfoListByDate;
    // 关闭日历对话框
    this.calendarDialogVisible = false;
  },
},
methods: {
  getDoctorInfo(doctorId) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:8101/api/doctor/id/${doctorId}`)
        .then(response => {
          this.doctorUsername = response.data.data.username;
          console.log(this.doctorUsername);
          resolve(); // 执行resolve函数表示异步操作完成
        })
        .catch(error => {
          console.error(error);
          reject(error); // 执行reject函数表示异步操作出错
        });
    });
  },

  // 按医生ID获取所有的预约数据，存到reserveInfoListAll中。
  // 当页面刚加载时（在mounted里面）/点击“全部”按钮时（调用changeShowingList），再将其赋值给reserveInfoListForPaginat，
  // 因为页面刚加载时默认显示全部预约信息
  getReserveInfoListAll(doctorUsername) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:8201/api/appointment/get/doctor/${doctorUsername}`)
        .then(response => {
          this.reserveInfoListAll = response.data.data;
          console.log(this.reserveInfoListAll);
          resolve(); // 执行resolve函数表示异步操作完成
        })
        .catch(error => {
          console.error(error);
          reject(error); // 执行reject函数表示异步操作出错
        });
    });
  },
  // 按医生ID和日期获取所有的预约数据，存到reserveInfoListByDate中。
  // 当选中日期时（监视属性chosenDate变化），再将其赋值给reserveInfoListForPaginat，
  getReserveInfoListByDate(date) {
    this.reserveInfoListByDate = this.reserveInfoListAll.filter(order => {
      const dateString = date.split('星')[0]
      const orderDateString = this.formatDate(order.clinicTime).split('星')[0]
      // const orderDateString = new Date(order.clinicTime).toISOString().split('T')[0];
      console.log(orderDateString)
      return orderDateString === dateString;
    });
  },
  //更新取消原因的描述
  updateDescription() {
    console.log(this.description);
    if (this.radio === 3) {
      this.description = '时间冲突';
    } else if (this.radio === 6) {
      this.description = '医生生病';
    } else if (this.radio === 9) {
      this.description = '医生请假';
    } else if (this.radio === 12) {
      this.description = '其他原因';
    }
  },
  //调用取消接口，申请取消目标预约
  cancelSubmit() {
    this.updateDescription();
    const cancelRequest = {
      orderId: this.deleteOrder.id,
      cancelReason: this.description
    };

    axios.put('http://localhost:8201/api/appointment/cancel/doctor', cancelRequest)
      .then(response => {
        // 处理成功响应
        console.log(response.data);
      })
      .catch(error => {
        // 处理错误
        console.error(error);
      });
  },
  // 点击页数后改变currentPage
  handleCurrentChange(newPage) {
    this.currentPage = newPage;
  },
  // 点击“全部”按钮，将reserveInfoListAll赋值给reserveInfoListForPaginat
  changeShowingList() {
    this.reserveInfoListForPaginat = this.reserveInfoListAll;
  },
  showCalendar() {
    this.calendarDialogVisible = true;
  },
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('zh-CN', options);
  },
  //根据id获取用户信息
  getPatientInfo(patientId) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:8101/api/patient/${patientId}`)
        .then(response => {
          this.patientInfo = response.data.data;
          console.log(this.patientInfo);
          resolve(); // 执行resolve函数表示异步操作完成
        })
        .catch(error => {
          console.error(error);
          reject(error); // 执行reject函数表示异步操作出错
        });
    });
  },
  //根据生日计算年龄
  calculateAge() {
    const today = new Date();
    const birthDate = new Date(this.patientInfo.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();

    // 检查是否已经过了生日
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.patientAge = age;
  },
  seeDetails(detials) {
    this.getPatientInfo(detials.patientId).then(() => {
      this.calculateAge();
      this.reserveDetials = detials;
      this.detailsDialogVisible = true;
    });

  },
  getPatientCase(patientIdNum) {
    //TODO:参数之后改
    axios.get(`http://localhost:8401/api/hospital/3/medical-record/${patientIdNum}`)
      .then(response => {
        this.patientCase = response.data.data;
        console.log(this.patientCase);
      })
      .catch(error => {
        console.error(error);
      });
  },
  seeCases(order) {
    this.getPatientInfo(order.patientId).then(() => {
      this.getPatientCase(this.patientInfo.idNumber)
    });
    this.caseVisible = true;
  },
  seeCancel(order) {
    this.deleteOrder = order;
    this.cancelVisible = true;
  },

}
})
</script>

<style scoped>
.search {
  position: relative;
  margin: 20px auto 0;
  padding: 10px;
  width: 1140px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.pagination {
  margin-top: 10px;
}

.table {
  position: relative;
  margin: 0 auto 0;
  width: 1140px;
  background: #fff;
  box-shadow: 0 12px 40px 0 rgba(0, 7, 50, .09), 0 0 2px 0 rgba(0, 0, 0, .04);
  padding: 16px 30px 14px;
}

.chosenDate {
  margin-left: 260px;
}

.calendat {
  height: 60%;
}

.is-selected {
  color: #1989fa;
}
</style>