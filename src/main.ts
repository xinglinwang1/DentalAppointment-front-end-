import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 关闭生产提示
if (process.env.NODE_ENV === 'production') {
    app.config.warnHandler = () => {
      // This is an empty function intentionally
    };
  }
app.use(store).use(router).use(ElementPlus).mount('#app')
