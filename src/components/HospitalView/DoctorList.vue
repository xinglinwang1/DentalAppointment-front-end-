<script>
import { defineComponent } from "vue";
import DoctorView from "@/views/DoctorView.vue";
import axios from 'axios'
export default defineComponent({
  name: 'DoctorList',
  props: {
    hospitalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      //科室的选择
      chosenDept: "全部",
      //所有医生的List
      doctorAllList: [],
      //用于分页显示的医生List
      doctorListForPaginat: [],
      //用于分科室显示的医生List
      doctorListByDept:[],
      // 当前页面的初始值
      currentPage: 1,
      // 每页中展示的预约信息条数
      pageSize: 3,
    }
  },
  
  mounted() {
    // 获取所有的预约数据
    this.getDoctorAllList(this.hospitalId)
      .then(() => {
        this.doctorListForPaginat = this.doctorAllList;
      });
    console.log(this.doctorListForPaginat);
    // // 将上面解注释，下面注释

    // this.doctorAllList = [
    //   {
    //     "id": 1,
    //     "username": "医生1",
    //     "phone": "1234567890",
    //     "email": "email@gmail.com",
    //     "hospitalId": 1,
    //     "name": "医生姓名3",
    //     "jobNumber": 100001,
    //     "department": "儿童口腔科",
    //     "photoUrl": "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
    //   },
    //   {
    //     "id": 1,
    //     "username": "医生1",
    //     "phone": "1234567890",
    //     "email": "email@gmail.com",
    //     "hospitalId": 1,
    //     "name": "医生姓名2",
    //     "jobNumber": 100001,
    //     "department": "牙体牙髓科",
    //     "photoUrl": "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
    //   },
    //   {
    //     "id": 1,
    //     "username": "医生1",
    //     "phone": "1234567890",
    //     "email": "email@gmail.com",
    //     "hospitalId": 1,
    //     "name": "医生姓名1",
    //     "jobNumber": 100001,
    //     "department": "口腔修复科",
    //     "photoUrl": "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
    //   },
    //   {
    //     "id": 1,
    //     "username": "医生1",
    //     "phone": "1234567890",
    //     "email": "email@gmail.com",
    //     "hospitalId": 1,
    //     "name": "医生姓名6",
    //     "jobNumber": 100001,
    //     "department": "口腔正畸科",
    //     "photoUrl": "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
    //   },
    //   {
    //     "id": 1,
    //     "username": "医生1",
    //     "phone": "1234567890",
    //     "email": "email@gmail.com",
    //     "hospitalId": 1,
    //     "name": "医生姓名5",
    //     "jobNumber": 100001,
    //     "department": "急诊综合诊疗中心",
    //     "photoUrl": "https://n2.hdfimg.com/g11/M05/DD/97/1IYBAGQULcCAAcO1AAOOM6pN7AA089_200_200_1.jpg?7184"
    //   },
    // ];
    // this.doctorListForPaginat = this.doctorAllList;
  },
  computed: {
    DoctorView() {
      return DoctorView
    },
    // 分页预约数据
    paginatedDoctorList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.doctorListForPaginat.slice(start, end);
    },
  },
  watch: {
    chosenDept(newValue) {
      console.log('chosenDept changed:', newValue);
      // 按日期获取预约数据
      // if (!this.doctorListByDept) {
      // 如果doctorListByDept为空才从后端获取，避免重复性工作
        this.getDoctorListByDept()
      // }
      // 将doctorListByDept赋值给doctorListForPaginat
      this.doctorListForPaginat = this.doctorListByDept;
    },
  },
  methods: {
    getDoctorAllList(hospitalId){
      return new Promise((resolve, reject) => {
        //TODO:1为hospitalId,后期再修改
        axios.get(`http://121.43.108.102:8101/api/doctor/getByHospital/${hospitalId}`)
          .then(response => {
            this.doctorAllList = response.data.data;
            console.log(this.doctorAllList);
            resolve(); // 执行resolve函数表示异步操作完成
          })
          .catch(error => {
            console.error(error);
            reject(error); // 执行reject函数表示异步操作出错
          });
      });
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    getDoctorListByDept(){
      if(this.chosenDept!="全部")
      {
        this.doctorListByDept = this.doctorAllList.filter(doctor => doctor.department === this.chosenDept)
      }else{
        this.doctorListByDept = this.doctorAllList
      }
      
    },
  },
})
</script>

<template>
  <div class="main-container">
    <h2 class="title left-icon">选择科室</h2>
    <div style="margin-top: 20px">
      <el-radio-group v-model="chosenDept" size="medium" >
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="口腔颌面外科"></el-radio-button>
        <el-radio-button label="牙体牙髓科"></el-radio-button>
        <el-radio-button label="口腔修复科"></el-radio-button>
        <el-radio-button label="口腔正畸科"></el-radio-button>
        <el-radio-button label="急诊综合诊疗中心"></el-radio-button>
        <el-radio-button label="儿童口腔科"></el-radio-button>
        <el-radio-button label="牙周科"></el-radio-button>
        <el-radio-button label="口腔种植中心"></el-radio-button>
      </el-radio-group>
    </div>

    <h2 class="title left-icon">专家推荐</h2>
    <div class="doc-container">
      <ul class="doc-list">
        <li v-for="doctor in paginatedDoctorList" :key="doctor.name" class="item">
          <router-link :to="{ name: 'DoctorView', params: { doctorname: doctor.id }, query: { hospitalId: this.hospitalId } }">
            <a class="doctor-card">
              <div class="img-wrap">
                <img v-bind:src= doctor.photoUrl
                  alt="photo" class="avatar">
              </div>
              <div class="info">
                <p class="name">
                  {{ doctor.name }}
                </p>
                <p class="hos-faculty">
                  <!-- TODO:医院名字动态 -->
                  北京协和医院&nbsp; {{doctor.department}}
                </p>
                <!-- <p class="goodat">
                  擅长：特发性脊柱侧凸的保守治疗
                </p> -->
              </div>

            </a>
          </router-link>

        </li>
      </ul>

    </div>
<!-- 下方分页及跳转 -->
<div class="pagination">
    <div class="demo-pagination-block tocenter">
      <el-pagination :hide-on-single-page="true" :current-page="currentPage" :page-size="pageSize" :small="small"
        :disabled="disabled" :background="background" layout="prev, pager, next, jumper"
        :total="this.doctorListForPaginat?.length" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
  </div>
  
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.main-container {
  width: 1130px;
  margin: 40px auto 0;
  background-color: #fff;
  padding: 24px 36px;
  box-shadow: 0 12px 40px 0 rgba(0, 7, 50, .09), 0 0 2px 0 rgba(0, 0, 0, .04);
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

li,
ul {
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