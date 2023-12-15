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