<template>
  <div class="container">
    <div>设备信息：{{ shebei }}</div>
    <div class="row">
      <div class="col-xs-12">
        <div class="title">
          <div>文章编辑</div>
          <div>
            <span class="btn" @click="remove">删除</span>
            <span class="btn" @click="submit">提交</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- 标题 -->
      <div class="col-xs-12 col-sm-6">
        <input type="text" v-model="FormObj.title" placeholder="标题..." />
      </div>
      <!-- 时间 -->
      <div class="col-xs-12 col-sm-6">
        <input
          type="text"
          v-model="FormObj.date"
          placeholder="时间（XXXX-XX-XX）默认为当前时间"
        />
      </div>
    </div>
    <div class="row">
      <!-- 描述 -->
      <div class="col-xs-12 col-sm-9">
        <textarea
          v-model="FormObj.describe"
          rows="4"
          placeholder="描述..."
        ></textarea>
      </div>
      <!-- 封面图上传 -->
      <div class="col-xs-12 col-sm-3">
        <div class="uploadBox">
          <div
            v-show="FormObj.imgUrl"
            :style="{ backgroundImage: `url(${FormObj.imgUrl})` }"
            class="img"
          ></div>
          <div v-show="!FormObj.imgUrl" class="upFile">上传封面</div>
          <input type="file" accept="image/*" @change="fileChange" />
        </div>
      </div>
    </div>
    <!-- 编辑器 -->
    <div class="row">
      <div class="col-xs-12">
        <div id="editor"></div>
      </div>
    </div>
    <!-- 内容预览 -->
    <div class="row">
      <div class="col-xs-12 render" v-html="FormObj.content"></div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapState } from "vuex";

export default {
  data() {
    return {
      FormObj: {
        title: "",
        describe: "",
        content: "",
        date: "",
        imgUrl: "",
      },
      editorIns: null,
      shebei: "",
    };
  },
  created() {
    this.shebei = window.navigator.userAgent;
  },
  mounted() {
    if (this.editorIns == null) {
      this.editorInit();
    }
    /* 是否携带参数 */
    if (this.$route.params) {
      this.FormObj = this.$route.params;
      this.editorIns.txt.html(this.FormObj.content);
    }
  },
  methods: {
    /* 编辑器初始化 */
    editorInit() {
      this.editorIns = new E("#editor");

      this.editorIns.config.onchange = (newHtml) => {
        this.FormObj.content = newHtml;
      };

      this.editorIns.config.colors = [
        "#000000",
        "#eeece0",
        "#1c487f",
        "#4d80bf",
        "transparent",
      ];

      this.editorIns.create();
      this.editorIns.config.pasteFilterStyle = false; //关闭样式过滤
      this.editorIns.config.uploadImgShowBase64 = true; //图片base64格式
      // this.editorIns.txt.html("<b style='color:#f00;'>用 JS 设置的内容</b>");
      // this.editorIns.txt.getJSON();
      // this.editorIns.txt.setJSON();
    },
    /* 笔记提交 */
    submit() {
      if (!this.FormObj.date) {
        this.FormObj.date = this.$moment().format("YYYY-MM-DD");
      }
      this.$axios
        .post("/notes/add", this.FormObj)
        .then((res) => {
          this.$router.push({ path: "/article" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 删除该篇文章 */
    remove() {
      let bool = confirm("确认删除？");
      if (!bool) {
        return;
      }
      if (!this.FormObj?._id) {
        alert("该文章还未添加到数据库");
      } else {
        this.$axios.post("/notes/delete", this.FormObj).then((res) => {
          this.$router.push({ path: "/article" });
        });
      }
    },
    /* 图片上传 */
    fileChange(event) {
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      let formData = new FormData();
      formData.append("file", event.currentTarget.files[0]);

      this.$axios.post("/notes/upLoadImg", formData, config).then((res) => {
        //判断当前是不是开发环境
        let bese = this.isServe ? "http://localhost:6600" : "";
        if (!res.code && !res.data.imgUrl.includes("undefined")) {
          this.FormObj.imgUrl = bese + res.data.imgUrl;
        } else {
          document.querySelector(".upFile").innerText = "上传失败";
        }
      });
    },
  },
  computed: {
    ...mapState(["isServe"]),
  },
};
</script>

<style lang="less" scoped>
input,
textarea {
  width: 100%;
  background: none;
  outline: none;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 0 5px;
  font-size: 20px;
  line-height: 30px;
}
.row {
  margin: 10px 0;
}
#editor {
  text-align: left;
  color: #000;
  background: transparent;
}
.render {
  text-align: left;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 20px;
}
/* 封面上传 */
.uploadBox {
  position: relative;
  height: 120px;
  cursor: pointer;
  input[type="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  div {
    width: 100%;
    height: 100%;
  }
  .upFile {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #666;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .img {
    background-color: pink;
    border-radius: 5px;
    background-position: center;
    background-size: cover;
  }
}
</style>
