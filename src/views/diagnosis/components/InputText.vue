<template>
  <div class="input-text-wrapper">
    <h2 class="topic-title">您希望减重：</h2>
    <div class="input-wrapper">
      <input class="num-input"
             type="tel" /><span>&nbsp;kg</span>
    </div>
  </div>
</template>

<script>
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
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.input-text-wrapper {
  .input-wrapper {
    margin: 0 0 0 30px;
    display: flex;
    align-items: flex-end;
    height: 40px;
    .num-input {
      height: 20px;
      width: 138px;
      text-align: center;
      border: none;
      border-bottom: #ff508a solid 1px;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 80, 138, 1);
    }
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  h2.topic-title {
    padding: 30px 0 0 30px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 16px;
  }
}
</style>
