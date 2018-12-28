import Vue from 'vue'
import App from './App.vue'

var _ = require('lodash')
Vue.prototype._ = _

Vue.directive('color-swatch', function (el) {
  el.style.backgroundColor = 'red'
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  render: h => h(App)
}).$mount('#app')