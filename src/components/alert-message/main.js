import Vue from 'vue'
import alertVue from './main.vue'

const AlertMessageContructor = Vue.extend(alertVue)

let instance

const initInstance = () => {
  instance = new AlertMessageContructor({
    el: document.createElement('div')
  })
}

const showMsg = () => {
  if (!instance) {
    initInstance()
  }
  document.body.appendChild(instance.$el)
}

const AlertMessage = function(opts) {
  console.info(opts)
  showMsg()
}

AlertMessage.alert = options => {
  AlertMessage(options)
  instance.add(options)
}

export default AlertMessage
