<template>
  <div class="wrapper">
    <input v-focus />
    <div v-demo="{ color: 'red', text: 'hello!' }"></div>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    },
    demo: {
      bind: function (el, binding, vnode) {
        var s = JSON.stringify
        el.innerHTML =
          'name: ' + s(binding.name) + '<br>' +
          'value: ' + s(binding.value) + '<br>' +
          'expression: ' + s(binding.expression) + '<br>' +
          'argument: ' + s(binding.arg) + '<br>' +
          'modifiers: ' + s(binding.modifiers) + '<br>' +
          'vnode keys: ' + Object.keys(vnode).join(', ')
      }
    }
  },
  components: {},
  props: {},
  data () {
    return {
      message: 'hello!'
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
