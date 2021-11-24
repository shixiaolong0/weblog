<template>
  <div class="card">
    <div class="title">
      <div class="titleLeft"><icon-font :type="iconFont" />{{ titleText }}</div>
      <div class="titleRight">
        <slot name="titleRight"></slot>
      </div>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleText: {
      type: String,
    },
    iconFont: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  color: var(--fontColor);
  background: var(--cardBackground);
  border-radius: 10px;
  margin: 10px 0;
  padding: 5px;
  text-align: left;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 3px 7px var(--shadowcolor);
    transform: translateY(-2px);
  }
  /* 卡片标题 */
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid var(--fontColor);
    margin-bottom: 5px;
    padding-bottom: 5px;
    .titleLeft {
      font-size: 18px;
      font-weight: 900;
    }
    .titleRight {
      font-size: 14px;
    }
  }
  /* 主体 */
  .main {
    padding: 10px 0;
  }
}
</style>
