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
    this.$alertMessage().then((infoFunc) => {
      infoFunc({
        duration: 2,
        content: '他马2222d'
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
