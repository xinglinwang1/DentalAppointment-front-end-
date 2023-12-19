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
  <DoctorTime/>
  <PageFooting/>
</template>

<style scoped>

</style>