<template>
  <div class="doctorinfo-container">
    <div class="title">
      <div class="icon">找大夫</div>
      <div class="info">
        <div style="margin-left:5%">收录全国 {{hospitalNum}} 家正规医院 {{doctorNum}} 位大夫</div>
      </div>
      <div class="more">更多<img class="more-image" src="../../assets/images/more.png" alt="no image"></div>
    </div>

    <div class="clearfix"> </div>

    <div class="dactor-classfication">
      <img class="square-image" src="../../assets/images/square.png" alt="no image">
      <span class="classfication">按疾病找大夫</span>
      <span class="num">共有{{illnessNum}} 种疾病</span>
      <div class="see-all">查看全部疾病<img class="all-image" src="../../assets/images/more.png" alt="no image"></div>
    </div>
    <div class="info-container">
      <div v-for="(disease, index) in groupedDiseases" :key="index" class="row">
        <div v-for="(item, subIndex) in disease" :key="subIndex" class="disease-item">
          <router-link :to="getDiseaseLink(item.name)" class="item-name">
            {{ item.name }} ({{ item.count }}位)
          </router-link>
        </div>
      </div>
    </div>

    <div class="clearfix"> </div>

    <div class="dactor-classfication">
      <img class="square-image" src="../../assets/images/square.png" alt="no image">
      <span class="classfication">按医院找大夫</span>
      <span class="num">共有{{hospitalNum}} 家医院</span>
      <div class="see-all">查看全部医院<img class="all-image" src="../../assets/images/more.png" alt="no image"></div>
    </div>
    <div class="info-container">
      <div v-for="(hospitalGroup, index) in groupedHospitals" :key="index" class="row">
        <div v-for="(hospital, subIndex) in hospitalGroup" :key="subIndex" class="hospital-item">
          <router-link :to="getHospitalLink(hospital.name)" class="item-name">
            {{ hospital.name }} ({{ hospital.rank }}位)
          </router-link>
        </div>
      </div>
    </div>

    <div class="clearfix"> </div>

    <div class="dactor-classfication">
      <img class="square-image" src="../../assets/images/square.png" alt="no image">
      <span class="classfication">按医院找大夫</span>
      <span class="num">共有{{hospitalNum}} 家医院</span>
      <div class="see-all">查看全部医院<img class="all-image" src="../../assets/images/more.png" alt="no image"></div>
    </div>
    <div class="info-container">
      <div v-for="(departmentGroup, index) in groupedDepartments" :key="index" class="row">
        <div v-for="(department, subIndex) in departmentGroup" :key="subIndex" class="department-item">
          <router-link :to="getDepartmentLink(department.name)" class="item-name">
            {{ department.name }} ({{ department.rank }}位)
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DoctorClassification',
  data() {
    return {
      hospitalNum: 3999,
      doctorNum: 199999,
      illnessNum: 2999,
      diseases: [
        { name: '高血压', count: 13266 },
        { name: '冠心病', count: 12095 },
        { name: '骨折', count: 10103 },
        { name: '腰椎间盘突出', count: 9261 },
        { name: '肺癌', count: 8525 },
        { name: '月经失调', count: 7843 },
        { name: '颈椎病', count: 8006 },
        { name: '脑梗塞', count: 7731 },
        { name: '子宫肌瘤', count: 6907 },
        { name: '糖尿病', count: 6938 },
        { name: '不孕不育', count: 6683 },
        { name: '胃炎', count: 6861 },
        { name: '乳腺癌', count: 6235 },
        { name: '胆结石', count: 6008 },
        { name: '小儿感冒', count: 5769 },
      ],
      hospitals: [
        { name: '北京协和医院', rank: 1704 },
        { name: '上海九院', rank: 1204 },
        { name: '北医三院', rank: 1333 },
        { name: '北京儿童医院', rank: 773 },
        { name: '北京301医院', rank: 2366 },
        { name: '上海华山医院', rank: 1367 },
        { name: '武汉协和医院', rank: 1744 },
        { name: '上海新华医院', rank: 974 },
        { name: '北大医院', rank: 1295 },
        { name: '郑大一附院', rank: 2659 },
        { name: '中日友好医院', rank: 1232 },
        { name: '上海瑞金医院', rank: 1293 },
      ],
      departments: [
        { name: '儿科', rank: 40621 },
        { name: '普外科', rank: 41125 },
        { name: '心血管外科', rank: 4303 },
        { name: '骨科', rank: 33928 },
        { name: '妇产科', rank: 35198 },
        { name: '中医科', rank: 38107 },
        { name: '神经内科', rank: 29592 },
        { name: '口腔科', rank: 26354 },
        { name: '普通内科', rank: 31756 },
        { name: '皮肤性病科', rank: 22448 },
        { name: '消化内科', rank: 22357 },
        { name: '呼吸科', rank: 21858 },
      ],
    }
  },
  computed: {
    groupedDiseases() {
      const grouped = [];
      for (let i = 0; i < this.diseases.length; i += 5) {
        grouped.push(this.diseases.slice(i, i + 5));
      }
      return grouped;
    },
    groupedHospitals() {
      const grouped = [];
      for (let i = 0; i < this.hospitals.length; i += 4) {
        grouped.push(this.hospitals.slice(i, i + 4));
      }
      return grouped;
    },
     groupedDepartments() {
      const grouped = [];
      for (let i = 0; i < this.departments.length; i += 4) {
        grouped.push(this.departments.slice(i, i + 4));
      }
      return grouped;
    },
  },
  methods: {
    getDiseaseLink(diseaseName) {
      // 返回跳转链接的逻辑
      return `/detail/${diseaseName}`;
    },
    getHospitalLink(hospitalName) {
      // 返回跳转链接的逻辑
      return `/hospital-detail/${hospitalName}`;
    },
     getDepartmentLink(departmentName) {
      // 返回跳转链接的逻辑
      return `/department-detail/${departmentName}`;
    },
  },
})
</script>

<style scoped>
.doctorinfo-container {
  width: 50%;
  height: 600px;
  margin-top: 20px;
  margin-left: 12.5%;
  border: 1px solid #ccc;
  float: left;
}

.title {
  height: 40px;
}
.dactor-classfication {
  height: 40px;
  margin-left: 10px;
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.info-container {
  width: 95%;
  height: 115px;
  margin: 5px auto 15px;
  padding-top: 5px;
  padding-left: 15px;
  border-radius: 5px;
  background-color: rgb(232, 245, 255);
}

.icon {
  width: 15%;
  height: 40px;
  background-color: rgb(0, 140, 255);
  color: white;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info {
  width: 70%;
  height: 40px;
  background-color: rgb(240, 240, 240);
  float: left;
  display: flex;
  align-items: center;
}
.more {
  width: 15%;
  height: 40px;
  background-color: rgb(240, 240, 240);
  color: rgb(65, 152, 221);
  transition: color 0.3s;
  float: left;
  display: flex;
  align-items: center;
}
.more:hover{
  color: rgb(133, 195, 245);
}
.square-image {
  width: 20px;
  height: 20px;
}
.classfication {
  font-size: 15px;
}
.num {
  margin-left: 5px;
  font-size: 13px;
  color: #9e9e9e;
}
.see-all {
  height: 40px;
  margin-left: 55%;
  font-size: 13px;
  color: rgb(65, 152, 221);
  transition: color 0.3s;
  float: left;
  display: flex;
  align-items: center;
}
.see-all:hover {
  color: rgb(133, 195, 245);
}
.all-image {
  width: 12px;
  height: 12px;
  margin-left: 5px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.disease-item {
  width: 20%; /* 每列占据 20% 宽度 */
  text-align: left;
}
.hospital-item {
  width: 23%; /* 每列占据 23% 宽度，留下一些间隙 */
  text-align: left;
}
.department-item {
  width: 23%; /* 每列占据 23% 宽度，留下一些间隙 */
  text-align: left;
}

.more-image {
  width: 15px;
  height: 15px;
  margin-left: 5px;
}
.item-name {
  font-size: 13px;
  color: rgb(70, 70, 70);
  text-decoration: none;
}
.item-name:hover {
  color: rgb(67, 202, 255);
  transition: color 0.3s;
}
</style>