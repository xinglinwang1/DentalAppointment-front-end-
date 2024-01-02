<template>
  <div class="doctor-entrance-container" @click="this.$router.push({ name: 'DoctorHomeView' })">
    <img class="doctor-image" src="../../assets/images/doctor.png" alt="no image">
    <span class="doctor-entrance-font">医生入口</span>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name: 'DoctorEntrance',
})
</script>

<style scoped>
.doctor-entrance-container {
  width: 24%;
  height: 70px;
  margin-top: 20px;
  margin-left: 1%;
  background-color: rgb(108, 203, 255);;
  float: left;
  display: flex;
  align-items: center;
}

.doctor-image {
  width: 55px;
  height: 55px;
  margin-left: 20%;
}
.doctor-entrance-font {
  margin-left: 5%;
  font-size: 30px;
  color: white;
}
.doctor-entrance-font:hover {
  color: rgb(14, 168, 251);
  transition: color 1s;
}
</style>