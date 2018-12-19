<template>
  <div class="choice-wrapper">
    <h2 class="topic-title">{{topic.question}}</h2>
    <ul>
      <template v-for="item in topic.options">
        <li :class="itemClass(item)"
            @click="selectOption(item)"
            :key="item.id">{{item.title}} {{item.content}}</li>
        <li class="chilren-wrapper"
            v-if="item.children && item.children.id"
            v-show="item.selected === true"
            :key="item.children.id">
          <choice-second v-bind:topic="item.children"
                         v-on:refreshStatus="refreshStatus"></choice-second>
        </li>
      </template>

    </ul>
  </div>
</template>

<script>
import ChoiceSecond from './ChoiceSecond'
export default {
  components: {
    'choice-second': ChoiceSecond
  },
  props: {
    topic: Object
  },
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {

  },
  methods: {
    itemClass (item) {
      if (this.topic.type === 'MULTIPLE_CHOICE') {
        if (item.selected === true) {
          return 'multi-select'
        } else {
          return 'multi-unselect'
        }
      } else {
        if (item.selected === true) {
          return 'single-select'
        } else {
          return 'single-unselect'
        }
      }
    },
    selectOption (item) {
      if (this.topic.type === 'MULTIPLE_CHOICE') {
        item.selected = !item.selected
        // 所有的子节点设置为不选择状态
        if (item && item.selected === false && item.children) {
          item.children.options.forEach(child => {
            child.selected = false
            if (child.children) {
              child.children.options.forEach(c => {
                c.selected = false
              })
            }
          })
        }
      } else {
        this.topic.options.forEach(item => {
          item.selected = false
        });
        item.selected = true
      }
      this.refreshStatus()
    },
    validationStatus (topic) {
      if (topic && topic.options && topic.options.length > 0) {
        for (let index = 0; index < topic.options.length; index++) {
          let opt = topic.options[index];
          if (opt.selected === true && opt.children && opt.children.options) {
            // 存在二级问题
            if (!opt.children.valid || opt.children.valid === false) {
              return false
            }
          } else {
            if (opt.selected === true) {
              return true
            }
          }
        }
        return true
      }
      return false
    },
    refreshStatus () {
      let valid = this.validationStatus(this.topic)
      this.topic.valid = valid
      this.$emit('refreshStatus')
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.choice-wrapper {
  h2.topic-title {
    padding: 30px 0 0 30px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
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
