<!-- 
    页面：医院页面
    角色：患者
    功能：展示医院信息、医院可预约的医生（点击可跳转到患者预约医生页面）
-->
<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from '../components/HomeView/NavigationBar.vue'
import PageFooting from '../components/HomeView/PageFooting.vue'
import HospitalInfo from "@/components/HospitalView/HospitalInfo.vue";
import DoctorList from "@/components/HospitalView/DoctorList.vue";

export default defineComponent({
  name: 'HospitalView',
  components: {
    NavigationBar,
    PageFooting,
    HospitalInfo,
    DoctorList
  },
  data() {
    return {
      hospitalId: this.$route.params.id,
    }
  }
});
</script>

<template>
  <NavigationBar/>

  <HospitalInfo/>
  <DoctorList :hospitalId="hospitalId"/>
  <PageFooting/>

</template>

<style scoped>
.wrap-container{
  width: 1200px;
  /* box-sizing: border-box; */
  margin: 16px auto;
}
</style>