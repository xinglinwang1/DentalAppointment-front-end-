<template>
  <div class="visiting-experts">
    <div class="title">
      <div class="icon">出诊专家</div>
      <div class="info">
        <div style="margin-left:5%">当前出诊 {{expertNum}} 位专家</div>
      </div>
      <div class="more">更多<img class="more-image" src="../../assets/images/more.png" alt="no image"></div>
    </div>
    <div class="experts-container">
      <el-scrollbar height="250px">
        <div v-for="expertInfo in expertsInfo" :key="expertInfo.id" class="expert-info-card">
          <div class="expert-photo">
            <!-- 这里用白色方块代替医生的photo，需替换成真实的图片 -->
            <!-- <div class="expert-placeholder"></div> -->
          </div>
          <div class="expert-info">
            <p class="expert-name">{{ expertInfo.name }}</p>
            <p class="expert-position">{{ expertInfo.position }}</p>
            <div class="clearfix"> </div>
            <p class="expert-hospital">{{ expertInfo.hospital }}</p>
            <p class="expert-department">{{ expertInfo.department }}</p>
            <div class="clearfix"> </div>
          </div>
          <div class="expert-status">{{ expertInfo.status }}</div>
          <div class="clearfix"> </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VisitingExperts',
  data() {
    return {
      expertNum: 3999,
      expertsInfo: [
        { id: 1, photo: 'xxx', name: '刘恺鸣', position: '主任医师', hospital: '浙江大学医学院附属第二医院', department: '神经内科', status: '出诊中' },
        { id: 2, photo: 'xxx', name: '赵世春', position: '主治医师', hospital: '山东大学第二医院', department: '儿童保健科', status: '出诊中' },
        { id: 3, photo: 'xxx', name: '蔡金培', position: '主治医师', hospital: '温州市人民医院', department: '儿科', status: '出诊中' },
        { id: 4, photo: 'xxx', name: '李高峰', position: '副主任医师', hospital: '解放军联勤保障部队九九O医院', department: '小儿科', status: '出诊中' },
        { id: 5, photo: 'xxx', name: '张文超', position: '医师', hospital: '北京协和医院', department: '整形外科', status: '出诊中' },
        { id: 6, photo: 'xxx', name: '黄晓东', position: '主治医师', hospital: '厦门大学附属第一医院', department: '急诊部', status: '出诊中' },
        { id: 7, photo: 'xxx', name: '胡博', position: '主治医师', hospital: '天津医科大学总医院', department: '普通外科', status: '出诊中' },
        { id: 8, photo: 'xxx', name: '任德', position: '副主任医师', hospital: '临汾市中心医院', department: '耳鼻喉科', status: '出诊中' },
        { id: 9, photo: 'xxx', name: '李金良', position: '主任医师', hospital: '山东大学第二医院', department: '儿外科', status: '出诊中' },
        { id: 10, photo: 'xxx', name: '杨鹏飞', position: '副主任医师', hospital: '哈医大二院', department: '感染病科', status: '出诊中' },
        { id: 11, photo: 'xxx', name: '黄进丰', position: '副主任医师', hospital: '医科院肿瘤医院', department: '胸外科', status: '出诊中' },
        { id: 12, photo: 'xxx', name: '李翔', position: '副主任医师', hospital: '天津市第三中心医院', department: '精神心理科', status: '出诊中' },
        { id: 13, photo: 'xxx', name: '刘恺鸣', position: '主任医师', hospital: '浙江大学医学院附属第二医院', department: '神经内科', status: '出诊中' },
        { id: 14, photo: 'xxx', name: '赵世春', position: '主治医师', hospital: '山东大学第二医院', department: '儿童保健科', status: '出诊中' },
        { id: 15, photo: 'xxx', name: '蔡金培', position: '主治医师', hospital: '温州市人民医院', department: '儿科', status: '出诊中' },
        { id: 16, photo: 'xxx', name: '李高峰', position: '副主任医师', hospital: '解放军联勤保障部队九九O医院', department: '小儿科', status: '出诊中' },
        { id: 17, photo: 'xxx', name: '张文超', position: '医师', hospital: '北京协和医院', department: '整形外科', status: '出诊中' },
        { id: 18, photo: 'xxx', name: '黄晓东', position: '主治医师', hospital: '厦门大学附属第一医院', department: '急诊部', status: '出诊中' },
        { id: 19, photo: 'xxx', name: '胡博', position: '主治医师', hospital: '天津医科大学总医院', department: '普通外科', status: '出诊中' },
        { id: 20, photo: 'xxx', name: '任德', position: '副主任医师', hospital: '临汾市中心医院', department: '耳鼻喉科', status: '出诊中' },
        { id: 21, photo: 'xxx', name: '李金良', position: '主任医师', hospital: '山东大学第二医院', department: '儿外科', status: '出诊中' },
        { id: 22, photo: 'xxx', name: '杨鹏飞', position: '副主任医师', hospital: '哈医大二院', department: '感染病科', status: '出诊中' },
        { id: 23, photo: 'xxx', name: '黄进丰', position: '副主任医师', hospital: '医科院肿瘤医院', department: '胸外科', status: '出诊中' },
        { id: 24, photo: 'xxx', name: '李翔', position: '副主任医师', hospital: '天津市第三中心医院', department: '精神心理科', status: '出诊中' },
      ],
    }
  }
})
</script>

<style scoped>
.visiting-experts {
  width: 50%;
  height: 250px;
  margin-top: 30px;
  margin-left: 12.5%;
  /************************** */
  margin-right: 37.5%;
   /************************** */
  border: 1px solid #ccc;
}

.title {
  height: 40px;
}
.experts-container {
  width: 95%;
  height: 200px;
  margin: 5px auto;
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
.expert-info-card {
  width: 48%;
  height: 50px;
  margin: 5px 5px 0 5px;
  align-items: center;
  float: left;
  background-color: rgb(232, 245, 255);
}

.more-image {
  width: 15px;
  height: 15px;
  margin-left: 5px;
}
.expert-photo {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  float: left;
}
.expert-placeholder {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.expert-info {
  width: 70%;
  flex: 1;
  padding: 0 10px;
  float: left;
}
.expert-name, .expert-position {
  margin:5px 5px 0 0;
  float: left;
}
.expert-hospital, .expert-department {
  margin: 1px 5px 0 0;
  font-size: 13px;
  float: left;
}
.expert-status {
  font-size: 13px;
  color: rgb(66, 173, 255);
  margin-top: 5px;
  writing-mode: vertical-rl; /* 设置文字竖直排列，从右到左 */
  text-orientation: upright; /* 设置文字方向为竖直 */
  white-space: nowrap; /* 防止文字换行 */
}

.clearfix {
  clear: both;
}
</style>