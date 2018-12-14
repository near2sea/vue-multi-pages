<template>
  <div class="wrapper">
    <ul>
      <li v-for="(item, index) in items"
          :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      items: []
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
}
</style>
