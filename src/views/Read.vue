<template>
  <div ref="hezi">
    <div class="container">
      <div class="row">
        <!-- 标题 -->
        <div class="col-xs-12">
          <p class="mt tiRead">{{ obj.title }}</p>
        </div>
        <!-- 时间  -->
        <div class="col-xs-12">
          <div class="mt flex">
            <div>
              <span class="btn" @click="this.$router.go(-1)">返回</span>
              <span class="btn" @click="edit('请输入管理员密码：')">编辑</span>
            </div>
            {{ obj.date }}
          </div>
        </div>
        <!-- 封面 -->
        <div class="col-xs-12">
          <img class="mt" style="width:100%" :src="obj.imgUrl" alt="" />
        </div>
        <!-- 正文 -->
        <div class="col-xs-12">
          <div class="mt tl" v-html="obj.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: null,
    };
  },
  created() {
    this.obj = this.$route.params;
  },
  mounted() {
    this.setBoxBg();
  },
  methods: {
    /* 编辑跳转 验证密码 */
    edit(msg) {
      let req = prompt(msg);
      if (req == "shi390850530") {
        this.$router.push({ name: "Admin", params: this.obj });
      } else if (req != null) {
        this.edit("密码错误，请重新输入：");
      }
    },
    /* 在content找出最外层的背景颜色...    */
    setBoxBg() {
      let bgc = this.obj.content
        ?.split("style")
        ?.filter((item) => {
          return item.includes("background-color");
        })[0]
        ?.split("background-color:")
        ?.filter((item) => {
          return item.indexOf(" rgb") == 0 || item.indexOf(" #") == 0;
        })[0]
        ?.split(";")[0]
        ?.trim();

      this.$refs.hezi.style.background = bgc;
    },
  },
};
</script>

<style lang="less" scoped>
.mt {
  margin-top: 10px;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tl {
  text-align: left;
  padding-bottom: 20px;
}
.tiRead{
  font-size: 2vmax;
}
</style>
