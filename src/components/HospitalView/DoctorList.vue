<script lang="ts">
import {defineComponent} from "vue";
import DoctorView from "@/views/DoctorView.vue";

export default defineComponent({
  name: 'DoctorList',
  props: {
    hospitalId: {
      type: String,
      required: true,
    },
  },
  computed: {
    DoctorView() {
      return DoctorView
    }
  },
  data() {
    return {
      doctorList: [
        {
          username: "医生用户名1",
          name: "医生1",
          hospital: "医院名",
          department: "部门",
          intro: "医生简介医生简介医生简介医生简介医生简介医生简介",
          photo: "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
        },
        {
          username: "医生用户名2",
          name: "医生2",
          hospital: "医院名",
          department: "部门",
          intro: "医生简介医生简介医生简介医生简介医生简介医生简介",
          photo: "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
        },
        {
          username: "医生用户名3",
          name: "医生3",
          hospital: "医院名",
          department: "部门",
          intro: "医生简介医生简介医生简介医生简介医生简介医生简介",
          photo: "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
        },
      ]
    }
  }
})
</script>

<template>
  <div class="main-container">
    <h2 class="title left-icon">推荐专家</h2>
    <div class="doc-container">
      <ul class="doc-list">
        <li v-for="doctor in doctorList" :key="doctor.name" class="item">
          <router-link :to="{ name: 'DoctorView', params: { doctorname: doctor.username }}">
            <a class="doctor-card">
              <div class="img-wrap">
                <img :src="doctor.photo" alt="photo" class="avatar">
              </div>
              <div class="info">
                <p class="name">
                  {{ doctor.name }}
                </p>
                <p class="hos-faculty">
                  {{ doctor.hospital }}&nbsp; {{ doctor.department }}
                </p>
                <p class="goodat">
                  {{ doctor.intro }}
                </p>
              </div>

            </a>
          </router-link>

        </li>
      </ul>
    </div>


  </div>
</template>

<style scoped>

a{
  text-decoration: none;
  color: black;
}

.main-container {
  width: 1130px;
  margin: 40px auto 0;
  background-color: #fff;
  padding: 24px 36px;
  box-shadow: 0 12px 40px 0 rgba(0,7,50,.09), 0 0 2px 0 rgba(0,0,0,.04);
  display: block;
  overflow: hidden;
  position: relative;
}

.title {
  color: #055ad7;
  font-size: 20px;
  font-weight: 700;
  position: relative;
}

.title.left-icon {
  padding-left: 10px;
}

.doc-container {
  position: relative;
  margin-top: 20px;
  border: 1px solid #f0f0f0;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  min-height: 500px;
}

li, ul {
  list-style: none;
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}

.doc-list .doctor-card {
  display: block;
  border-bottom: 1px solid #f0f0f0;
  padding: 24px 20px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}

.doc-list .doctor-card .img-wrap {
  float: left;
  border: 1px solid #dcdcdc;
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px;
  margin-right: 12px;
  position: relative;
}
.doc-list .doctor-card .info {
  padding-left: 92px;
  padding-right: 100px;
}

.doc-list .doctor-card .name {
  margin-top: 4px;
  margin-bottom: 14px;
  max-width: 80%;
  font-size: 20px;
  font-weight: 400;
  color: #000;
  line-height: 16px;
  word-break: break-all;
}

.doc-list .doctor-card .img-wrap .avatar {
  display: block;
  width: 70px;
  height: 70px;
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