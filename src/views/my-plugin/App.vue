<template>
  <div class="wrapper">
  </div>
</template>

<script>
import Alert from '@/components/li-alert/mount.js'

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
    let instance = Alert.newInstance()
    instance.add({
      duration: 2,
      content: '您马'
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
