<template>
  <!-- <router-link to="/loginview" class="reservation-container">
    <img id="reservation-image" src="../../assets/images/reservation.png" alt="no image">
    <span id="title">患者入口</span>
  </router-link> -->
  <div class="reservation-container" @click="jumpToView()" style="cursor: pointer">
    <img id="reservation-image" src="../../assets/images/reservation.png" alt="no image">
    <span id="title">患者入口</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'ReservationBar',
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
.reservation-container {
  width: 24%;
  height: 70px;
  margin-top: 20px;
  margin-left: 1%;
  background-color: rgb(108, 203, 255);
  display: flex;
  align-items: center;
  float: left;
  text-decoration: none;
}
.location-container {
  width: 100%;
  height: 16%;
}
.input-container {
  width: 100%;
  height: 16%;
}
.button-container {
  width: 100%;
  height: 20%;
}

#reservation-image {
  width: 40px;
  height: 40px;
  margin-left: 22%;
}
#location-image {
  width: 20px;
  height: 20px;
  margin-left: 10%;
}
#title {
  font-size: 30px;
  margin-left: 8%;
  color: white;
}
#title:hover {
  color: rgb(14, 168, 251);
  transition: color 1s;
}
.popup {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px;
  z-index: 1;
}
.popup button {
  display: block;
  margin-bottom: 5px;
  float: left;
}
</style>