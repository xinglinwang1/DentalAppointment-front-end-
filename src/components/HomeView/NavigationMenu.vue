<template>
  <div class="navigation-menu-container">
    <!-- <div class="left-area">
      <span>首页</span>
    </div>
    <el-divider style="height: 100%" direction="vertical" />
    <div class="center-area">
      <div class="button-container">
        <span class="module-title">找大夫</span>
        <el-button type="primary">按医院找</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">按疾病找</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">按专科找</el-button>
      </div>
      <div class="button-container">
        <span class="module-title">问诊</span>
        <el-button type="primary">在线问诊</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">家庭医生</el-button>
      </div>
    </div>
    <div class="right-area">
      <div class="button-container">
        <span class="module-title">就诊</span>
        <el-button type="primary">预约挂号</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">海外就诊</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">疾病知识</el-button>
      </div>
      <div class="button-container">
        <span class="module-title">指南</span>
        <el-button type="primary">快速找药</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">年度好大夫</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">医院年度榜</el-button>
        <el-divider direction="vertical" border-style="dashed" />
        <el-button type="primary">开放合作平台</el-button>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'NavigationMenu',
 
})
</script>

<style scoped>
.navigation-menu-container {
  width: 75%;
  /* height: 100px; */
  margin: 80px auto 0;
  background-color: rgb(0, 140, 255);
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
}

.left-area {
  width: 8%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-area {
  width: 40%;
  height: 100%;
  margin-left: 3%;
}
.right-area {
  width: 49%;
  height: 100%;
}

.button-container {
  height: 50%;
  display: flex;
  align-items: center;
}

.module-title {
  width: 12%;
}
</style>