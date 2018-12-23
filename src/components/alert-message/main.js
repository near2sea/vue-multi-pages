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
  debugger
  console.info(opts)
  showMsg()
}

AlertMessage.alert = options => {
  debugger
  return AlertMessage(options)
}

AlertMessage.info = (
  message = {
    duration: 2,
    content: '您马2222dd66'
  }
) => {
  debugger
  instance.add(message)
}

export default AlertMessage
