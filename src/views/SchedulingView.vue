<!-- 
    页面：医生排班页面
    角色：医生
    功能：展示预约该医生的所有病人的预约信息 
-->
<template>
  <div>
    <NavigationBar/>
    <DoctorInfo :doctorname="doctorname"/>
    <ReserveInfoList/>
    <PageFooting/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import NavigationBar from '../components/HomeView/NavigationBar.vue'
import PageFooting from '../components/HomeView/PageFooting.vue'
import DoctorInfo from "@/components/DoctorView/DoctorInfo.vue";
import ReserveInfoList from '../components/SchedulingView/ReserveInfoList.vue'

export default defineComponent({
    name: 'SchedulingView',
    components: {
      NavigationBar,
      PageFooting,
      DoctorInfo,
      ReserveInfoList,
    },
    data() {
      return {
        doctorname: this.$route.params.doctorname,
      }
    }
})
</script>

<style scoped>

</style>