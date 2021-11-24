<template>
  <div class="nav" :class="{ navNoTransparent: navBg }">
    <div class="container">
      <div class="row">
        <!-- logo -->
        <div class="col-xs-8 col-md-2">
          <span class="logo">sxl.show</span>
        </div>
        <!-- 大屏菜单 -->
        <div class="col-md-10 hidden-xs hidden-sm">
          <div class="row">
            <div class="col-xs-2">
              <router-link to="/">
                <i class="iconfont icon-shouye-shouye"></i>
                首页</router-link
              >
            </div>
            <div class="col-xs-2">
              <router-link to="/article">
                <i class="iconfont icon-16"></i>
                文章</router-link
              >
            </div>
            <div class="col-xs-2">
              <router-link to="/link">
                <i class="iconfont icon-round_link_fill"></i>
                友链</router-link
              >
            </div>
            <div class="col-xs-2">
              <router-link to="/msg">
                <i class="iconfont icon-guanyuwo"></i>
                留言</router-link
              >
            </div>
            <div class="col-xs-2">
              <a href="https://travellings.link/">
                <i class="iconfont icon-huochepiao"></i>
                开往</a
              >
            </div>
            <div class="col-xs-2">
              <div class="navLeftBox">
                <!-- mp3 -->
                <div @click="showAppSide(true)">
                  <p :class="{ rotate: isPlayIng }">
                    <i class="iconfont icon-yinle"></i>
                  </p>
                </div>
                <!-- 昼夜模式切换 -->
                <div @click="themeSwitch">
                  <i
                    class="iconfont"
                    :class="[
                      themeSwitchState ? 'icon-rijianmoshi' : 'icon-yejian',
                    ]"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 小屏菜单按钮 -->
        <div class="col-xs-4 hidden-md hidden-lg">
          <div class="navLeftBox">
            <!-- mp3 -->
            <div @click="showAppSide(true)">
              <i class="iconfont icon-yinle"></i>
            </div>
            <!-- nav -->
            <div @click="showAppSide(false)">
              <i class="iconfont icon-liebiaoshitucaidan"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div id="toTop" @click="toTop" :style="{ right: navBg ? '20px' : '-50px' }">
      <icon-font type="icon-huidaodingbu" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      navBg: false,
      themeSwitchState: false,
      timer: null,
    };
  },
  computed: {
    ...mapState("music", ["isPlayIng"]),
  },
  methods: {
    /* 主题切换按钮的点击 */
    themeSwitch() {
      this.$emit("themeSwitch");
      this.themeSwitchState = !this.themeSwitchState;
    },
    //侧边栏显示
    showAppSide(item) {
      this.$emit("showAppSide", item);
    },
    /* 页面滚动监听函数 */
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 49) {
        this.navBg = true;
      } else {
        this.navBg = false;
      }
    },
    /* 回到顶部 */
    toTop() {
      this.timer = setInterval(() => {
        //获取到顶部的距离
        var osTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 50);
        window.pageYOffset =
          document.documentElement.scrollTop =
          document.body.scrollTop =
            osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          window.pageYOffset =
            document.documentElement.scrollTop =
            document.body.scrollTop =
              0;
        }
      }, 3);
    },
  },
  mounted() {
    /* 监听页面滚动 */
    window.addEventListener("scroll", this.watchScroll);
    window.pageYOffset =
      document.documentElement.scrollTop =
      document.body.scrollTop =
        0;
  },
};
</script>

<style lang="less" scoped>
.nav {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  line-height: 50px;
  background: rgba(3, 3, 3, 0.4);
  color: var(--navFontColor);
  .logo {
    display: block;
    font-family: var(--logoFont);
    font-size: 30px;
  }
  /* 点击项 */
  a {
    display: block;
    width: 100%;
    height: 100%;
    font-family: STHupo;
    color: var(--navFontColor);
  }
  .router-link-exact-active,
  a:hover,
  a:active {
    background: var(--themeColor);
    color: #f8f8f8;
  }
  .navLeftBox {
    width: 100%;
    height: 100%;
    display: flex;
    div {
      flex: 1;
      &:hover {
        background: var(--themeColor);
      }
    }
  }
}
.nav.navNoTransparent {
  background: var(--background);
}

.rotate {
  animation: rotate 0.7s infinite linear;
}

#toTop {
  position: fixed;
  bottom: 20px;
  border-radius: 10px;
  background: #f8f8f8;
  font-size: 30px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    background: #b8b8b8;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }

  0% {
    transform: rotate(0deg);
  }
}
</style>
