import AlertMessage from './main.js'

AlertMessage.install = function(Vue, opts) {
  debugger
  console.info(opts)
  Vue.prototype.$alertMessage = AlertMessage.alert
}

export default AlertMessage
