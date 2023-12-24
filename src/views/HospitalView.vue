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

  <HospitalInfo :hospitalId="hospitalId"/>
  <DoctorList :hospitalId="hospitalId"/>
  <PageFooting/>

</template>

<style scoped>
.wrap-container{
  width: 1200px;
  //box-sizing: border-box;
  margin: 16px auto;
}
</style>