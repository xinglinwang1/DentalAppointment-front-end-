<!-- 
    页面：医生主页
    角色：医生
    功能：医生个人信息页面
-->
<template>
  <div>
    <!-- <NavigationBar/>
    <DoctorInfo :doctorname="doctorname"/>
    -->
  </div>

  <el-container >
    <el-aside width="200px" >
      <el-menu
          default-active="patient_info"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          style="height: 600px"
      >
        <el-menu-item index="doctor_info">
          <el-icon><Plus /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="schedule">
          <el-icon><document /></el-icon>
          <span>预约时间表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <DoctorInfoPanel v-if="activeTab === 'doctor_info'"/>

    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DoctorInfoPanel from "@/components/DoctorHomeView/DoctorInfoPanel.vue";
// import NavigationBar from '../components/HomeView/NavigationBar.vue'
// import PageFooting from '../components/HomeView/PageFooting.vue'


export default defineComponent({
    name: 'DoctorHomeView',

    components: {DoctorInfoPanel},
    methods :{
      handleSelect(key: string){
        if(key === "schedule") {
          this.$router.push("/scheduling/1")
        }
        else {
          this.activeTab = key
        }
      },

    },
    data() {
      return {
        activeTab: 'doctor_info',

      }
    }

})
</script>

<style scoped>

</style>