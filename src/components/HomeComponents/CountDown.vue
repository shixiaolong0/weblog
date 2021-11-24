<template>
  <Card titleText="倒计时" iconFont="icon-daojishi">
    <template #main>
      <ul class="list">
        <li>{{ nowTime }} {{ weekDay }}</li>
        <li>
          <div>今年已经过去：</div>
          <div class="content">
            <div :style="{ width: newy + '%' }">
              {{ newy.toFixed(1) >= 100 ? 99.9 : newy.toFixed(1) + "%" }}
            </div>
          </div>
        </li>

        <li>
          <div>本月已经过去：</div>
          <div class="content">
            <div :style="{ width: newh + '%' }">
              {{ newh.toFixed(1) >= 100 ? 99.9 : newh.toFixed(1) + "%" }}
            </div>
          </div>
        </li>

        <li>
          <div>本周已经过去：</div>
          <div class="content">
            <div :style="{ width: neww + '%' }">
              {{ neww.toFixed(1) >= 100 ? 99.9 : neww.toFixed(1) + "%" }}
            </div>
          </div>
        </li>

        <li>
          <div>今天已经过去：</div>
          <div class="content">
            <div :style="{ width: newd + '%' }">
              {{ newd.toFixed(1) >= 100 ? 99.9 : newd.toFixed(1) + "%" }}
            </div>
          </div>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  components: { Card },
  data() {
    return {
      newy: 0,
      newh: 0,
      newd: 0,
      neww: 0,
      time: null,
      nowTime: null,
      weekDay: "",
    };
  },
  methods: {
    countTime() {
      /* 
      new Date(yyyy,mth,dd,hh,mm,ss);
      new Date(yyyy,mth,dd);
      */
      //当前 年 月 日 时 分 秒
      let dateObj = new Date(),
        year = dateObj.getFullYear(),
        month = dateObj.getMonth(),
        date = dateObj.getDate(),
        week = dateObj.getDay() ? dateObj.getDay() - 1 : 6, //0-6 星期一到星期日
        time = dateObj.getTime();

      //今年
      let stat = new Date(year, 0, 1).getTime(),
        end = new Date(year + 1, 0, 1).getTime();

      this.newy = ((time - stat) / (end - stat)) * 100;

      //本月
      let stat2 = new Date(year, month, 1).getTime(),
        end2 = new Date(year, month + 1, 1).getTime();

      this.newh = ((time - stat2) / (end2 - stat2)) * 100;

      //今天
      let stat3 = new Date(year, month, date).getTime(),
        end3 = new Date(year, month, date + 1).getTime();

      this.newd = ((time - stat3) / (end3 - stat3)) * 100;

      //本周
      let weeksss = (end3 - stat3) * 7,
        stat4 = new Date(year, month, date - week).getTime();

      this.neww = ((time - stat4) / weeksss) * 100;

      switch (week) {
        case 0:
          this.weekDay = "星期一";
          break;
        case 1:
          this.weekDay = "星期二";
          break;
        case 2:
          this.weekDay = "星期三";
          break;
        case 3:
          this.weekDay = "星期四";
          break;
        case 4:
          this.weekDay = "星期五";
          break;
        case 5:
          this.weekDay = "星期六";
          break;
        case 6:
          this.weekDay = "星期天";
          break;
        default:
          this.weekDay = "星期？";
      }
    },
    getNowTime() {
      this.nowTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
    },
  },

  created() {
    this.getNowTime();
    this.time = setInterval(this.getNowTime, 1000);
  },
  mounted() {
    this.countTime();
  },
  beforeUnmount() {
    clearInterval(this.time);
    this.time = null;
  },
};
</script>
<style lang="less" scoped>
/* list通用 */
.list {
  li {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .content {
      width: 60%;
      height: 13px;
      background: #bbb;
      border-radius: 6px;
      div {
        transition: width 1s;
        font-size: 12px;
        line-height: 13px;
        padding-left: 5px;
        background: var(--themeColor);
        color: #555;
        border-radius: 6px;
      }
    }
  }
}
</style>
