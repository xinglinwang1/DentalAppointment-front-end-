<template>
  <div class="article-set">
    <div class="title">
      <div class="icon">科普·知识</div>
      <div class="more">
        <span class="more-font">更多</span>
        <img class="more-image" src="../../assets/images/more.png" alt="no image">
      </div>
    </div>
    <el-tabs type="border-card" class="border-card">
      <el-tab-pane label="疾病">{{ diseases }}</el-tab-pane>
      <el-tab-pane label="药品">{{ medications }}</el-tab-pane>
      <el-tab-pane label="疫苗">{{ vaccines }}</el-tab-pane>
      <el-tab-pane label="检查">{{ medicalExaminations }}</el-tab-pane>
      <el-tab-pane label="治疗">{{ treatments }}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ArticleSet',
  data() {
    return {
      diseases: "疾病是人体生理或心理功能异常引起的异常状态，可以影响身体的一部分或整体。常见的疾病有感冒、糖尿病、高血压等。预防疾病的关键在于保持良好的生活习惯，包括均衡饮食、定期锻炼和规律作息。及早发现疾病的征兆，积极治疗，是保持身体健康的重要步骤。",
      medications: "药品是用于治疗、缓解或预防疾病的物质，包括处方药和非处方药。在使用药品时，应该严格按照医生或药师的建议使用，避免自行调整剂量或频率。了解药品的作用和可能的副作用，有助于正确使用药物并减少不良反应。",
      vaccines: "疫苗是一种预防传染病的有效手段，通过接种疫苗可以激活免疫系统产生对抗病原体的抗体。常见的疫苗包括麻疹疫苗、流感疫苗等。疫苗接种有助于保护个体和社群免受疾病的侵害，是公共卫生的重要措施。",
      medicalExaminations: "医学检查是一种通过技术手段对患者的身体状况进行全面或局部的系统观察和测量的方法。常见的检查包括血压测量、X光检查、血液检查等。定期体检有助于早期发现潜在的健康问题，采取及时的干预和治疗。",
      treatments: "治疗是通过医学手段恢复患者健康的过程。治疗方法多种多样，包括药物治疗、手术治疗、物理疗法等。在选择治疗方案时，医生会根据患者的病情、身体状况和个体差异进行合理的调整，以达到最佳的治疗效果。患者应积极配合医生的治疗方案，保持良好的心态。",
    }
  }
})
</script>

<style scoped>
.article-set {
  width: 50%;
  height: 215px;
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
.border-card {
  font-size: 15px;
}
</style>