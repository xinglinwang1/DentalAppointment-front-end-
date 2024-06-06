<template>
  <!-- <router-link to="/loginview" class="doctor-entrance-container">
    <img class="doctor-image" src="../../assets/images/doctor.png" alt="no image">
    <span class="doctor-entrance-font">医生入口</span>
  </router-link> -->
  <div class="doctor-entrance-container" @click="jumpToView()" style="cursor: pointer">
    <img class="doctor-image" src="../../assets/images/doctor.png" alt="no image">
    <span class="doctor-entrance-font">医生入口</span>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'DoctorEntrance',
  computed: {
    ...mapState(['role']),
  },
  methods: {
    jumpToView() {
      if(this.role === 'unAuthenticated') {
        this.$router.push('/loginview')
      }
      else {
        this.openMessageBox();
      }
    },
    openMessageBox() {
      ElMessageBox.alert('您已经登录！', 'Title', {
        confirmButtonText: 'OK',
        callback: (action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          });
        },
      });
    },
  }
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
  text-decoration: none; /* 去掉链接的下划线 */
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