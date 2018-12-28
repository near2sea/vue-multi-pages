import Vue from 'vue'
import App from './App.vue'
import AxiosPlugin from './axios.js';

import moment from 'moment'
var _ = require('lodash')

Object.defineProperty(Vue.prototype, '_', {
  value: _
})
Object.defineProperty(Vue.prototype, '$moment', {
  value: moment
})

Vue.use(AxiosPlugin)

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