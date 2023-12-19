<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'DoctorTime',
  data() {
    return {
      doctorTime : [
        {
          date: '2023-12-18 周一 下午',

          action: '已约满',
        },
        {
          date: '2023-12-19 周二 上午',
          action: '已约满',
        },
        ]
    }
  }
})
</script>

<template>
  <div class="main-container">
    <el-table :data="doctorTime" stripe style="width: 100%">
      <el-table-column prop="date" label="时间" width="180" />
      <el-table-column prop="name" label="科室" width="180" />
      <el-table-column prop="action" label="操作" />
    </el-table>
  </div>
</template>

<style scoped>
.main-container {
  position: relative;
  margin: 20px auto 0;
  width: 1140px;
  background: #fff;
  box-shadow: 0 12px 40px 0 rgba(0,7,50,.09), 0 0 2px 0 rgba(0,0,0,.04);
  padding: 16px 30px 14px;
}
</style>