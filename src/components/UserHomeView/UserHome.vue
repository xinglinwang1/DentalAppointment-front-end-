<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'UserHome',
  methods :{
    handleSelect(key: string){
      console.log(key)
    },

  }

})
</script>

<template>
  <el-container >
    <el-aside width="200px" >
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          style="height: 600px"
      >
        <el-menu-item index="1">
          <el-icon><Plus /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>我的预约</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <span>我的消息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>

    </el-main>
  </el-container>


</template>

<style scoped>

</style>