import Mount from './mount.js'

let alertInstance

function shareInstance() {
  alertInstance = alertInstance || Mount.newInstance()
  return alertInstance
}

function defaultAlert({
  duration = 1.5,
  content = ''
}) {
  let instance = shareInstance()
  instance.add({
    duration,
    content
  })
}

export default {
  info(opts) {
    return defaultAlert(opts)
  }
}