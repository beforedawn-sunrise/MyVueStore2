<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
     <!--<HelloWorld/>-->
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  //測試API
  //   created() {
  //     const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; // 'http://localhost:3000/api/casper/products';
  //     // API 伺服器路徑
  //     // 所申請的 APIPath
  //     console.log(process.env.APIPATH, process.env.CUSTOMPATH);
  //     this.$http.get(api).then((response) => {
  //       console.log(response.data);
  //     });
  // },
}
</script>

<style lang="scss">
@import "./assets/all.scss";

// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   // margin-top: 60px;
// }
</style>
