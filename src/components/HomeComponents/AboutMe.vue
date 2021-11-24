<template>
  <Card titleText="Me" iconFont="icon-wo">
    <template #main>
      <ul class="list">
        <li><span>姓名：</span>史孝龙</li>
        <li><span>职业：</span>Weber</li>
        <li><span>颜值：</span>unlimited(shy~)</li>
        <li><span>地址：</span>江苏省-苏州市</li>
        <li>
          <span>邮箱：</span
          ><a href="mailto:390850530@qq.com">390850530@qq.com</a>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  components: { Card },
};
</script>
<style lang="less" scoped>
/* list通用 */
.list {
  li {
    display: flex;
    span {
      display: block;
      width: 30%;
      max-width: 100px;
      text-align: right;
    }
  }
}
</style>
