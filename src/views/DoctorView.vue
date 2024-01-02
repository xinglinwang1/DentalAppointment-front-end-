<!-- 
    页面：患者预约医生页面
    角色：患者
    功能：患者在本页面查看医生的可预约时间段，并进行预约操作
-->
<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from '../components/HomeView/NavigationBar.vue'
import PageFooting from '../components/HomeView/PageFooting.vue'
import DoctorInfo from "@/components/DoctorView/DoctorInfo.vue";
import DoctorTime from "@/components/DoctorView/DoctorTime.vue";

export default defineComponent({
  name: 'HospitalView',
  components: {
    DoctorTime,
    NavigationBar,
    PageFooting,
    DoctorInfo,
  },
  props: {
    hospitalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      doctorname: this.$route.params.doctorname,
    }
  }
});
</script>

<template>
  <NavigationBar/>
  <DoctorInfo :doctorname="doctorname"/>
  <DoctorTime :doctorname="doctorname" :hospitalId="hospitalId"/>
  <PageFooting/>
</template>

<style scoped>

</style>