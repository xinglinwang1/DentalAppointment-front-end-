<!-- 
    页面：患者主页
    角色：患者
    功能：患者个人信息页面，展示患者个人信息、预约记录等
-->
<script lang="ts">
import { defineComponent } from 'vue'
import UserHome from "@/components/UserHomeView/UserHome.vue";
import PageFooting from "@/components/HomeView/PageFooting.vue";

export default defineComponent({
  name: 'UserView',
  components: {
    UserHome,
    PageFooting,
  },

})
</script>

<template>
  <UserHome/>
  <PageFooting/>
</template>

<style scoped>

</style>