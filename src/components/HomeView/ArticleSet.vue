<template>
  <div class="article-set">
    <div class="title">
      <div class="icon">科普·知识</div>
      <div class="more">
        <span class="more-font">更多</span>
        <img class="more-image" src="../../assets/images/more.png" alt="no image">
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="疾病">疾病</el-tab-pane>
      <el-tab-pane label="药品">药品</el-tab-pane>
      <el-tab-pane label="疫苗">疫苗</el-tab-pane>
      <el-tab-pane label="检查">检查</el-tab-pane>
      <el-tab-pane label="治疗">治疗</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ArticleSet',
})
</script>

<style scoped>
.article-set {
  width: 50%;
  height: 250px;
  margin-top: 650px;
  margin-left: 12.5%;
   /************************** */
  margin-right: 37.5%;
   /************************** */
  border: 1px solid #ccc;
}

.title {
  height: 40px;
}
.el-tabs {
  margin: 20px;
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
.more {
  width: 85%;
  height: 40px;
  background-color: rgb(240, 240, 240);
  float: left;
  display: flex;
  align-items: center;
}

.more-font {
  margin-left: 82%;
  color: rgb(65, 152, 221);
  transition: color 0.3s;
  float: left;
}
.more-font:hover{
  color: rgb(133, 195, 245);
}
.more-image {
  width: 15px;
  height: 15px;
  margin-left: 5px;
}
</style>