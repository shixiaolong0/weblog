<template>
  <div id="Message">
    <!-- 留言板 -->
    <div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-4">
            <input type="text" v-model="fromObj.user" placeholder="称呼..." />
          </div>
          <div class="col-xs-12 col-sm-4">
            <input type="text" v-model="fromObj.meil" placeholder="邮箱..." />
          </div>
          <div class="col-xs-12 col-sm-4">
            <input type="text" v-model="fromObj.link" placeholder="网站..." />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <textarea
              rows="3"
              v-model="fromObj.msg"
              placeholder="请输入留言..."
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 submit">
            <div class="btnE">
              <div class="btn" @click.stop="showEmoji">😃</div>
              <div class="emoji" :class="{ show: ifEmojiShow }">
                <ul>
                  <li
                    v-for="(item, index) in emoji"
                    :key="index"
                    @click="handleEmojiClick(item)"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="btn">提交</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromObj: {
        msg: "",
        date: 0,
        user: "",
        meil: "",
        link: "",
      },
      emoji: [
        "😃",
        "😁",
        "😂",
        "😊",
        "🙃",
        "🥰",
        "😘",
        "🤭",
        "🤔",
        "😏",
        "😵",
        "😟",
        "🙁",
        "😳",
        "😰",
        "😭",
        "😖",
        "😡",
        "😠",
        "😈",
        "🤡",
        "☠️",
        "👻",
        "🙈",
        "🙉",
        "❤️",
        "💖",
        "💢",
        "💣",
        "💤",
        "👋",
        "👍",
        "👌",
        "🤞",
        "🤟",
        "🤙",
        "👊",
        "🖕",
        "🤝",
        "🙏",
        "🙅",
        "🙅‍♂️",
        "👨‍✈️",
        "👩‍✈️",
        "👷",
        "👷‍♀️",
        "🤦",
        "🤦‍♂️",
        "👴",
        "🧓",
        "🐴",
        "🐮",
        "🐖",
        "🐑",
        "🐓",
        "🦚",
        "🐲",
        "🐳",
        "🐟",
        "🐌",
      ],
      ifEmojiShow: false,
      msgList: [],
    };
  },

  methods: {
    //点击图标显示Emoji
    showEmoji() {
      this.ifEmojiShow = true;
    },
    //表情被点击
    handleEmojiClick(item) {
      this.msg += item;
    },
    //发表按钮点击 留言发表
    async handleMessageSubmit() {
      //验证有没有内容
      let msg = this.msg.trim();
      if (!msg) return;

      //留言完成 向后端发请求
      let { data } = await this.$axios({
        method: "POST",
        url: "/msg/report",
        data: {
          msg: this.msg,
        },
      });

      //后续处理 后端返回留言失败 提示用户原因
      if (data.code) {
        return;
      }

      //留言成功 清空留言板
      this.msg = "";
      //刷新留言页面
      this.getMsg();
    },

    //请求留言数据
    async getMsg() {
      let { data } = await this.$axios({
        method: "get",
        url: "/msg/get",
      });

      /* 请求失败 */
      if (data.code) {
        return;
      }

      //添加一些新属性
      data.data.filter((item) => {
        //用来控制回复框显不显示的属性
        item.ifShowReply = false;

        //用来存储每个留言的回复
        item.reply = "";

        //用来存储回复的是谁
        item.replyUser = {};
      });

      //请求成功
      this.msgList = data.data;
    },

    //处理时间格式
    formatDate(val) {
      let date = new Date(val),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds();

      hh < 10 && (hh = "0" + hh);
      mm < 10 && (mm = "0" + mm);
      ss < 10 && (ss = "0" + ss);

      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    },

    //留言回复按钮点击
    handleReplyClick(item, replyUser) {
      //回复框的状态切换
      item.ifShowReply = !item.ifShowReply;
      item.replyUser = replyUser;
    },

    //回复提交
    async handleReplyInputClick(item) {
      let reply = item.reply;

      if (!reply) return;

      let { data } = await this.$axios({
        method: "post",
        url: "msg/reply",
        data: {
          msg: reply,
          _id: item._id,
          replyUserId: item.replyUser,
        },
      });

      //回复成功 重新请求留言数据
      this.getMsg();
    },
  },
  created() {
    //请求留言数据
    this.getMsg();
  },
  mounted() {
    //点击页面表情窗口隐藏
    document.addEventListener("click", () => {
      this.ifEmojiShow = false;
    });
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

.submit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
div.btnE {
  position: relative;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  i {
    font-size: 20px;
    cursor: pointer;
  }
  .emoji {
    display: none;
    position: absolute;
    top: 35px;
    width: 300px;
    height: 180px;
    padding: 10px;
    background-color: #fff;
    border: 1px #ddd solid;
    box-shadow: 0 0 1px #999;
    border-radius: 6px;
    &.show {
      display: block;
    }
    &::before {
      content: "";
      position: absolute;
      top: -14px;
      left: 5px;
      width: 0;
      height: 0;
      border: 7px transparent solid;
      border-bottom-color: #ddd;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      border-top: 1px #ddd solid;
      border-left: 1px #ddd solid;
      li {
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        cursor: pointer;
        line-height: 29px;
        text-align: center;
        border-right: 1px #ddd solid;
        border-bottom: 1px #ddd solid;
      }
    }
  }
}
</style>
