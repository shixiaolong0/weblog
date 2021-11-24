import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { createFromIconfontCN } from "@ant-design/icons-vue";
import * as echarts from "echarts";
import jsonp from "jsonp";
import moment from "moment";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2834473_ah0kffmu1al.js",
});

const app = createApp(App);

app.component("IconFont", IconFont);

//判断当前是不是开发环境
let ifDEV = process.env.NODE_ENV === "development";
const baseURL = ifDEV ? "http://localhost:6600" : "";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true; //允许跨域携带cookie信息

app.config.globalProperties.$jsonp = jsonp;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$moment = moment;

app
  .use(store)
  .use(router)
  .mount("#app");
