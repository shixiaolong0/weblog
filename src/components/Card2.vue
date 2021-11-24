<template>
  <div
    class="box"
    :style="{ backgroundImage: ` url(${obj.imgUrl || '../assets/body.jpg'})` }"
  >
    <div class="content">
      <h3 class="title">{{ obj.title || "未知标题" }}</h3>
      <p class="date">{{ dateInit || nowTime }}</p>
      <p class="suTitle">{{ obj.describe || "没有描述" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: {
        title: "",
        date: "",
        describe: "",
      },
    },
  },
  data() {
    return {
      nowTime: null,
    };
  },
  computed: {
    dateInit() {
      if (typeof this.obj.date == "number" || this.obj.date.search("-") == -1) {
        return this.$moment(this.obj.date).format("YYYY-MM-DD");
      } else {
        return this.obj.date;
      }
    },
  },
  created() {
    this.nowTime = this.$moment().format("YYYY-MM-DD");
  },
};
</script>

<style lang="less" scoped>
.box {
  margin: 10px 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 3px 7px var(--shadowcolor);
    transform: translateY(-2px);
    .content {
      background: rgba(0, 0, 0, 0.4);
    }
  }
  .content {
    padding: 5vmin 0;
    color: #ccc;
    .title,
    .suTitle {
      padding: 0 5%;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
