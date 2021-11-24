<template>
  <div id="about">
    <div class="loading" v-show="loading">
      <div class="body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="base">
          <span></span>
          <div class="face"></div>
        </div>
      </div>
      <div class="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style lang="less" scoped>
#about {
  width: 100%;
  min-height: 43vh;
  position: relative;
}
</style>
