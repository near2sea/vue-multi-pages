<template>
  <div class="choice-second-wrapper">
    <h2 class="topic-title">{{topic.question}}</h2>
    <ul>
      <template v-for="item in topic.options">
        <li :class="itemClass(item)"
            @click="selectOption(item)"
            :key="item.id">{{item.title}} {{item.content}}</li>
        <li class="chilren-wrapper"
            :key="item.children.id"
            v-if="item.children && item.children.id">
          <choice-third v-bind:topic="item.children"
                        v-on:refreshStatus="refreshStatus"
                        v-on:clickItem="childClick"></choice-third>
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
  watch: {
  },
  computed: {},
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
          item.children.options.forEach(i => { i.selected = false })
        }
      } else {
        this.topic.options.forEach(item => {
          item.selected = false
        });
        item.selected = true
      }
      this.refreshStatus()
    },
    // 子节点选择后触发的事件
    childClick (child) {
      this.topic.options.map(i => {
        if (i.children && i.children.id && i.children.id === child.id) {
          i.selected = true
        }
      })
    },
    validationStatus (topic) {
      if (topic && topic.options && topic.options.length > 0) {
        let right = false
        for (let index = 0; index < topic.options.length; index++) {
          let opt = topic.options[index];
          if (opt.selected === true && opt.children && opt.children.options) {
            if (!opt.children.valid || opt.children.valid === false) {
              return false
            } else {
              right = true
            }
          } else {
            if (!right && opt.selected === true) {
              right = true
            }
          }
        }
        return right
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
