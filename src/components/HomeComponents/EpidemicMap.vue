<template>
  <Card titleText="疫情地图" iconFont="icon-yiqing">
    <template #titleRight
      >更新时间:
      <span ref="upDate">未知</span>
    </template>
    <template #main>
      <div class="mapBox">
        <loading class="mapLoading" :isLoading="loading"></loading>

        <!-- 切换数据 现有确诊 累计确诊 治愈 死亡 -->
        <div class="btnList">
          <!-- <div
            class="btnSxl"
            :style="{
              backgroundColor:
                activeIndex == index ? 'transparent' : item.color,
              color: activeIndex == index ? item.color : '#eee',
              borderColor: activeIndex == index ? item.color : 'transparent',
            }"
            v-for="(item, index) in btnList"
            :key="index"
            @click="setMapData(item.pop, item.name, item.isheal, index)"
          >
            {{ item.name }}
          </div> -->

          <div
            class="btn"
            v-show="!myChart?._$handlers"
            @click="getMapData('china')"
          >
            返回
          </div>
          <div v-show="myChart?._$handlers" style="padding:6px 0">
            点击省份查看详情
          </div>
          <!-- 境外输入 地区待确认 -->
          <div style="padding:6px 0">
            <span ref="dqr"></span>
            <span ref="jw"></span>
          </div>
        </div>
        <!-- 地图容器 -->
        <div
          id="map"
          :style="{ width: '100%', opacity: loading ? 0 : 1 }"
        ></div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import loading from "@/components/loading.vue";
import { mapState } from "vuex";
import { pinyin } from "pinyin-pro";

function setPy(name) {
  return pinyin(name, {
    toneType: "none",
    type: "array",
  }).join("");
}

/* 模糊匹配 */
function search(value, value2) {
  // value:要查询的字符串
  // list:这里匹配，lis必须是个数组
  let list = [...value2];
  if (value) {
    let arr = [];
    list.forEach((el) => {
      if (value.indexOf(el) >= 0) {
        arr.push(el);
      }
    });
    return arr.length >= list.length;
  }
}

export default {
  name: "Home",
  data() {
    return {
      mapKey: new Date(),
      loading: true,
      /* 选项按钮配置 */
      // activeIndex: 0,
      // btnList: [{
      // 		name: "现有确诊",
      // 		pop: "nowConfirm",
      // 		isheal: false,
      // 		color: "#f60"
      // 	},
      // 	{
      // 		name: "累计确诊",
      //   pop: "confirm",
      // 		isheal: false,
      // 		color: "rgb(136, 4, 4)",
      // 	},
      // 	{
      // 		name: "治愈",
      // 		pop: "heal",
      // 		isheal: true,
      // 		color: "rgb(25, 202, 158)"
      // 	},
      // 	{
      // 		name: "死亡",
      // 		pop: "dead",
      // 		isheal: false,
      // 		color: "#999"
      // 	},
      // ],
      /* echant实例 */
      myChart: {
        _$handlers: "1",
      },
      /* 疫情全局数据 */
      EpidemicData: null,
      //选中的省份疫情数据
      nowEpidemicData: null,
      /* 地图矢量数据 */
      mapData: null,
    };
  },
  mounted() {
    $("#map").height($("#map").width() * 0.8 + "px"); //设置地图容器高度
    this.getData();
  },
  methods: {
    /* 请求tx接口获取疫情数据 */
    getData() {
      this.$jsonp(
        "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
        {},
        (err, res) => {
          if (!err) {
            this.EpidemicData = JSON.parse(res.data).areaTree[0].children;
            this.getMapData();
            this.$refs.upDate.innerText = JSON.parse(res.data).lastUpdateTime;
          }
        }
      );
    },
    /* 请求绘制地图的矢量数据 */
    getMapData(mapName = "china") {
      this.loading = true;
      let comp = mapName == "china" ? mapName : `province/${mapName}`;
      this.$axios.get(`/echarts_map-master/json/${comp}.json`).then((res) => {
        this.mapData = res.data;
        this.setMap(mapName);
      });
    },
    /* 绘制地图 */
    setMap(mapName) {
      /* 疫情数据整理 */
      let seriesData = this[
        mapName == "china" ? "EpidemicData" : "nowEpidemicData"
      ].map((item) => ({
        name: item.name,
        value: item.total["nowConfirm"],
      }));
      this.$refs.dqr.innerText = this.$refs.jw.innerText = "";
      //疫情数据遍历
      seriesData.forEach((item2) => {
        if (item2.name == "地区待确认") {
          this.$refs.dqr.innerText = `地区待确认:${item2.value} `;
        } else if (item2.name == "境外输入") {
          this.$refs.jw.innerText = `境外输入:${item2.value}`;
        }
        //地图遍历
        this.mapData.features.forEach((item) => {
          if (search(item.properties.name, item2.name)) {
            item2.name = item.properties.name;
          }
        });
      });

      this.myChart._$handlers !== "1" && this.myChart.dispose(); //设表先关
      this.myChart = this.$echarts.init(map); //初始化
      this.$echarts.registerMap(mapName, this.mapData); //画地图
      this.myChart.setOption({
        series: [
          {
            name: "现有确诊",
            type: "map", //告诉echarts要去渲染一个地图
            map: mapName,
            label: {
              show: false, // 控制对应地区的汉字
              color: "#333",
              fontSize: 10,
            },
            roam: true, //控制地图放大缩小
            zoom: 1.1, //控制地图的放大缩小
            data: seriesData, //用来展示后台给的数据  {name:xx,value:xxx}
            /*控制地图板块样式*/
            itemStyle: {
              areaColor: "#eee",
              borderColor: "#fff",
            },
            /*控制鼠标滑过之后样式*/
            emphasis: {
              label: {
                color: "#fff",
                fontsize: 12,
              },
              itemStyle: {
                areaColor: "rgb(25, 202, 158)",
              },
            },
          },
        ],
        visualMap: [
          {
            type: "piecewise",
            show: true,
            // splitNumber:4,
            pieces: [
              //分段
              {
                min: 10000,
              },
              {
                min: 1000,
                max: 9999,
              },
              {
                min: 500,
                max: 999,
              },
              {
                min: 100,
                max: 499,
              },
              {
                min: 10,
                max: 99,
              },
              {
                min: 1,
                max: 9,
              },
              {
                color: "#E2EBF4",
                value: 0,
              },
            ],
            // align:'right'
            orient: "horizontal", //默认竖直
            //left right 这些属性控制分段所在的位置
            //textStyle() 分段大小
            inRange: {
              symbol: "rect",
              color: ["#E2EBF4", "#DE1F05"],
            },
            itemWidth: 10,
            itemHeight: 10,
          },
        ],
        tooltip: {
          trigger: "item", //鼠标移入后显示人数
        },
      }); //注入图表option

      /* 监听省份点击事件 */
      if (mapName == "china") {
        this.myChart.on("click", ({ name }) => {
          //获取当前省份的疫情数据
          this.nowEpidemicData = this.EpidemicData.filter((item) => {
            return item.name == name;
          })[0].children;
          /* 陕西 地图名：shanxi1 */
          if (name == "陕西") {
            return this.getMapData("shanxi1");
          }
          /* 请求当前省份的地图矢量数据 */
          this.getMapData(setPy(name));
        });
      }

      this.loading = false;
    },
  },
  computed: {
    ...mapState(["innerHeight", "isServe"]),
  },
  watch: {
    innerHeight() {
      //   this.setMap();
    },
  },
  components: {
    Card,
    loading,
  },
};
</script>

<style lang="less" scoped>
.btnList {
  display: flex;
  justify-content: space-between;
  .btnSxl {
    padding: 5px;
    margin: 5px;
    font-size: 16px;
    color: #eee;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s;
  }
}

.mapBox {
  position: relative;
  min-height: 350px;

  .mapLoading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
  }
}

#map {
  transition: opacity 0.5s;
}
</style>
