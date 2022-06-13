<template>
  <div class="hello">
    <a href="#" v-on:click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    signout(){
       const api = `${process.env.APIPATH}/logout`; // 'http://localhost:3000/api/casper/products';
        // API 伺服器路徑
        // 所申請的 APIPath
        const vm = this;
        console.log(process.env.APIPATH, process.env.CUSTOMPATH);
        this.$http.post(api).then((response) => {
            console.log(response.data);
            
            const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log(myCookie);
            this.$http.defaults.headers.common.Authorization = myCookie;

            if(response.data.success){
                vm.$router.push('/login');
            }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>-->
