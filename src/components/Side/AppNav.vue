<template>
  <div>
    <router-link @click="hideSide" to="/">
      <i class="iconfont icon-shouye-shouye"></i>
      首页</router-link
    >
    <router-link @click="hideSide" to="/article">
      <i class="iconfont icon-16"></i>
      文章</router-link
    >
    <router-link @click="hideSide" to="/Link">
      <i class="iconfont icon-round_link_fill"></i>
      友链</router-link
    >
    <router-link @click="hideSide" to="/about">
      <i class="iconfont icon-guanyuwo"></i>
      关于</router-link
    >
    <a href="https://travellings.link/" target="_blank">
      <i class="iconfont icon-huochepiao"></i>
      开往</a
    >
    <div class="sideBtn" @click="themeSwitch">
      <i class="iconfont icon-rijianmoshi"></i>
      昼夜切换
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /* 触发父组件事件 */
    hideSide() {
      this.$emit("hideSide");
    },
    themeSwitch() {
      this.$emit("themeSwitch");
    },
  },
};
</script>

<style lang="less" scoped>
/* 路由点击项 */
a,
.sideBtn {
  display: block;
  width: 100%;
  line-height: 40px;
  color: var(--fontColor);
  cursor: pointer;
}
.router-link-exact-active,
a:hover,
a:active {
  background: var(--themeColor);
  color: #f8f8f8;
}
</style>
