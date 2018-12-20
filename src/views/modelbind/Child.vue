<template>
  <div class="wrapper">
    {{ currentValue }}
    <button @click="handleClick">Click</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleClick () {
      this.currentValue += 1;
      this.$emit('input', this.currentValue);
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>
