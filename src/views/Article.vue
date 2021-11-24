<template>
  <div class="article">
    <loading :isLoading="loading"></loading>

    <div class="container" v-show="!loading">
      <div class="row">
        <div
          class="col-xs-12 col-sm-12 col-md-6"
          v-for="item in list"
          :key="item._id"
        >
          <router-link :to="{ name: 'Read', params: item }">
            <Card2 :obj="item"></Card2>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card2 from "@/components/Card2.vue";
import loading from "@/components/loading.vue";

export default {
  data() {
    return {
      list: [],
      loading: true,
    };
  },
  components: { Card2, loading },
  created() {
    this.getData();
  },
  methods: {
    /* 获取文章列表 */
    getData() {
      this.$axios.get("/notes/all").then((res) => {
        this.list = res.data.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.article {
  width: 100%;
  min-height: 43vh;
}
</style>
