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