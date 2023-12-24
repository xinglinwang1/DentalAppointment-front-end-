<!-- 
    页面：登录页
    角色：患者、医生、管理员
    功能：登录注册
-->
<template>
  <div>
    <LoginBackground/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LoginBackground from '../components/LoginView/LoginBackground.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginBackground,
  },

})
</script>

<style scoped>

</style>