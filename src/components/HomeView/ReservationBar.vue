<template>
  <div class="reservation-container">
    <div class="title-container">
      <img id="reservation-image" src="../../assets/images/reservation.png" alt="no image">
      <span id="title">预约挂号</span>
    </div>
    <!-- <div class="location-container">
      <img id="location-image" src="../../assets/images/location.png" alt="no image">
      <span id="location-font">{{location.province[0]}}&nbsp;&nbsp;{{location.city[0]}}</span>
      <button id="change-button" @mouseover="showPopup()" @mouseout="hidePopup()">切换</button>

      <div v-if="isPopupVisible" class="popup">
        <button v-for="(province, index) in location.province" :key="index" @click="selectProvince(province)">
          {{ province }}
        </button>
      </div>
    </div>
    <div class="input-container">

    </div>
    <div class="input-container">
      
    </div>
    <div class="input-container">
      
    </div>
    <div class="button-container">
      <button></button>
    </div> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReservationBar',
  data() {
    return {
      location: {
        province: ['北京','天津','河北','山西','内蒙古','辽宁',
                   '吉林','黑龙江','上海','江苏','浙江','安徽',
                   '福建','江西','山东','河南','湖北','湖南',
                   '广东','广西','海南','重庆','四川','贵州',
                   '云南','西藏','陕西','甘肃','青海','宁夏',
                   '新疆','全国'],
        city: ['不限','东城区','西城区','朝阳区',
               '丰台区','石景山区','海淀区','门头沟区',
               '房山区','通州区','顺义区','昌平区',
               '大兴区','怀柔区','平谷区','密云区','延庆区']
      },
      isPopupVisible: false,
    }
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
    },
    hidePopup() {
      this.isPopupVisible = false;
    },
    selectProvince(province) {
      // 处理选中省份的逻辑，可以根据需要进行相应操作
      console.log('Selected Province:', province);
      this.isPopupVisible = false; // 隐藏弹出框
    },
  }
})
</script>

<style scoped>
.reservation-container {
  width: 24%;
  /* height: 350px; */
  margin-top: 20px;
  margin-left: 1%;
  /* border: 1px solid #ccc; */
  float: left;
  /* display: flex;
  align-items: center; */
}

.title-container {
  width: 100%;
  height: 70px;
  background-color: rgb(108, 203, 255);
  display: flex;
  align-items: center;
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