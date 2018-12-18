<template>
  <div class="wrapper">
    <!-- 问题页面 -->
    <div class="topic-wrapper"
         v-if="showTopic">
      <h1 class="page-index">{{currentIndex + 1}}<span class="page-total">/{{pages.length}}</span> </h1>

      <template v-for="item in currentTopics">
        <input-text v-bind:topic="item"
                    v-if="item.type === 'TEXT'"
                    :key="item.id"></input-text>
        <choice-first v-bind:topic="item"
                      v-if="item.type === 'CHOICE' || item.type === 'MULTIPLE_CHOICE'"
                      :key="item.id"></choice-first>
      </template>

      <div class="bottom-wrapper">
        <a class="before-submit"
           @click="preTopic"
           v-if="currentIndex != 0">上一题</a>
        <a class="submit-btn"
           :class="nextEnable?'unable':'enable'"
           @click="nextTopic"><span>{{buttonTitle}}</span></a>
      </div>
    </div>

    <!-- 结果分析页面 -->
    <article class="result-wrapper"
             v-else>

      <section class="content-wrapper analysis">
        <h1>诊断结果:</h1>
        <p class="desc">
          您好，根据您目前的身高、体重计算出BMI值 为25，属于超重状态了，建议您除了要控制 饮食减重，还要适当增加运动，不然当心疾病 来找麻烦哦~
        </p>
        <p class="desc">
          您有便秘的情况，这也是造成肥胖的原因之一， 另外，便秘还会导致身体代谢变差，排毒不畅， 胃肠功能紊乱等症，建议日常要规律三餐，早 晨可以空腹喝淡盐水促进排便，严重便秘者， 可以咨询营养师通过饮食调节进行缓解；了解 到您有严重的肝肾功能异常情况，建议先根据 医嘱进行相关治疗，症状缓解后再来咨询哦~
        </p>
      </section>

      <section class="content-wrapper advice">
        <h1>诊断建议：</h1>
        <p class="desc">
          我们通过对您饮食和运动情况的分析，最终判 断您肥胖的主要原因是总能量摄入过多；人体 所需的营养素当中，只有蛋白质、脂肪、碳水 化合物可以为我们提供能量，而这三大产能营 养素中，每克脂肪所提供的热量是最多的，产 能9kcal，饮食当中，如果我们摄入的肉类、油 脂类的食物过多，就会造成脂肪超量，总能量 过高，因此很容易导致肥胖；建议您适当控制 油脂过高食物的同时，选择一些不饱和脂肪含 量高的鱼类、瘦肉、植物油等，控制三餐的饮 食量，避免总热量超标导致肥胖和一些疾病的 发生。
        </p>
        <p class="desc">
          运动量过少也是导致您肥胖的重要原因哦， 《中国居民膳食指南》建议每人每天要走至少 6000步，适当的运动有助于身体健康，提高 基础代谢，消耗多余的热量，只有吃动平衡， 才能维持现有的体重；如果本身饮食摄入过量， 那就一定要增加运动来消耗，否则减重过程中 肌肉量也会随之减少，基础代谢也会下降，减 重效果会变差哦~
        </p>
      </section>

      <a class="submit-btn"><span>重新测试</span></a>

    </article>

  </div>
</template>

<script>
import ChoiceFirst from './components/ChoiceFirst'
import InputText from './components/InputText'
import { fetchData } from './assets/js/api.js'
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
      nextEnable: false,
      currentTopics: [] //当前页的所有问题
    }
  },
  watch: {
    currentIndex: function (curVal) {
      this.currentTopics = this.pages[curVal]
    },
    currentTopics: {
      deep: true,
      handler: function () {
        this.nextEnable = this.computeNextEnable()
      }
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
    nextTopic () {
      if (this.currentIndex < this.pages.length - 1) {
        // 下一页
        this.currentIndex++
      } else {
        // 提交问题
        debugger
        console.info(this.pages)
      }
    },
    computeNextEnable () {
      let flag = false
      let page = this.pages[this.currentIndex]
      if (!page) return flag
      // 循环问题
      for (let index = 0; index < page.length; index++) {
        let t = page[index];
        // 单选题
        if (t && t.type === 'CHOICE' && t.options && t.options.length) {
          for (let j = 0; j < t.options.length; j++) {
            // 循环选项
            let i = t.options[j];
            if (i.selected === true) {
              flag = true
              break
            } else {
              flag = false
            }
          }
        }
        // 填空题
        if ((t && t.type === 'TEXT')) {
          if (!t.answers) {
            flag = false
          }
          if (t.answers.length <= 0) {
            flag = false
          } else if (t.answers[0].trim() === '') {
            flag = false
          } else {
            flag = true
          }
          if (!flag) {
            break
          }
        }
        // 多选题

      }
      return flag
    }
  },
  async created () {
    const { pages } = await fetchData()
    // this.pages = pages
    this.$set(this, 'pages', pages)
    if (this.pages && this.pages.length > 0) {
      this.currentTopics = this.pages[this.currentIndex]
    }
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
