import Vue from 'vue'
import App from './App.vue'
import AlertMessage from '@/components/alert-message/index.js'

Vue.use(AlertMessage, { ss: 'sdf' })

new Vue({
  render: h => h(App)
}).$mount('#app')
