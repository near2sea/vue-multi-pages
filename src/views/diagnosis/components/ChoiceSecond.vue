<template>
  <div class="choice-second-wrapper">
    <h2 class="topic-title">{{topic.question}}</h2>
    <ul>
      <template v-for="item in topic.options">
        <li :class="topic.type === 'MULTIPLE_CHOICE' ? 'multi-unselect':'single-unselect'"
            :key="item.id">{{item.title}} {{item.content}}</li>
        <li class="chilren-wrapper"
            :key="item.children.id"
            v-if="item.children && item.children.id">
          <choice-third v-bind:topic="item.children"></choice-third>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import ChoiceThird from './ChoiceThird'
export default {
  components: {
    'choice-third': ChoiceThird
  },
  props: {
    topic: Object
  },
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
.choice-second-wrapper {
  padding: 0 0 1px 30px;
  background: #f8f8f8;
  h2.topic-title {
    padding: 16px 0 0 30px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #666666;
    line-height: 16px;
  }
  ul {
    list-style: none outside none;
    padding: 0;
    li {
      position: relative;
      padding-left: 33px;
      margin: 30px 0 30px 30px;
      font-size: 16px;
      font-weight: 400;
      line-height: 18px;
      font-family: PingFangSC-Regular;
      &::before {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        left: 0;
      }

      &.chilren-wrapper {
        padding: 0;
        margin: 0;
        &::before {
          content: none;
        }
      }

      &.single-select {
        color: #ff508a;
        &::before {
          background: url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_circle2.png")
            no-repeat left center / contain;
        }
      }
      &.single-unselect {
        color: #333333;
        &::before {
          background: url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_circle3.png")
            no-repeat left center / contain;
        }
      }
      &.multi-select {
        color: #ff508a;
        &::before {
          background: url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_square2.png")
            no-repeat left center / contain;
        }
      }
      &.multi-unselect {
        color: #333333;
        &::before {
          background: url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_square1.png")
            no-repeat left center / contain;
        }
      }
    }
  }
}
</style>
