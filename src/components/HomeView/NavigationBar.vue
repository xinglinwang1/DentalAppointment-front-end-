<template>
  <div class="navigation-bar-container">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="no image">
    </div>
    <div class="navigate-menu">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="1" @click="rollToLocation('首页')"><router-link to="/">首页</router-link></el-menu-item>
        <el-menu-item index="2" @click="rollToLocation('找医院')">找医院</el-menu-item>
        <el-menu-item index="3" @click="rollToLocation('找专家')">找专家</el-menu-item>
        <el-menu-item index="4" @click="rollToLocation('查知识')">查知识</el-menu-item>
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
    <img class="customer-service" src="../../assets/images/person_center.png" alt="no image" @click="toUserHomeView">
    <div class="clearfix"> </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import store from "@/store";
import { mapState } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';


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
    rollToLocation(location) {

      let height;
      if(location == '首页') {
        height = 0
      }
      else if(location == '找医院') {
        height = 30
      }
      else if(location == '找专家') {
        height = document.body.scrollHeight
      }
      else {
        height = 200
      }
      setTimeout(() => {
        this.$nextTick(() => {
            window.scrollTo(0, height)
        })
      }, 100)
    },
    openMessageBox() {
      ElMessageBox.alert('请先登录！', 'Title', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          });
        },
      });
    },
    toUserHomeView() {
      console.log(this.role)
      switch (this.role) {
        case 'patient':
          this.$router.push('/user');
          break;
        case 'doctor':
          this.$router.push('/doctorHome');
          break;
        case 'admin':
          this.$router.push('/admin');
          break;
        default:
          this.openMessageBox()
          break;
      }
    },
  },
  computed: {
    ...mapState(['role']),
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
a {
  text-decoration: none;
}
</style>