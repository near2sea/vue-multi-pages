<template>
  <div class="wrapper">
    <!-- 问题页面 -->
    <div class="topic-wrapper"
         v-if="showTopic">
      <h1 class="page-index">{{currentIndex + 1}}<span class="page-total">/{{pages.length}}</span> </h1>

      <template v-for="item in currentTopics">
        <input-text v-bind:topic="item"
                    v-on:refreshStatus="refreshStatus"
                    v-if="item.type === 'TEXT'"
                    :key="item.id"></input-text>
        <choice-first v-bind:topic="item"
                      v-on:refreshStatus="refreshStatus"
                      v-if="item.type === 'CHOICE' || item.type === 'MULTIPLE_CHOICE'"
                      :key="item.id"></choice-first>
      </template>

      <div class="bottom-wrapper">
        <a class="before-submit"
           @click="preTopic"
           v-if="currentIndex != 0">上一题</a>
        <a class="submit-btn"
           :class="!enableNext?'enable':'unable'"
           @click="nextTopic"><span>{{buttonTitle}}</span></a>
      </div>
    </div>

    <!-- 结果分析页面 -->
    <article class="result-wrapper"
             v-else>

      <section class="content-wrapper analysis">
        <h1>诊断结果:</h1>
        <p class="desc">
          {{result.result}}
        </p>
      </section>

      <section class="content-wrapper advice">
        <h1>诊断建议：</h1>
        <p class="desc">
          {{result.recommend}}
        </p>
      </section>

      <a @click="reDiagnosis()"
         class="submit-btn"><span>重新测试</span></a>

    </article>

  </div>
</template>

<script>
import ChoiceFirst from './components/ChoiceFirst'
import InputText from './components/InputText'
import { fetchData, evalData } from './assets/js/api.js'
export default {
  components: {
    'choice-first': ChoiceFirst,
    'input-text': InputText
  },
  props: {},
  data () {
    return {
      showTopic: true,
      pages: [], // 所有问题
      currentIndex: 0,
      currentTopics: [], //当前页的所有问题
      enableNext: false,
      result: {}
    }
  },
  watch: {
    currentIndex: function (curVal) {
      this.currentTopics = this.pages[curVal]
      this.refreshStatus()
    }
  },
  computed: {
    buttonTitle () {
      if (this.currentIndex < this.pages.length - 1) {
        return '下一题'
      } else {
        return '提交结果'
      }
    }
  },
  methods: {
    preTopic () {
      this.currentIndex--
    },
    async nextTopic () {
      if (!this.enableNext) {
        return
      }
      if (this.currentIndex < this.pages.length - 1) {
        // 下一页
        this.currentIndex++
      } else {
        // 提交问题
        this.result = await evalData(this.pages)
        if (this.result) {
          this.showTopic = false
        }
      }
    },
    async initData () {
      const { pages } = await fetchData()
      // this.pages = pages
      this.$set(this, 'pages', pages)
      if (this.pages && this.pages.length > 0) {
        this.currentTopics = this.pages[this.currentIndex]
      }
    },
    // 重新诊断
    async reDiagnosis () {
      this.currentIndex = 0
      await this.initData()
      this.showTopic = true
    },
    valiateNextStatus () {
      if (!this.currentTopics || !this.currentTopics.length) return false
      // 循环问题
      for (let i = 0; i < this.currentTopics.length; i++) {
        let t = this.currentTopics[i];
        if (!t.valid) {
          return false
        }
      }
      return true
    },
    refreshStatus () {
      this.enableNext = this.valiateNextStatus()
    }
  },
  async created () {
    await this.initData()
  },
  mounted () { }
}
</script>
<style lang="scss">
body {
  margin: 0;
}
</style>
<style lang="scss" scoped>
.red {
  color: red;
}
.wrapper {
  position: relative;
  background: url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_top.png")
    no-repeat center top;
  background-size: contain;
  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }
  // 结果页面
  .result-wrapper {
    padding: 40px 0 28px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content-wrapper {
      margin-top: 15px;
      background-size: 33px auto, 88px auto;
      background-position: 15px 20px, right 11px;
      background-repeat: no-repeat, no-repeat;
      background-color: #ffffff;
      box-shadow: 0px 0px 12px 0px #ffdde8;
      border-radius: 4px;
      width: 80%;
      &.analysis {
        background-image: url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_circle.png"),
          url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_resalt1.png");
      }
      &.advice {
        background-image: url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_circle.png"),
          url("https://m.sythealth.com/html/pic_cdn/h5/community/diagnosis/camp_test_img_resalt2.png");
      }
      h1 {
        margin: 25px;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 80, 138, 1);
        line-height: 18px;
      }
      .desc {
        margin: 25px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 22px;
      }
    }

    // 重新测试
    .submit-btn {
      margin-top: 15px;
      display: inline-block;
      width: 80%;
      height: 50px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #ff508a;
      line-height: 50px;
      span {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ff508a;
      }
    }
  }

  // 问题界面
  .topic-wrapper {
    padding-bottom: 130px;
    h1.page-index {
      padding: 30px 0 0 30px;
      font-size: 50px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ffffff;
      line-height: 50px;
      .page-total {
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
        line-height: 28px;
      }
    }
    // 底部按钮
    .bottom-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      background: #ffffff;

      display: flex;
      flex-direction: column;
      align-items: center;
      // 跳转到上一题
      .before-submit {
        margin: 0;
        width: 100%;
        height: 50px;
        left: 0;
        bottom: 80px;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 80, 138, 1);
        line-height: 50px;
      }
      // 跳转下一题
      .submit-btn {
        margin: 10px 0 25px 0;
        width: 269px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
        &.enable {
          background: #ffd9e5;
          span {
            color: #ffaac5;
          }
        }
        &.unable {
          background: linear-gradient(
            146deg,
            rgba(255, 104, 133, 1) 0%,
            rgba(255, 80, 138, 1) 100%
          );
          span {
            color: #ffffff;
          }
        }
        span {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
