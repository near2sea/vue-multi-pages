<template>
  <div class="wrapper">
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {
    debugger
    this.$alertMessage({
      duration: 2,
      content: '您马2222dd66'
    })
  },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
