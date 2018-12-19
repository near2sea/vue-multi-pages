import Vue from 'vue'
import Vuelidate from 'vuelidate'
import PortalVue from 'portal-vue'
import Diagnosis from './Diagnosis.vue'

Vue.use(Vuelidate)

Vue.use(PortalVue)


new Vue({
  render: h => h(Diagnosis)
}).$mount('#app')