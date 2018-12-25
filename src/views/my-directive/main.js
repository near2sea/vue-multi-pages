import Vue from 'vue'
import App from './App.vue'

Vue.directive('color-swatch', function (el) {
  el.style.backgroundColor = 'red'
})

new Vue({
  render: h => h(App)
}).$mount('#app')