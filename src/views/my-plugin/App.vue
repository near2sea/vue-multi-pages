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
    this.$alertMessage().then((instance) => {
      instance.add({
        duration: 2,
        content: '他马2222dd66'
      })
    }, (error) => {
      console.error(error)
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
