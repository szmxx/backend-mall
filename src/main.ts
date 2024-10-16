import { createApp } from 'vue'
import App from './App.vue'
import install from '@/register'
import initConfig from './config'
import { install as installRouter } from '@/route'
import './permission'
import './monaco'
const app = createApp(App)
install(app)
;(async () => {
  try {
    await initConfig()
    // 由于 permission 中存在接口依赖于 config，所以需要加载完 config 才进行路由安装
    installRouter(app)
    app.mount('#app')
  } catch {
    ElNotification({
      title: '系统错误',
      message: '加载配置文件失败！',
      type: 'error',
    })
  }
})()
