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
          <choice-second v-bind:topic="item.children"></choice-second>
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
    topic: {
      deep: true,
      handler: function (val) {
        if (val.type === 'CHOICE' && val.valid !== true) {
          // 单选题
          if (val.options && val.options.length > 0) {
            for (let index = 0; index < val.options.length; index++) {
              let opt = val.options[index]
              if (opt.selected === true) {
                val.valid = true
                this.$emit('refreshStatus')
                return
              }
            }
          }
        } else {
          // 多选题
          if (val.options && val.options.length > 0) {
            // 一层结构验证
            let hasError = true
            for (let i = 0; i < val.options.length; i++) {
              let opt1 = val.options[i]
              if (opt1.children && opt1.children.options && opt1.children.options.length > 0) {
                // 三层结构验证
                for (let j = 0; j < opt1.children.options.length; j++) {
                  // 第二层勾选
                  let opt2 = opt1.children.options[j];
                  if (opt2.selected === true) {
                    if (opt2.children && opt2.children.options && opt2.children.options.length > 0) {
                      let f = true
                      for (let k = 0; k < opt2.children.options.length; k++) {
                        // 第三层勾选
                        let opt3 = opt2.children.options[k];
                        if (opt3.selected === true) {
                          f = false
                          hasError = false
                          break
                        }
                      }
                      // 第三级全部选择都没有勾选的话，验证不通过
                      if (f) {
                        val.valid = false
                        this.$emit('refreshStatus')
                        return
                      }
                    }
                  }
                }
              } else {
                if (opt1.selected === true) {
                  hasError = false
                  break
                }
              }
            }
            // 第一层没有勾选的话，验证不通过
            if (hasError) {
              val.valid = false
              this.$emit('refreshStatus')
              return
            }
            if (val.valid !== true) {
              val.valid = true
              this.$emit('refreshStatus')
            }
          }
        }
      }
    }
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
      } else {
        this.topic.options.forEach(item => {
          item.selected = false
        });
        item.selected = true
      }
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
