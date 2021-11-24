<template>
  <Card titleText="You" iconFont="icon-diannao">
    <template #main>
      <ul class="list">
        <li>
          <span>ip：</span><b>{{ cip }}</b>
        </li>
        <li>
          <span>地址：</span><b>{{ cname }}</b>
        </li>
        <li>
          <span v-if="UserAgent.browserName"> 浏览器： </span>
          <b>{{ UserAgent.browserName }}</b>
          <b v-if="UserAgent.browserVersion">-{{ UserAgent.browserVersion }}</b>
        </li>
        <li>
          <span v-if="UserAgent.osName">系统：</span>
          <b>{{ UserAgent.osName }}</b>
          <b v-if="UserAgent.osVersion">-{{ UserAgent.osVersion }}</b>
        </li>
        <li v-if="UserAgent.deviceName">
          <span>设备：</span>
          <b>{{ UserAgent.deviceName }}</b>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
import getUserAgent from "../../assets/js/userAgent";
import Card from "@/components/Card.vue";

export default {
  components: { Card },
  data() {
    return {
      cip: "",
      cname: "",
      UserAgent: {},
    };
  },
  methods: {
    getUserAgentInit() {
      /* 用户ip地址 */
      this.cip = returnCitySN["cip"];
      this.cname = returnCitySN["cname"];
      /* 用户设备 */
      this.UserAgent = getUserAgent();
    },
  },
  created() {
    this.getUserAgentInit();
  },
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
