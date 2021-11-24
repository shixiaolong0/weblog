<template>
  <Card titleText="技能" iconFont="icon-icon">
    <template #main>
      <div id="skill" style="width:100%;"></div>
    </template>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import { mapState } from "vuex";

export default {
  components: { Card },
  data() {
    return {
      echartsObj: {
        // title: {
        //   text: "雷达图",
        // },
        tooltip: {},
        // legend: {
        //   data: ["能力值"],
        // },
        radar: {
          axisName: {
            color: "#000",
            backgroundColor: "rgb(25, 202, 158)",
            borderRadius: 5,
            padding: [3, 5],
          },
          indicator: [
            { name: "h5", max: 100 },
            { name: "css3", max: 100 },
            { name: "ES6", max: 100 },
            { name: "Vue", max: 100 },
            { name: "Node", max: 100 },
            { name: "javascript", max: 100 },
            { name: "uni-app", max: 100 },
            { name: "MongoDB", max: 100 },
          ],
        },
        series: [
          {
            name: "能力",
            type: "radar",
            areaStyle: {},
            data: [{ name: "能力值", value: [90, 96, 85, 89, 78, 85, 90, 74] }],
          },
        ],
      },
      myChart: null,
    };
  },
  methods: {
    /* 技能雷达图初始化 */
    echartsInit() {
      $("#skill").height($("#skill").width() * 0.8 + "px"); //设置容器高度
      this.$echarts.dispose(skill); //设表先关
      this.myChart = this.$echarts.init(skill);
      this.myChart.setOption(this.echartsObj);
    },
  },
  mounted() {
    this.echartsInit();
  },
  computed: {
    ...mapState(["isResize"]),
  },
  watch: {
    isResize() {
      this.echartsInit();
    },
  },
};
</script>
