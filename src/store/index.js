import { createStore } from "vuex";
import music from "./music";

export default createStore({
  state: {
    innerHeight: 0, //页面高度
    isMobile: false, //是不是移动端
    isServe: true, //是不是开发环境
  },
  mutations: {
    upDateInnerHeight(state, newValue) {
      state.innerHeight = newValue;
    },
    setIsMobile(state, newValue) {
      state.isMobile = newValue;
    },
    upDateIsServe(state, newValue) {
      state.isServe = newValue;
    },
  },
  actions: {},
  modules: {
    music,
  },
});
