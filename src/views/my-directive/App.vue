<template>
  <div class="wrapper">
    <input v-focus />
    <!-- <div class="color"
         v-color-swatch>{{message | dos('!!!!') | capitalize}}</div> -->
    <!-- <div v-demo="{ color: 'red', text: 'hello!' }"></div> -->
    <!-- <div>{{number}}</div>
    <div class="click-btn"
         @click="handleClick()">

    </div> -->
  </div>
</template>

<script>
import Node from './node.js'
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
  filters: {
    dos (value, arg) {
      console.info(value)
      return value + '~~~~' + arg
    }
  },
  components: {},
  props: {},
  data () {
    return {
      message: 'phello!',
      number: 0,
      node: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleClick () {
      for (let index = 0; index < 1000; index++) {
        this.$nextTick(() => {
          this.number++
        })
      }
    }
  },
  created () {
    var array = [1];
    var other = this._.concat(array, 2, [3], [[4]]);
    console.log(other);


    this.node = new Node()
    this.node.setData({ bb: 'bb' })
    console.info(this.node)
  },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .color {
    width: 100%;
    height: 100px;
  }
  .click-btn {
    width: 100%;
    height: 100px;
    background: green;
  }
}
</style>
