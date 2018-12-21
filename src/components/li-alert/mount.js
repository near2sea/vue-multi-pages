import Alert from './Alert.vue'
import Vue from 'vue'

Alert.newInstance = properties => {
  const props = properties || {}

  const LiAlert = Vue.extend({
    render: h => h(Alert, {
      props
    })
  })

  // 在文档之外渲染并且随后挂载到body
  const component = new LiAlert().$mount()
  document.body.appendChild(component.$el)

  const alert = component.$children[0]

  return {
    add(noticeProps) {
      alert.add(noticeProps);
    },
    remove(name) {
      alert.remove(name);
    }
  }
}

export default Alert