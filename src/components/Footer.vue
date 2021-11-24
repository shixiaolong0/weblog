<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div>
            <a href="https://beian.miit.gov.cn">苏ICP备2021046730号</a>
          </div>
        </div>
        <div class="col-md-12">
          <div>
            本站搭建基于:
            <a href="https://v3.cn.vuejs.org/">VUE</a>、
            <a href="https://www.bootcss.com/">Bootstrap</a>、
            <a href="https://2x.antdv.com/docs/vue/introduce-cn/"
              >Ant Design of Vue</a
            >、
            <a href="https://echarts.apache.org/zh/index.html">Apache ECharts</a
            >、
            <a href="https://neteasecloudmusicapi.vercel.app/#/"
              >网易云音乐 NodeJS 版API</a
            >、 <a href="https://www.axios-http.cn/">Axios</a>、
            <a href="http://momentjs.cn/">Moment.js</a>、
            <a href="https://greensock.com/">Greensock</a>、
            <a href="http://nodejs.cn/">Node.js</a>、
            <a href="https://www.expressjs.com.cn/">Express</a>、
            <a href="https://www.mongodb.org.cn/">MongoDB</a>、
            <a href="https://www.aliyun.com/">阿里云服务器</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
footer {
  line-height: 30px;
  background-color: #222;
  padding: 20px 0;
  a {
    color: #fff;
    transition: color 0.3s;
    &:hover {
      color: var(--themeColor);
      text-decoration: none;
    }
  }
}
</style>
