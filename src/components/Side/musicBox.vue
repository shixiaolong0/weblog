<template>
  <div class="tion">
    <div class="btnBox">
      <!-- 按钮 -->
      <div @click="prev">
        <icon-font type="icon-shangyishou" />
      </div>
      <div @click="playSwitch">
        <icon-font :type="isPlayIng ? 'icon-zanting' : 'icon-bofang'" />
      </div>
      <div @click="next">
        <icon-font type="icon-xiayishou" />
      </div>
      <div @click="updateIsloop">
        <icon-font :type="isloop ? 'icon-xunhuan' : 'icon-danqu'" />
      </div>
      <!-- 时间进度 -->
      <div class="scheduleDate">
        {{ currentTimeDate || 0.0 }}/{{ durationDate || 0.0 }}
      </div>
    </div>
    <!-- 播放进度条 -->
    <div class="scheduleBox" @click="scheduleClick" id="schedule">
      <div class="schedule" :style="{ width: schedule + '%' }">
        <div class="origin"></div>
      </div>
    </div>

    <!-- 原生 -->
    <audio
      @play="updateIsPlayIng(true)"
      @pause="updateIsPlayIng(false)"
      @timeupdate="onPlayerTimeupdate"
      @ended="onEnded"
      @canplaythrough="onCanplaythrough"
      @loadeddata="onloadeddata"
      @error="onerror"
      :src="MusicUrl"
      controls
      autoplay
      id="myaudio"
    ></audio>
  </div>
</template>

<script>
import { formateTime } from "@/assets/js/mp3Tool.js";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentTime: 0,
      duration: 0,
    };
  },
  computed: {
    ...mapState("music", [
      "lineIndex",
      "lrc",
      "isPlayIng",
      "MusicUrl",
      "isloop",
    ]),
    schedule() {
      return (this.currentTime / this.duration) * 100;
    },
    currentTimeDate() {
      return formateTime(this.currentTime);
    },
    durationDate() {
      return formateTime(this.duration);
    },
  },
  watch: {
    currentTime(newValue) {
      if (!this.lrc) return;
      this.lrc.ms.forEach((item, index) => {
        if (
          newValue >= parseFloat(item.t) &&
          newValue < parseFloat(this.lrc.ms[index + 1]?.t || this.duration)
        ) {
          this.updateLineIndex(index);
        }
      });
    },
  },
  methods: {
    ...mapMutations("music", [
      "updateLineIndex",
      "updateIsPlayIng",
      "updateIsloop",
    ]),
    //监听播放器的timeupdate事件
    onPlayerTimeupdate(e) {
      this.currentTime = myaudio.currentTime;
    },
    /* 监听播放器的canplaythrough事件 */
    onCanplaythrough() {
      this.duration = myaudio.duration;
    },
    /* 监听播放器的播放结束事件 */
    onEnded() {
      if (this.isloop) {
        this.next();
      } else {
        this.currentTime = myaudio.currentTime = 0;
        myaudio.play();
      }
    },
    /* 监听播放器加载错误事件 */
    onerror() {
      if (this.MusicUrl) {
        alert("这首歌暂时无法播放！");
      }
    },
    /* 监听播放器数据加载事件 */
    onloadeddata() {
      // console.log("当加载媒介数据时运行脚本");
    },
    /* 进度条点击 */
    scheduleClick(event) {
      myaudio.currentTime =
        this.duration * (event.offsetX / schedule.clientWidth);
    },
    /* 下一首 */
    next() {
      this.$emit("next");
    },
    /* 上一首 */
    prev() {
      this.$emit("prev");
    },
    /* 播放暂停 */
    playSwitch() {
      if (this.isPlayIng) {
        myaudio.pause();
      } else {
        if (this.MusicUrl) {
          myaudio.play();
        } else {
          this.$emit("nullPlay");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
/* 自定义音频控件 */
.tion {
  width: 100%;
  position: relative;
  user-select: none;
  .btnBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 15px auto;
    font-size: 20px;
    div {
      cursor: pointer;
      transition: transform 0.3s;
      &:active {
        transform: scale(0.8);
      }
    }
    .scheduleDate {
      font-size: 16px;
    }
  }
  /* 播放进度条 */
  .scheduleBox {
    width: 100%;
    height: 5px;
    background: #777;
    border-radius: 3px;
    &:hover {
      .schedule {
        transform: scaleY(1.2);
        .origin {
          transform: scale(1.2);
        }
      }
    }
    .schedule {
      height: 100%;
      width: 1%;
      transition: all 0.3s;
      background: var(--themeColor);
      position: relative;
      .origin {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: all 0.3s;
        background: var(--themeColor);
        position: absolute;
        right: -5px;
        top: -3px;
      }
    }
  }
  /* 音频控件 */
  #myaudio {
    width: 100%;
    height: 40px;
    outline: none;
    position: absolute;
    bottom: -120%;
    right: 0;
    display: none;
  }
}
</style>
