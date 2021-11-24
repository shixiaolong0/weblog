export default {
  namespaced: true,
  state: {
    /* 歌词 歌名 歌手 */
    lrc: null,
    /* 是否为循环播放 */
    isloop: true,
    /* 当前行歌词索引 */
    lineIndex: 0,
    /* 播放状态 */
    isPlayIng: false,
    /* 歌曲封面 */
    MusicCover: "",
    /* 歌曲播放地址 */
    MusicUrl: "",
  },
  mutations: {
    updateLrc(state, newValue) {
      //歌词
      state.lrc = newValue;
      state.lineIndex = 0;
    },
    updateLineIndex(state, newValue) {
      //高亮行索引
      state.lineIndex = newValue;
    },
    updateIsPlayIng(state, newValue) {
      //播放状态
      state.isPlayIng = newValue;
    },
    updateMusicCover(state, newValue) {
      //封面地址
      state.MusicCover = newValue;
    },
    updateMusicUrl(state, newValue) {
      //歌曲播放地址
      state.MusicUrl = newValue;
    },
    updateIsloop(state) {
      state.isloop = !state.isloop;
    },
  },
  actions: {},
  getters: {},
};
