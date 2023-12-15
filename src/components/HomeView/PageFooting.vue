<template>
  <div class="footerBar"></div>
  <div class="authorInfo">
    <p>同济大学21级软件学院软件工程专业微服务架构课程项目</p>
    <p>地址：  上海市嘉定区安亭镇曹安公路4800号同济大学嘉定校区</p>
    <p>联系方式:   </p>
    <p>提示：   禁止发布任何违反国家法律、法规的言论与图片等内容</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'PageFooting',
})
</script>

<style scoped>
.footerBar {
  background-color: rgb(110, 192, 255);
  margin-top: 30px;
  margin-bottom: 10px;
  height: 30px;
  width: 100%;
  border-top-style:solid;
  border-bottom-style:solid;
  border-color: rgb(255, 243, 231);
}

.authorInfo {
  text-align: center;
}

p {
  padding: 0;
  margin: 0;
}
</style>