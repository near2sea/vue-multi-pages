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

const AlertMessage = function (opts) {
  opts = opts || {}
  return new Promise((resolve, reject) => {
    showMsg()
    if (opts) {
      resolve(AlertMessage.info)
    } else {
      reject('error')
    }
  })
}

AlertMessage.alert = options => {
  return AlertMessage(options)
}

AlertMessage.info = (mes) => {
  instance.add(mes);
}

export default AlertMessage