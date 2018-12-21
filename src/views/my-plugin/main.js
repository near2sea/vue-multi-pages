import Vue from 'vue'
import App from './App.vue'
import Alert from '@/components/li-alert/alert.js'

Vue.prototype.$Alert = Alert

new Vue({
  render: h => h(App)
}).$mount('#app')