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

          <!-- 表格组件：医生信息 -->
          <el-table v-if="activeTab === 'doctor-info'" :data="医生" style="width: 100%">
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
          </el-table>
          <!-- 分页组件 -->
          <el-pagination v-if="医生.length > pageSize" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" :total="医生.length" @size-change="handleSizeChange"
            @current-change="handlePageChange"></el-pagination>


          <!-- 第二个 Tab 标签：新接口返回的数据 -->

          <!-- 表格组件：新接口返回的数据 -->
          <el-table v-if="activeTab === 'patient-info'" :data="患者" style="width: 100%">
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
          <el-pagination v-if="患者.length > pageSize" :current-page="newApiCurrentPage" :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize" :total="患者.length" @size-change="handleSizeChange"
            @current-change="handleNewApiPageChange"></el-pagination>


          <!-- 其他 Tab 标签 -->
          <!-- 可根据需要添加更多的标签页 -->
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      activeTab: 'doctor-info',
      医生: [],
      患者: [],
      currentPage: 1,
      newApiCurrentPage: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.getDoctorData();
    this.getPatientData();
  },
  methods: {
    async getDoctorData() {
      try {
        const response = await axios.get('http://localhost:8301/api/approval/doctor', {
          params: {
            adminUsername: 'ly',
          },
        });
        this.医生 = response.data.data;
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    },
    async getPatientData() {
      try {
        const response = await axios.get('http://localhost:8301/api/approval/patient', {
          params: {
            adminUsername: 'ly',
          },
        });
        this.患者 = response.data.data;
      } catch (error) {
        console.error('Error fetching new API data:', error);
      }
    },
    handleSizeChange(size: number) {
      this.pageSize = size;
    },
    handlePageChange(currentPage: number) {
      this.currentPage = currentPage;
    },
    handleNewApiPageChange(newApiCurrentPage: number) {
      this.newApiCurrentPage = newApiCurrentPage;
    },
    async Allow(row: any, listName: string) {
      console.log('Edit row:', row, 'from list:', listName, 'Boolean Value:', true);
      const idValue = row.id;
      const kindValue = listName;
      const judgeValue = 1;
      this.check_sendData(idValue, kindValue, judgeValue);
    },
    async Reject(row: any, listName: string) {
      console.log('Edit row:', row, 'from list:', listName, 'Boolean Value:', false);
      const idValue = row.id;
      const kindValue = listName;
      const judgeValue = 0;
      this.check_sendData(idValue, kindValue, judgeValue);
    },
    async check_sendData(approvalId: number, kind: string, judge: number) {
      try {
        const response = await axios({
          method: 'put',
          url: 'http://localhost:8301/api/approval/checkresult',
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
    handleSelect(key: string) {
      this.activeTab = key === '1' ? 'doctor-info' : 'patient-info';
    },
  },
});
</script>

<style scoped>
/* 可以添加样式 */
</style>
