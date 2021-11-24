<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- 侧栏 -->
        <div class="col-xs-12 col-sm-12 col-md-4">
          <AboutMe></AboutMe>
          <AboutYou></AboutYou>
          <Skill></Skill>
          <CountDown></CountDown>
          <!-- <TagCloud></TagCloud> -->
        </div>
        <!-- 主体 -->
        <div class="col-xs-12 col-sm-12 col-md-8">
          <EpidemicMap></EpidemicMap>
        </div>
      </div>
      <!-- 文章 -->
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
/* 主体栏的组件 */
import EpidemicMap from "@/components/HomeComponents/EpidemicMap.vue";
/* 侧栏的组件 */
import AboutMe from "@/components/HomeComponents/AboutMe.vue";
import AboutYou from "@/components/HomeComponents/AboutYou.vue";
import Skill from "@/components/HomeComponents/Skill.vue";
import CountDown from "@/components/HomeComponents/CountDown.vue";
// import TagCloud from "@/components/HomeComponents/TagCloud.vue";//标签云
import Card2 from "@/components/Card2.vue";

export default {
  name: "Home",
  data() {
    return {
      list: null,
    };
  },
  components: {
    AboutMe,
    AboutYou,
    Skill,
    CountDown,
    // TagCloud,
    EpidemicMap,
    Card2,
  },
  methods: {
    /* 获取文章列表 */
    getData() {
      this.$axios.get("/notes/all").then((res) => {
        this.list = res.data.data;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.aboutSideBox {
  display: flex;
  flex-wrap: wrap;
  .item {
    flex: 1;
    &:nth-child(1) {
      padding-right: 10px;
    }
  }
}
</style>
