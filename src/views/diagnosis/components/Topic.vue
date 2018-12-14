<template>
  <div class="item left">
    <slot />
  </div>
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
.item {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  flex: 1 1 50%;
  padding: 20px;
}

.left {
}
</style>
