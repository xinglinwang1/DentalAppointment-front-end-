<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";
export default defineComponent({
  name: 'HospitalInfo',
  props: {
    hospitalId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getHospitalInfo();
  },
  methods: {
    async getHospitalInfo() {
      try {
        const response = await axios.get('http://118.31.222.253:8401/api/hospital/' + this.hospitalId);
        this.hospitalInfo = response.data.data;
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    },
  },
  data() {
    return {
      hospitalInfo: {
        id: "",
        hospitalName: "",
        introduction: "",
        position: "",
        photo: "",
      },

    }
  }
})
</script>

<template>

  <div class="hospitalIntro-container">
    <div style="width: 30% ;height:95%;float:left">
      <img :src="hospitalInfo.photo" alt="photo" class="avatar" style="width: 90% ;height: 90%;margin:auto 2%">
    </div>
    <div style="width: 65%;float:left; margin-top:30px;margin-right:3%">
      <h1 class="hospital-name">{{ hospitalInfo.hospitalName }}</h1>
      <div class="hospital-intro">{{ hospitalInfo.introduction }}</div>
    </div>
  </div>
</template>

<style scoped>
.hospitalIntro-container {
  width: 1100px;
  margin: 80px auto 0;
  height: 220px;
  /* padding: 30px 50px; */
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