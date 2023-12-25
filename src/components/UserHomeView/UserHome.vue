<script lang="ts">
import { defineComponent } from 'vue'
import PatientInfoPanel from "@/components/UserHomeView/PatientInfoPanel.vue";
import MyAppointmentPanel from "@/components/UserHomeView/MyAppointmentPanel.vue";
import MyMessagePanel from "@/components/UserHomeView/MyMessagePanel.vue";

export default defineComponent({
  name: 'UserHome',
  components: {PatientInfoPanel, MyAppointmentPanel, MyMessagePanel},
  methods :{
    handleSelect(key: string){
      this.activeTab = key
    },

  },
  data() {
    return {
      activeTab: 'patient_info',

    }
  }

})
</script>

<template>
  <el-container >
    <el-aside width="200px" >
      <el-menu
          default-active="patient_info"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          style="height: 600px"
      >
        <el-menu-item index="patient_info">
          <el-icon><Plus /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="my_appointment">
          <el-icon><document /></el-icon>
          <span>我的预约</span>
        </el-menu-item>
        <el-menu-item index="my_message">
          <el-icon><setting /></el-icon>
          <span>我的消息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <PatientInfoPanel v-if="activeTab === 'patient_info'"/>

      <MyAppointmentPanel v-if="activeTab === 'my_appointment'"/>

      <MyMessagePanel v-if="activeTab === 'my_message'"/>

    </el-main>
  </el-container>


</template>

<style scoped>

</style>