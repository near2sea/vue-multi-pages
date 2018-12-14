<template>
  <div class="wrapper"></div>
</template>

<script>

import { fetchData } from '../assets/js/api.js';
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  async created () {
    const { data, head } = await fetchData('5be13bc97b6f35207332bcc9')
    console.info(data)
    console.info(head)
  },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
