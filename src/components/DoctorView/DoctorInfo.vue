<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'DoctorInfo',
  props: {
    doctorname: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      doctorInfo: {
        username: "医生用户名2",
        name: "医生2",
        hospital: "医院名",
        department: "部门",
        intro: "医生简介医生简介医生简介医生简介医生简介医生简介",
        photo: "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
      },
    }
  }
})
</script>

<template>
  <div class="main-container">

      <div class="img-wrap">
        <img src="https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184" alt="photo" class="avatar">
      </div>
      <div class="info">
        <p class="name">
          {{ doctorInfo.name }}
        </p>
        <p class="hos-faculty">
          {{ doctorInfo.hospital }}&nbsp; {{ doctorInfo.department }}
        </p>
        <p class="goodat">
          {{ doctorInfo.intro }}
        </p>
      </div>

  </div>
</template>

<style scoped>
.main-container {
  width: 1100px;
  margin: 80px auto 0;
  padding: 30px 50px;
  position: relative;
  box-shadow: 0 12px 40px 0 rgba(0,7,50,.09), 0 0 2px 0 rgba(0,0,0,.04);
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