<template>
  <div class="loadingWarp" v-show="isLoading">
    <div class="datouwang1">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean,
  },
};
</script>

<style lang="less" scoped>
.loadingWarp {
  width: 100%;
  height: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.datouwang1 {
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 10px;
  display: flex;
  justify-content: space-between;

  div {
    background-color: var(--themeColor);
    height: 100%;
    width: 6px;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
