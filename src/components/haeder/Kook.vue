<template>
  <div class="kook" @click="showTime = true">
    <div v-if="showTime" class="content">
      <span v-html="!timeOver ? textRender : html" ref="text"></span>
      <b :class="{ breathe: showTime && timeOver }">_</b>
    </div>
    <div v-else class="content">
      <span class="breathe">Click Me!</span>
    </div>
    <!-- 打字音频控件 -->
    <video
      v-if="!isMobile"
      id="video"
      :src="showTime && !timeOver ? mp3Src : ''"
      autoplay
      controls
    ></video>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      textRender: "",
      text:
        "hello!欢迎来到我的个人博客，我是一名有点儿肾虚的WEB前端攻城狮，热衷于研究JavaScript、ES6、Vue、NodeJs、Express……这是我的主页！我会在这里发表一些不成熟的技术文章，记录一些沙雕的日常。",
      html:
        "hello!欢迎来到我的个人博客，我是一名<i style='color:#777;text-decoration: line-through;'>有点儿肾虚的</i>WEB前端攻城狮，热衷于研究JavaScript、ES6、Vue、NodeJs、Express……这是我的主页！我会在这里发表一些<i style='color:#777;text-decoration: line-through;'>不成熟的</i>技术文章，记录一些<i style='color:#777;text-decoration: line-through;'>沙雕的</i>日常。",
      timer: null,
      mp3Src: require("../../assets/mp3/type.mp3"),
      showTime: false,
      timeOver: false,
    };
  },
  watch: {
    showTime(newValue) {
      newValue && this.textInit();
    },
  },
  computed: {
    ...mapState(["isMobile"]),
  },
  methods: {
    /* 首页头部打字效果 */
    textInit() {
      let i = 0; //循环index
      this.timer = setInterval(() => {
        this.textRender += this.text[i]; //开始输入
        if (i == this.text.length - 1) {
          clearInterval(this.timer); //清除定时器
          this.timeOver = true;
        }
        i++;
      }, 130);
    },
  },
};
</script>

<style lang="less" scoped>
.kook {
  width: 100%;
  height: 100%;
  padding: 0 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 文字 */
  .content {
    cursor: pointer;
  }
  /* 把音频控件移到页面外 */
  #video {
    position: fixed;
    top: -9999px;
  }
}

/* 呼吸动画类 */
.breathe {
  animation: breathe 1.5s infinite;
}

@keyframes breathe {
  50% {
    opacity: 0;
  }
  0%,
  100% {
    opacity: 1;
  }
}

@-moz-keyframes breathe {
  /* Firefox */
  50% {
    opacity: 0;
  }
  0%,
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes breathe {
  /* Safari 和 Chrome */
  50% {
    opacity: 0;
  }
  0%,
  100% {
    opacity: 1;
  }
}

@-o-keyframes breathe {
  /* Opera */
  50% {
    opacity: 0;
  }
  0%,
  100% {
    opacity: 1;
  }
}
</style>
