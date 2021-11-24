<template>
  <div class="lyrics" :style="{ backgroundImage: `url(${MusicCover})` }">
    <!-- nav占位 -->
    <div class="navPlaceholder"></div>
    <div class="lrcBox">
      <ul
        :style="{
          transform: `translateY(${offsetR})`,
        }"
        :class="{ mobile: isMobile }"
      >
        <li
          v-for="(item, index) in lrc?.ms"
          :key="item"
          :class="[
            'animate__animated',
            'animate__zoomIn',
            {
              choose: lineIndex == index,
            },
          ]"
        >
          {{ item.c }}
        </li>
        <li v-show="!lrc">
          这首歌暂时没有歌词<br />博主正在玩儿命寻找新的资源接口
        </li>
      </ul>
    </div>
    <!-- 音乐盒 -->
    <div class="audioBox">
      <div class="name">
        {{ lrc.ti || "未知歌曲" }}
      </div>
      <div class="name">
        {{ lrc.ar || "未知歌手" }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("music", ["lrc", "lineIndex", "MusicCover"]),
    ...mapState(["isMobile", "innerHeight"]),
    offsetR() {
      let num =
        this.lineIndex * (this.isMobile ? 30 : this.innerHeight * 0.04) -
        this.innerHeight * 0.17;

      if (num < 0) {
        return `${Math.abs(num)}px`;
      } else {
        return `-${num}px`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.lyrics {
  width: 100%;
  height: 100%;
  color: #222;
  text-shadow: 0 0 1px #fff;
  user-select: none;
  position: relative;
  background-position: center;
  background-size: cover;
  /* nav占位 */
  .navPlaceholder {
    height: 52px;
  }
  .lrcBox {
    width: 100%;
    height: calc(100% - 52px);
    overflow: hidden;
    text-align: left;
    ul {
      transition: transform 0.3s;
      font-size: 2vh;
      line-height: 4vh;
      li {
        transition: all 0.5s;
        margin-left: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.choose {
          color: var(--themeColor);
          font-size: 2.5vh;
        }
      }
      /* 移动端行高 字体大小 */
      &.mobile {
        font-size: 16px;
        line-height: 30px;
        li.choose {
          font-size: 18px;
        }
      }
    }
  }
  /* 音乐盒 */
  .audioBox {
    position: absolute;
    right: 10px;
    bottom: 0;
    margin: 5px;
    max-width: 40%;
    .name {
      margin-bottom: 5px;
      font-size: 2vmin;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
