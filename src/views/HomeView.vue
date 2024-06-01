<!-- 
    页面：首页
    角色：患者、医生、管理员
    功能：本系统的首页，展示地图等信息，包含登录入口
-->
<template>
  <div class="home">
    <NavigationBar/>
    <NavigationMenu/>
    <DoctorClassification/>
    <DoctorEntrance/>
    <ReservationBar/>
    <HospitalMap/>
    <ArticleSet/>
    <!-- <VisitingExperts/> -->

    <PageFooting/>
    <AIEntrance/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from '../components/HomeView/NavigationBar.vue'
import NavigationMenu from '../components/HomeView/NavigationMenu.vue'
import DoctorClassification from '../components/HomeView/DoctorClassification.vue'
import ArticleSet from '../components/HomeView/ArticleSet.vue'
//import VisitingExperts from '../components/HomeView/VisitingExperts.vue'
import DoctorEntrance from '../components/HomeView/DoctorEntrance.vue'
import ReservationBar from '../components/HomeView/ReservationBar.vue'
import HospitalMap from '../components/HomeView/HospitalsMap.vue'

import PageFooting from '../components/HomeView/PageFooting.vue'

import AIEntrance from '../components/AI/AIEntrance.vue'
import store from "@/store";

export default defineComponent({
  name: 'HomeView',
  components: {
    NavigationBar,
    NavigationMenu,
    DoctorClassification,
    ArticleSet,
    //VisitingExperts,
    DoctorEntrance,
    ReservationBar,
    HospitalMap,

    PageFooting,
    AIEntrance,
  },
  mounted() {
    console.log(store.state.role)
    console.log(store.state.username)
    console.log(store.state.token)
  }
});
</script>
