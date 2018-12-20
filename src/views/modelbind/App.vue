<template>
  <div class="wrapper">
    <child v-model="value"></child>
  </div>
</template>

<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  props: {},
  data () {
    return {
      value: 66
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
