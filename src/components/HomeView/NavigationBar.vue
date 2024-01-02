<template>
  <div class="navigation-bar-container">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="no image" @click="this.$router.push({ name: 'HomeView' })">
    </div>
    <div class="navigate-menu">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">找专家</el-menu-item>
        <el-menu-item index="3">找医院</el-menu-item>
        <el-menu-item index="4">查知识</el-menu-item>
        <el-menu-item index="5">问诊</el-menu-item>
        <el-menu-item index="6">预约</el-menu-item>
      </el-menu>
    </div>
    <div class="search-box">
      <el-input
        class="input-box"
        v-model="input"
        placeholder="Type something"
        :prefix-icon="SearchIcon"
      />
    </div>
    <button class="search-button" @click="search()">搜索</button>
    <button class="login-button" @click="goToLogin()">登录 / 注册</button>
    <img class="customer-service" src="../../assets/images/customer_service.png" alt="no image" @click="this.$router.push({ name: 'UserHomeView' })">
    <div class="clearfix"> </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus';

export default defineComponent({
  name: 'NavigationBar',
  setup() {
    const activeIndex = ref('1');
    const input = ref('')
    const SearchIcon = computed(() => Search);
    
    return {
      activeIndex,
      input,
      SearchIcon,
    }
  },
  methods: {
    search() {
      ElMessageBox.alert('这是一个提示框', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          // 在确定按钮点击后执行的逻辑
          console.log('确定按钮被点击');
        },
      });
    },
    goToLogin() {
      // 使用 Vue Router 的 $router.push 方法进行页面跳转
      this.$router.push({ name: 'LoginView' });
    },
  },
});
</script>

<style scoped>
.navigation-bar-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  position: fixed;
  display: flex;
  align-items: center;
}

.logo {
  margin-left: 10%;
  float: left;
}
.navigate-menu {
  width: 27%;
  float: left;
}
.search-box {
  margin-left: 2%;
  float: left;
}

.el-menu-item {
  font-weight: bold;
  font-size: 16px;
  width: 16.6%;
}
.input-box {
  float: left;
}
.search-button {
  height: 32px;
  width: 50px;
  margin-left: 5px;
  border-radius: 5px;
  border: 1px solid #000000;
  background-color: rgb(54, 102, 215);
  color: white;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}
.search-button:hover {
  background-color: rgb(105, 138, 216); /* 鼠标悬停时改变背景色为蓝色 */
}
.login-button {
  height: 32px;
  margin-left: 5%;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: rgb(54, 102, 215);
  color: white;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}
.login-button:hover {
  background-color: rgb(105, 138, 216); /* 鼠标悬停时改变背景色为蓝色 */
}
.customer-service {
  width: 45px;
  height: 45px;
  margin-left: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}
.clearfix {
  height: 32px;
  clear: both;
}
</style>