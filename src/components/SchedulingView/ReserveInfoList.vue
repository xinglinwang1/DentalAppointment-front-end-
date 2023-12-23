<template>
  <div>
    <div class="search">
      <el-button type="warning" plain style="margin-left: 30px" @click="changeShowingList('all')">全部</el-button>
      <el-button type="info" plain style="margin-left: 30px" @click="showCalendar()">选择日期</el-button>
      <span class="chosenDate" v-if="formattedChosenDate">{{formattedChosenDate}}</span>
    </div>
    
    <div class="table">
      <!-- 预约信息列表 -->
      <el-table :data="paginatedReserveInfoList" stripe>
        <el-table-column prop="id" label="序号" width="80" align="center" sortable></el-table-column>
        <el-table-column prop="userName" label="患者姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="doctorName" label="医生姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="time" label="挂号时间"></el-table-column>
        <el-table-column prop="status" label="挂号状态"></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button plain type="warning" size="mini" @click="seeDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 下方分页及跳转 -->
      <div class="pagination">
        <div class="demo-pagination-block tocenter">
          <el-pagination
            :hide-on-single-page="true"
            :current-page="currentPage"
            :page-size="pageSize"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next, jumper"
            :total="this.reserveInfoListForPaginat?.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 日历 -->
    <el-dialog
      v-model="calendarDialogVisible"
      width="60%"
      title="选择日期"
      align-center
    >
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
    <el-dialog
      v-model="detailsDialogVisible"
      width="60%"
      title="预约详情"
      align-center
    >
      <div>{{ reserveDetials.id }}</div>
      <div>{{ reserveDetials.conditionDescription }}</div>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ReserveInfoList',
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
        pageSize: 3,
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
      }
    },
    mounted() {
      // 获取所有的预约数据
      // getReserveInfoListAll();
      // this.reserveInfoListForPaginat = this.reserveInfoListAll
      // 将上面解注释，下面注释
        this.reserveInfoListForPaginat = [
            {
                "id": 44,
                "doctorId": 1,
                "dept": "Dentistry",
                "patientId": "456789012345678901",
                "patientName": "王一",
                "patientGender": 1,
                "patientAge": 50,
                "treatmentTime" : "2024-02-02T09:00:00",
                "conditionDescription": "牙缝修复，希望预约口腔科",
            },
            {
                "id": 45,
                "doctorId": 1,
                "dept": "Dentistry",
                "patientId": "456789012345678902",
                "patientName": "刘二",
                "patientGender": 1,
                "patientAge": 50,
                "treatmentTime" : "2024-02-02T10:00:00",
                "conditionDescription": "牙缝修复，希望预约口腔科",
            },
            {
                "id": 46,
                "doctorId": 1,
                "dept": "Dentistry",
                "patientId": "456789012345678903",
                "patientName": "孙三",
                "patientGender": 1,
                "patientAge": 50,
                "treatmentTime" : "2024-02-03T09:00:00",
                "conditionDescription": "牙缝修复，希望预约口腔科",
            },
            {
                "id": 47,
                "doctorId": 2,
                "dept": "Dentistry",
                "patientId": "456789012345678904",
                "patientName": "赵四",
                "patientGender": 1,
                "patientAge": 50,
                "treatmentTime" : "2024-02-02T09:00:00",
                "conditionDescription": "牙缝修复，希望预约口腔科",
            },
            {
                "id": 48,
                "doctorId": 3,
                "dept": "Dentistry",
                "patientId": "456789012345678905",
                "patientName": "李五",
                "patientGender": 1,
                "patientAge": 50,
                "treatmentTime" : "2024-02-02T09:00:00",
                "conditionDescription": "牙缝修复，希望预约口腔科",
            },
        ]
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
        //if(!reserveInfoListByDate) {
          //// 如果reserveInfoListByDate为空才从后端获取，避免重复性工作
          //this.getReserveInfoListByDate(idxxx, datexxx)
        //}
        // 将reserveInfoListByDate赋值给reserveInfoListForPaginat
        //this.reserveInfoListForPaginat = this.reserveInfoListByDate;
        // 关闭日历对话框
        this.calendarDialogVisible = false;
      },
    },
    methods: {
      // 按医生ID获取所有的预约数据，存到reserveInfoListAll中。
      // 当页面刚加载时（在mounted里面）/点击“全部”按钮时（调用changeShowingList），再将其赋值给reserveInfoListForPaginat，
      // 因为页面刚加载时默认显示全部预约信息
      // getReserveInfoListAll(id){
            
      // },
      // 按医生ID和日期获取所有的预约数据，存到reserveInfoListByDate中。
      // 当选中日期时（监视属性chosenDate变化），再将其赋值给reserveInfoListForPaginat，
      // getReserveInfoListByDate(id, date) {

      // },

      // 点击页数后改变currentPage
      handleCurrentChange(newPage) {
        this.currentPage = newPage;
      },
      // 点击“全部”按钮，将reserveInfoListAll赋值给reserveInfoListForPaginat
    //   changeShowingList() {
    //     this.reserveInfoListForPaginat = this.reserveInfoListAll;
    //   },
      showCalendar() {
        this.calendarDialogVisible = true;
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('zh-CN', options);
      },
      seeDetails(detials) {
        this.reserveDetials = detials;
        this.detailsDialogVisible = true;
      }
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
    box-shadow: 0 12px 40px 0 rgba(0,7,50,.09), 0 0 2px 0 rgba(0,0,0,.04);
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