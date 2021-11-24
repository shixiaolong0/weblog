<template>
  <div id="link">
    <loading :isLoading="loading"></loading>
  </div>
</template>

<script>
import loading from "@/components/loading.vue";
export default {
  data() {
    return {
      loading: true,
    };
  },
  components: { loading },
};
</script>

<style lang="less" scoped>
#link {
  width: 100%;
  min-height: 43vh;
}
</style>
