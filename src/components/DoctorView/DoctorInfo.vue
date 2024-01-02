<script>
import { defineComponent } from "vue";
import axios from 'axios'
export default defineComponent({
  name: 'DoctorInfo',
  props: {
    doctorname: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getDoctorInfo(this.doctorname);
  },
  data() {
    return {
      doctorInfo: [],
    }
  },
  methods: {
    getDoctorInfo(doctorname) {
      return new Promise((resolve, reject) => {
        //TODO
        axios.get(`http://localhost:8101/api/doctor/id/${doctorname}`)
          .then(response => {
            this.doctorInfo = response.data.data;
            console.log(this.doctorInfo);
            resolve(); // 执行resolve函数表示异步操作完成
          })
          .catch(error => {
            console.error(error);
            reject(error); // 执行reject函数表示异步操作出错
          });
      });
    }
  }
})
</script>

<template>
  <div class="main-container">

    <div class="img-wrap">
      <img v-bind:src=doctorInfo.photoUrl alt="photo" class="avatar" style="width: 100px ;height: 100px;">
    </div>
    <div class="info">
      <p class="name">
        {{ doctorInfo.name }}
      </p>
      <p class="hos-faculty">
        <!-- TODO:医院名字动态 -->
        北京协和医院&nbsp; {{ doctorInfo.department }}
      </p>
      <!-- <p class="goodat">
                  擅长：特发性脊柱侧凸的保守治疗
                </p> -->
    </div>

  </div>
</template>

<style scoped>
.main-container {
  width: 1100px;
  margin: 80px auto 0;
  padding: 30px 50px;
  position: relative;
  box-shadow: 0 12px 40px 0 rgba(0, 7, 50, .09), 0 0 2px 0 rgba(0, 0, 0, .04);
}

.main-container .img-wrap {
  float: left;
  border: 1px solid #dcdcdc;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px;
  margin-right: 12px;
  position: relative;
}

.main-container .img-wrap .avatar {
  display: block;
  width: 140px;
  height: 140px;
  border: none;
  -o-object-fit: contain;
  object-fit: contain;
  font-size: 12px;
  color: #323232;
  overflow: hidden;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
}
</style>