<template>
  <!-- 顶部导航 -->
  <Nav @themeSwitch="themeSwitch" @showAppSide="showAppSide"></Nav>

  <!-- 主体 -->
  <div
    :style="{
      filter: isShowAppSide ? 'blur(3px)' : 'none',
      transition: 'filter .3s',
    }"
  >
    <!-- 头部 -->
    <div
      class="header"
      :style="{
        height: `${innerHeight * 0.45}px`,
      }"
    >
      <Kook v-if="lrc == null"></Kook>
      <Lyrics v-else></Lyrics>
    </div>
    <!-- 路由 -->
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <!-- 底部 -->
  <Footer></Footer>

  <!-- 侧边栏 -->
  <div class="side" :style="{ right: isShowAppSide ? 0 : '-80vw' }">
    <Mp3 v-show="navOrMp3" @hideSide="isShowAppSide = false"></Mp3>
    <AppNav
      v-show="!navOrMp3"
      @hideSide="isShowAppSide = false"
      @themeSwitch="themeSwitch"
    ></AppNav>
    <!-- 遮罩 -->
    <div
      class="Mask"
      @click="isShowAppSide = false"
      v-show="isShowAppSide"
    ></div>
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Kook from "@/components/haeder/Kook.vue";
import Lyrics from "@/components/haeder/Lyrics.vue";
import AppNav from "@/components/Side/AppNav.vue";
import Mp3 from "@/components/Side/Mp3.vue";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      themeSwitchItem: "", //昼夜模式切换
      isShowAppSide: false, //app侧边栏和主体遮罩层的显示隐藏
      navOrMp3: false, //app侧边栏显示nav还是mp3 true：mp3 | false: nav
    };
  },
  components: { Nav, AppNav, Mp3, Kook, Lyrics, Footer },
  computed: {
    ...mapState("music", ["lrc"]),
    ...mapState(["innerHeight", "isMobile"]),
  },
  methods: {
    ...mapMutations(["upDateInnerHeight", "setIsMobile", "upDateIsServe"]),
    /* 获取时间选用昼夜模式 */
    getDateTheme() {
      let h = new Date().getHours();
      if (h >= 17 || h < 6) {
        this.themeSwitchItem = "dark";
      } else {
        this.themeSwitchItem = "light";
      }
    },
    /* 昼夜模式切换事件函数 */
    themeSwitch() {
      this.themeSwitchItem = this.themeSwitchItem == "dark" ? "light" : "dark";
    },
    /* 顶部nav按钮点击 控制侧边栏显示隐藏 */
    showAppSide(boolean) {
      if (this.navOrMp3 == boolean && this.isShowAppSide) {
        this.isShowAppSide = false;
      } else {
        this.navOrMp3 = boolean;
        this.isShowAppSide = true;
      }
    },
    /* 更新vuex储存的页面高度值 */
    resizeChange() {
      this.upDateInnerHeight(window.innerHeight);
    },
    /* 判断是不是移动端、是不是开发环境 */
    isMendS() {
      this.setIsMobile("ontouchstart" in document.documentElement);
      this.upDateIsServe(process.env.NODE_ENV === "development");
    },
    /* 关闭网站loading */
    hideAppLoading() {
      document
        .querySelector(".loadingBox")
        .classList.add(
          "animate__faster",
          "animate__animated",
          "animate__fadeOut"
        );
      let timer = setTimeout(() => {
        document.querySelector(".loadingBox").style.display = "none";
        clearTimeout(timer);
      }, 500);
    },
  },
  watch: {
    themeSwitchItem(newValue) {
      theme.href = `./css/${newValue}.css`;
    },
  },
  created() {
    this.getDateTheme();
    this.resizeChange();
    this.isMendS();
    !this.isMobile && (window.onresize = this.resizeChange); //pc端监听页面尺寸改变 更新vuex储存的页面高度值
  },
  mounted() {
    this.hideAppLoading();
  },
};
</script>
<style lang="less">
@import "https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"; //bootstrap
@import "./assets/css/animate.min.css"; //动画animate.css
@import "./assets/css/reset.css"; //样式初始化，字体，阿里图标

//bootstrap自带按钮样式修改
.btn {
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: var(--themeColor);
  }
}
#app {
  width: 100%;
  overflow-x: hidden;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: JD, "Microsoft YaHei", serif;
  font-size: 14px;
  text-align: center;

  background: var(--background);
  color: var(--fontColor);
}
/* 展示打字动画和歌词的头部区域 */
.header {
  width: 100%;
  transition: height 0.2s;
  background: #000;
  font-family: Quicksand2, JD;
  font-weight: bold;
  color: #bbb;
  font-size: 2vh;
}

/* app侧边栏 */
.side {
  width: 80vw;
  max-width: 350px;
  height: 100vh;
  background: var(--background);
  z-index: 999;
  position: fixed;
  top: 0;
  transition: all 0.3s;
  /* 侧边栏弹出时的遮罩层 */
  .Mask {
    min-width: 20vw;
    width: calc(100vw - 350px);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
}

/* 路由组件过渡 先淡出再淡入 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 路由组件过渡 缩放 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
