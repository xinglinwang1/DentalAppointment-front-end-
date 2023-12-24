<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HospitalInfo',
  props: {
    hospitalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hospitalInfo: {
        hospitalId: "hospital123",
        name: "医院名医院名医院名",
        introduction: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        location: "City, Country",
        contact: "123-456-7890",
        departments: ["Dentistry", "Orthopedics", "Cardiology"],
      },

    }
  }
})
</script>

<template>
  <div class="hospitalIntro-container">
    <h1 class="hospital-name">{{ hospitalInfo.name }}</h1>
    <div class="hospital-intro">{{ hospitalInfo.introduction }}</div>
  </div>
</template>

<style scoped>
.hospitalIntro-container {
  width: 1100px;
  margin: 80px auto 0;
  min-height: 120px;
  padding: 30px 50px;
  position: relative;
  background: url("//fe1.hdfimg.com/nhospital/static/img/pc_banner_bg.c2801e3d.png") no-repeat;
  background-size: 1212px auto;
  background-position: 50%;
  box-shadow: 0 12px 40px 0 rgba(0,7,50,.09), 0 0 2px 0 rgba(0,0,0,.04);
}

.hospitalIntro-container .hospital-name {
  font-size: 40px;
  font-weight: 400;
  color: #333;
  line-height: 1;
  display: inline;
}

.hospitalIntro-container .hospital-intro {
  font-size: 16px;
  font-weight: 400;
  color: #333;
  line-height: 1;
  margin-top: 20px;
}

</style>