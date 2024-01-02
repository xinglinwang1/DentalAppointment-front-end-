<script>
import { defineComponent } from "vue";
import store from "@/store";
import axios from 'axios';
export default defineComponent({
  name: 'DoctorTime',
  props: {
    doctorname: {
      type: String,
      required: true,
    },
    hospitalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      allInfo: {
        "08:00": 1,
        "09:00": 1,
        "10:00": 0,
        "11:00": 1,
        "14:00": 0,
        "15:00": 1,
        "16:00": 0,
      },
      timeRange: {
        "08:00": "8:00-9:00",
        "09:00": "9:00-10:00",
        "10:00": "10:00-11:00",
        "11:00": "11:00-12:00",
        "14:00": "14:00-15:00",
        "15:00": "15:00-16:00",
        "16:00": "16:00-17:00"
      },
      formInline: {
        user: '',
        region: ''
      },
      value1: '',
      value2: '',
      //选择日期
      chosenDate: null,
      //格式化日期
      formattedChosenDate: null,
      //选择时间
      chosenTime: null,
      appointFormVisible: false,
      //错误是否可见
      errorVisible: false,
      //医生
      doctorInfo: {},
      approvalVisible:false,
      failVisible:false,
      successVisible:false,
    }
  },
  computed: {
    timeSlots() {
      return Object.entries(this.allInfo);
    }
  },
  mounted() {
    // this.getDoctorInfo(this.doctorname);
    // this.getAllInfo();
  },
  watch: {
    chosenDate(newValue) {
      console.log('chosenDate changed:', newValue);
      // 格式化处理选中的日期
      this.formattedChosenDate = this.formatDate(this.chosenDate);
      // 按日期获取预约数据
      // if (!this.reserveInfoListByDate) {
      // 如果reserveInfoListByDate为空才从后端获取，避免重复性工作
      // this.getAllInfo()
      // }
    },
  },
  methods: {
    getAllInfo() {
      axios.get(`http://localhost:8401/api/hospital/${this.hospitalId}/appointment/doctor/${this.doctorname}/day/${this.formattedChosenDate}`)
        .then(response => {
          this.allInfo = response.data.data;
          console.log(this.allInfo);
        })
        .catch(error => {
          console.error(error);
        });
    },
    seeAppointForm(info) {
      if (this.chosenDate === null) {
        this.errorVisible = true;
        return;
      }
      this.formattedChosenDate = this.formatDate(this.chosenDate);
      this.appointFormVisible = true;
      this.chosenTime = info[0];
      console.log(this.chosenTime);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      return date.toLocaleDateString('zh-CN', options);
    },
    changeError() {
      this.errorVisible = false;
    },
    getDoctorInfo(doctorname) {
      return new Promise((resolve, reject) => {
        //TODO
        axios.get(`http://localhost:8101/api/doctor/id/${doctorname}`)
          .then(response => {
            this.doctorInfo = response.data.data;
            console.log(this.doctorInfo);
            resolve(); // 执行resolve函数表示异步操作完成
          })
          .catch(error => {
            console.error(error);
            reject(error); // 执行reject函数表示异步操作出错
          });
      });
    },
    //提交预约
    onSubmit() {
      //拿到doctor用户名
      this.getDoctorInfo(this.doctorname).then(() => {
        const bookRequest = {
          patientId: store.state.username,
          doctorId: this.doctorUsername,
          clinicTime: this.chosenDate + 'T' + this.chosenTime + ':00',
          orderDepartment: this.doctorInfo.department,
          diseaseDescription: this.formInline.user,
          hospital: this.hospitalId,
        };
        axios.put('http://localhost:8201/api/appointment/book', bookRequest)
          .then(response => {
            // 处理成功响应
            console.log(response.data);
            if(response.data.code===200)
              this.successVisible==true;
            if(response.data.code===500){
              if(response.data.message==='waiting for approval')
                this.approvalVisible==true;
              else
                this.failVisible==true
            }
          })
          .catch(error => {
            // 处理错误
            console.error(error);
            this.failVisible==true
          });
      });
    },
  },
})
</script>

<template>
  <el-alert v-if="approvalVisible" title="预约需审核" type="error" center show-icon @close="changeError">
  </el-alert>
  <el-alert v-if="failVisible" title="预约失败" type="error" center show-icon @close="changeError">
  </el-alert>
  <el-alert v-if="successVisible" title="成功预约" type="success" center show-icon @close="changeError">
  </el-alert>
  <el-alert v-if="errorVisible" title="请先选择日期" type="error" center show-icon @close="changeError">
  </el-alert>
  <div class="main-container">
    <div class="block">
      <span class="demonstration"></span>
      <el-date-picker v-model="chosenDate" type="date" placeholder="选择预约日期">
      </el-date-picker>
    </div>
    <el-table :data="timeSlots" stripe style="width: 100%">
      <el-table-column prop="time" label="时间">
        <template v-slot="{ row }">
          {{ timeRange[row[0]] }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="{ row }">
          {{ row[1] ? '可预约' : '已约满' }}
        </template>
      </el-table-column>
      <el-table-column label="挂号费">
        ￥40
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button plain type="primary" size="mini" :disabled="row[1] === 0"
            @click="seeAppointForm(row)">预约就诊</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 预约表单 -->
  <el-dialog v-model="appointFormVisible" width="60%" title="预约" align-center>
    <p>预约时间：{{ formattedChosenDate }} {{ chosenTime }}</p>
    <p>挂号费：￥40</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
      <el-form-item label="病情描述">
        <el-input v-model="formInline.user" placeholder="病情描述"></el-input>
      </el-form-item>
    </el-form>

    <!-- 将按钮放到右下角 -->
    <div style="text-align: right; margin-top: 20px;">
      <el-button type="primary" @click="onSubmit">预约</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.main-container {
  position: relative;
  margin: 20px auto 0;
  width: 1140px;
  background: #fff;
  box-shadow: 0 12px 40px 0 rgba(0, 7, 50, .09), 0 0 2px 0 rgba(0, 0, 0, .04);
  padding: 16px 30px 14px;
}
</style>