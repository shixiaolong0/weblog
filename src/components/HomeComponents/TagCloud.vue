<template>
  <Card titleText="标签云" iconFont="icon-biaoqian">
    <template #main>
      <div class="tagBox">
        <div class="tag" v-for="(item, index) in tagList" :key="index">
          {{ item }}
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  data() {
    return {
      tagList: ["Vue", "JavaScript", "nodeJS", "CSS3", "HTML5", "ES6"],
    };
  },

  components: { Card },
};
</script>

<style lang="less" scoped>
/* 标签云 */
.tagBox {
  display: flex;
  flex-wrap: wrap;
  .tag {
    padding: 3px;
    margin: 3px;
    border-radius: 5px;
    font-size: 12px;
    color: #eee;
    background: var(--themeColor);
  }
}
</style>
