<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect" style="height: 600px">
          <el-menu-item index="1">
            <el-icon>
              <Plus />
            </el-icon>
            <span>医生审核</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <document />
            </el-icon>
            <span>患者审核</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- Element UI Tab 组件 -->
        <el-tabs v-model="activeTab" type="border-card" style="height: 100%">

          <div class="table_doctor">
            <!-- 表格组件：医生信息 -->
            <el-table v-if="activeTab === 'doctor-info'" :data="paginatedReserveInfoList_Doctor" stripe
              style="width: 100%">
              <!-- 表格列定义，根据实际数据结构进行调整 -->
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column label="医生用户名" prop="doctorUsername"></el-table-column>
              <el-table-column label="预约ID" prop="orderId"></el-table-column>
              <el-table-column label="管理员用户名" prop="adminUsername"></el-table-column>
              <el-table-column label="取消原因" prop="cancelReason"></el-table-column>
              <el-table-column label="审核状态" prop="auditStatus"></el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <!-- 使用 v-model 替代 .sync -->
                  <el-button type="text" @click="Allow(scope.row, '医生')" style="color: rgb(1, 255, 1);">√</el-button>
                  <!-- 添加自定义按钮 -->
                  <el-button type="text" @click="Reject(scope.row, '医生')" style="color: rgb(255, 2, 2);">×</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template v-slot="scope">
                  <el-button plain type="danger" size="mini" @click="seeKpi(scope.row.doctorUsername)">查看kpi</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <div class="pagination_d">
              <div class="doctor">
                <el-pagination :hide-on-single-page="true" :current-page="currentPage_doctor" :page-size="pageSize_doctor"
                  layout="prev, pager, next, jumper" :total="Doctor_display.length"
                  @current-change="handleCurrentChange_doctor" />
              </div>
            </div>
          </div>


          <div class="table_patient">
            <!-- 表格组件：新接口返回的数据 -->
            <el-table v-if="activeTab === 'patient-info'" :data="paginatedReserveInfoList_Patient" stripe
              style="width: 100%">
              <!-- 表格列定义，与第一个表格一致 -->
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column label="患者用户名" prop="patientUsername"></el-table-column>
              <el-table-column label="预约ID" prop="orderId"></el-table-column>
              <el-table-column label="管理员用户名" prop="adminUsername"></el-table-column>
              <el-table-column label="取消原因" prop="cancelReason"></el-table-column>
              <el-table-column label="审核状态" prop="auditStatus"></el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <!-- 使用 v-model 替代 .sync -->
                  <el-button type="text" @click="Allow(scope.row, '患者')" style="color: rgb(1, 255, 1);">√</el-button>
                  <el-button type="text" @click="Reject(scope.row, '患者')" style="color: rgb(255, 2, 2);">×</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <div class="pagination_p">
              <div class="patient">
                <el-pagination :hide-on-single-page="true" :current-page="currentPage_patient"
                  :page-size="pageSize_patient" layout="prev, pager, next, jumper" :total="Patient_display.length"
                  @current-change="handleCurrentChange_patient" />
              </div>
            </div>
          </div>

        </el-tabs>
      </el-main>
    </el-container>
    <!-- kpi -->
    <el-dialog v-model="kpiVisible" width="60%" title="kpi" align-center>
      <div v-for="kpiInfo in kpiInfos" :key="kpiInfo.date">
        <div>日期：{{ kpiInfo.date }}</div>
        <div>kpi：{{ kpiInfo.kpi }}</div>
        <br />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import NavigationBar from '../components/HomeView/NavigationBar.vue'
import axios from 'axios';
import store from '@/store'

export default defineComponent({
  name: 'AdminHomelView',
  components: {
    // NavigationBar
  },
  data() {
    return {
      activeTab: 'doctor-info',
      医生: [],
      患者: [],
      Patient_display: [],
      Doctor_display: [],
      currentPage_patient: 1,
      currentPage_doctor: 1,
      pageSize_patient: 10,
      pageSize_doctor: 10,
      kpiVisible: false,
      kpiInfos: [],
      doctorInfo: {},
      currentDate: new Date(),
      formattedDate: '',
    };
  },
  mounted() {
    this.getDoctorData();
    this.getPatientData();
    this.formatDate();
  },
  computed: {
    // 分页预约数据
    paginatedReserveInfoList_Patient() {
      const start = (this.currentPage_patient - 1) * this.pageSize_patient;
      const end = start + this.pageSize_patient;
      return this.Patient_display.slice(start, end);
    },
    paginatedReserveInfoList_Doctor() {
      const start = (this.currentPage_doctor - 1) * this.pageSize_doctor;
      const end = start + this.pageSize_doctor;
      return this.Doctor_display.slice(start, end);
    },
  },
  methods: {
    formatDate() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1; // Months are zero-based
      this.formattedDate = `${year}-${month}`;
      console.log(this.formattedDate);
    },
    async getDoctorData() {
      try {
        const response = await axios.get('http://118.195.236.254:8301/api/approval/doctor', {
          params: {
            adminUsername: store.state.username,
          },
        });
        this.医生 = response.data.data;
        this.Doctor_display = this.医生;
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    },
    async getPatientData() {
      try {
        const response = await axios.get('http://118.195.236.254:8301/api/approval/patient', {
          params: {
            adminUsername: store.state.username,
          },
        });
        this.患者 = response.data.data;
        this.Patient_display = this.患者;
      } catch (error) {
        console.error('Error fetching new API data:', error);
      }
    },
    async getallinfo(doctorUsername) {
      return new Promise((resolve, reject) => {
        axios.get('http://121.43.108.102:8101/api/doctor/' + doctorUsername)
          .then((response) => {
            this.doctorInfo = response.data.data;
            console.log(this.doctorInfo);
            resolve();
          })
          .catch((error) => {
            console.error('Error fetching patient data:', error);
            reject(error);
          });
      });
    },
    async getKpi() {
      //todo:日期格式化
      try {
        const response = await axios.get('http://118.195.236.254:8401/api/hospital/' + parseInt(this.doctorInfo.hospitalId) + '/kpi/doctor/' + this.doctorInfo.jobNumber + '/month/'+this.formattedDate);
        this.kpiInfos = response.data.data;
        console.log(this.kpiInfos);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    },
    seeKpi(doctorUsername) {
      this.getallinfo(doctorUsername).then(() => {
        this.getKpi();
      })
      this.kpiVisible = true;
    },
    handleCurrentChange_patient(newPage) {
      this.currentPage_patient = newPage;
    },
    handleCurrentChange_doctor(newPage) {
      this.currentPage_doctor = newPage;
    },
    async Allow(row, listName) {
      console.log('Edit row:', row, 'from list:', listName, 'Boolean Value:', true);
      const idValue = row.id;
      const kindValue = listName;
      const judgeValue = 1;
      this.check_sendData(idValue, kindValue, judgeValue);
      window.alert('审核通过');
    },
    async Reject(row, listName) {
      console.log('Edit row:', row, 'from list:', listName, 'Boolean Value:', false);
      const idValue = row.id;
      const kindValue = listName;
      const judgeValue = 0;
      this.check_sendData(idValue, kindValue, judgeValue);
      window.alert('审核不通过');
    },
    async check_sendData(approvalId, kind, judge) {
      try {
        const response = await axios({
          method: 'put',
          url: 'http://118.195.236.254:8301/api/approval/checkresult',
          data: {
            approvalId: approvalId,
            kind: kind,
            judge: judge,
          },
          transformRequest: [
            function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              ret = ret.substring(0, ret.lastIndexOf('&'));
              return ret
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        this.getDoctorData();
        this.getPatientData();
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    },
    handleSelect(key) {
      this.currentPage_patient = 1;
      this.currentPage_doctor = 1;
      this.activeTab = key === '1' ? 'doctor-info' : 'patient-info';
    },
  },
});
</script>

<style scoped>
/* 可以添加样式 */
</style>
