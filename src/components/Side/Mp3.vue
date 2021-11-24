<template>
  <div id="AppMp3">
    <!-- 搜索input -->
    <div class="searchBox">
      <form action=".">
        <icon-font type="icon-sousuo" />
        <input
          ref="searchInput"
          type="search"
          autocomplete="off"
          v-model="query"
          @keyup.enter="searchMusic(false)"
          :placeholder="placeholder"
        />
        <input type="text" style="display:none;" />
      </form>
    </div>

    <!-- 歌曲列表 -->
    <div class="musicListBox">
      <loading class="musicLoading" :isLoading="loading"></loading>
      <!-- 歌曲列表 -->
      <div class="musicList">
        <ul>
          <li
            class="musicItem animate__animated animate__zoomIn"
            :class="{ player: item.id == playId && musicIndex == index }"
            v-for="(item, index) in musicList"
            :key="item.id"
            @click="playMusic(item, index, true)"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.artists[0].name }}</span>
          </li>
          <!-- 空状态 -->
          <div
            class="noData"
            v-show="musicList.length == 0"
            style="marginTop:20vh"
          >
            播放列表空空如也~
          </div>
          <!-- 加载更多... -->
          <div v-show="musicList.length" @click="offset++" class="loadMore">
            <p v-show="loadMore" class="rotate">
              <i class="iconfont icon-yinle"></i>
            </p>
            <span v-show="!loadMore">加载更多...</span>
          </div>
        </ul>
      </div>
    </div>

    <!--音频面板-->
    <MusicBox
      @next="nextMusicIndex"
      @prev="prevMusicIndex"
      @nullPlay="playMusic(musicList[0], 0, true)"
    ></MusicBox>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { createLrcObj } from "@/assets/js/mp3Tool.js";
import MusicBox from "./musicBox.vue";
import loading from "@/components/loading.vue";

export default {
  components: { MusicBox, loading },
  data() {
    return {
      loading: true,
      loadMore: false,
      /* 搜索关键词 */
      query: "",
      placeholder: "音乐板块暂时无法使用",
      /* 搜索分页偏移量 */
      offset: 0,
      /* 歌曲列表 */
      musicList: [],
      musicIndex: 0, //在列表中的索引
      playId: "", //ID
      cookie: "00.40.80558b77760127687e72a5ca4368bcec.1228902045",
    };
  },
  created() {
    this.getSearchDefault();
    this.topList();
  },
  computed: {
    ...mapState("music", ["isPlayIng"]),
  },
  methods: {
    ...mapMutations("music", [
      "updateLrc",
      "updateIsPlayIng",
      "updateMusicCover",
      "updateMusicUrl",
    ]),
    /* 登录（网易云音乐） */
    login() {
      this.$axios
        .get(
          `https://autumnfish.cn/login/cellphone?phone=18549922544&password=shi390850530`
        )
        .then((res) => {
          this.cookie = encodeURIComponent(res.data.cookie);
          /* 获取每日推荐歌曲list */
          this.getRecommend();
          /* 获取默认搜索关键词 */
          this.getSearchDefault();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 新歌速递 */
    topList() {
      this.$axios
        .get(`https://autumnfish.cn/top/song?type=0`)
        .then((res) => {
          this.musicList = res.data.data;
          this.loading = false;
        })
        .catch(() => {
          document.querySelector(".noData").innerText =
            "新歌速递失败，娘个jioの~";
          this.loading = false;
        });
    },
    /* 获取默认搜索关键词 */
    getSearchDefault() {
      this.$axios
        .get(`https://autumnfish.cn/search/default?cookie=${this.cookie}`)
        .then((res) => {
          this.placeholder = res.data.data.realkeyword;
        });
    },
    // 歌曲搜索
    searchMusic(offset) {
      if (offset) {
        this.loadMore = true;
      } else {
        this.loading = true;
        this?.$refs?.searchInput?.blur();
        this.offset = 0;
      }
      this.$axios
        .get(
          `https://autumnfish.cn/search?keywords=${this.query ||
            this.placeholder}&offset=${this.offset}`
        )
        .then(
          (res) => {
            this.loadMore = this.loading = false;
            console.log("搜索响应", res);
            if (offset) {
              this.musicList = [...this.musicList, ...res.data.result.songs];
            } else {
              this.musicList = res.data.result.songs;
              document.querySelector(".musicList").scrollTop = 0;
            }
          },
          (err) => {
            this.loadMore = this.loading = false;
            alert("搜索失败！请稍后再试");
          }
        );
    },
    /* 获取歌曲播放url */
    getMuicUrlById(music) {
      this.$axios
        .get(
          `https://autumnfish.cn/song/url?id=${music.id}&cookie=${this.cookie}`
        )
        .then(
          (res) => {
            if (!res.data.data.url) {
              alert("这首歌暂时无法播放，博主正在玩儿命寻找新的资源接口~");
            }
            this.updateMusicUrl(res.data.data.url);
            console.log(res);
          },
          (err) => {
            alert("获取播放地址失败，请稍后再试！");
          }
        );
    },
    /* 获取歌曲详情（封面） */
    getDetailById(music) {
      this.$axios
        .get(
          `https://autumnfish.cn/song/detail?id=${music.id}&cookie=${this.cookie}`
        )
        .then((res) => {
          this.updateMusicCover(res.data.songs[0].al.picUrl); //封面地址
        });
    },
    /* 获取歌词 */
    getLrcById(music) {
      this.$axios
        .get(
          `https://autumnfish.cn//lyric?id=${music.id}&cookie=${this.cookie}`
        )
        .then(
          (res) => {
            if (
              !res.data.lrc ||
              !res.data.lrc.lyric ||
              res.data.lrc.lyric.indexOf("[") == -1
            ) {
              return this.updateLrc(false);
            }
            let lrcData = createLrcObj(res.data.lrc.lyric);
            lrcData.ti = music.name;
            lrcData.ar = music.artists
              .map((item) => {
                return item.name;
              })
              .join("-");

            this.updateLrc(lrcData);
            document.title = `${lrcData.ti}-${lrcData.ar}`;
          },
          (err) => {
            this.updateLrc(false);
          }
        );
    },

    // 列表歌曲点击播放
    playMusic(music, index, hideSide) {
      if (!music) {
        alert("没有歌可以播放");
        return;
      }
      if (this.playId == music.id) return;
      this.playId = music.id;
      this.musicIndex = index;
      hideSide && this.$emit("hideSide");
      // this.getMuicUrlById(music);
      this.updateMusicUrl(
        `https://music.163.com/song/media/outer/url?id=${music.id}`
      );
      this.getLrcById(music);
      // this.getDetailById(music);
      this.updateMusicCover(
        music.album.blurPicUrl ||
          music.album.picUrl ||
          music.album.artist.img1v1Url
      ); //封面地址
    },
    /* 下一首 */
    nextMusicIndex() {
      if (this.musicIndex >= this.musicList.length - 1) {
        this.musicIndex = 0;
        return;
      }
      this.musicIndex++;
    },
    /* 上一首 */
    prevMusicIndex() {
      if (this.musicIndex <= 0) {
        this.musicIndex = this.musicList.length - 1;
        return;
      }
      this.musicIndex--;
    },
  },
  watch: {
    musicIndex(newValue) {
      this.playMusic(this.musicList[newValue], newValue);
    },
    offset() {
      this.searchMusic(true);
    },
  },
};
</script>

<style lang="less" scoped>
#AppMp3 {
  padding: 5px;
  height: 100vh;
}
/* 音乐搜索 */
.searchBox {
  max-width: 450px;
  margin: 0 auto 15px;
  background: #999;
  padding: 0 10px;
  border-radius: 20px;
  line-height: 40px;
  font-size: 16px;
  input {
    background: transparent;
    border: none;
    outline: none;
  }
}
/* 歌曲列表 */
.musicListBox {
  position: relative;
  .musicLoading {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .musicList {
    height: 70vh;
    overflow: auto;
    .musicItem {
      line-height: 40px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      &.player {
        background: var(--themeColor);
      }
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    /*滚动条里面小方块*/
    &::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background: rgba(150, 150, 150, 0.2);
    }
  }
}

.loadMore {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #999;
  .rotate {
    animation: rotate 0.4s infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }

  0% {
    transform: rotate(0deg);
  }
}
</style>
