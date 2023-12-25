<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "MyMessagePanel",
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
        const response = await axios({
          method: 'post',
          url: 'http://localhost:8302/api/message/get_usermessage',
          data: {
            username: 'patient456',
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        this.messages = response.data.data;
      } catch (error) {
        console.error('Error fetching message data:', error);
      }
    },

  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      messages: [
        {
          id: "0",
          time: "1",
          sender: "2",
          receiver: "3",
          context: "4"
        }
      ]
    }
  }
})
</script>

<template>
  <!-- 表格组件：消息 -->
  <el-table :data="messages" style="width: 100%">
    <!-- 表格列定义，根据实际数据结构进行调整 -->
    <el-table-column label="时间" prop="time"></el-table-column>
    <el-table-column label="发送人" prop="sender"></el-table-column>
    <el-table-column label="内容" prop="content"></el-table-column>

  </el-table>
  <!-- 分页组件 -->
  <el-pagination v-if="messages.length > pageSize" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]"
                 :page-size="pageSize" :total="messages.length" @size-change="handleSizeChange"
                 @current-change="handlePageChange"></el-pagination>
</template>


<style scoped>

</style>