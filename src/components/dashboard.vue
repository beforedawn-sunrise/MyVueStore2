<template>
    <div>
        <Navbar/>
        <Alert></Alert>
        <div class="container-fluid">
            <div class="row">
                <Sidebar></Sidebar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
   

<!--<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="/docs/4.6/assets/js/vendor/jquery.slim.min.js"><\/script>')</script>
<script src="/docs/4.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>

      
<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
<script src="dashboard.js"></script> -->
    
</template>

<script>
import Sidebar from "./sidebar.vue";
import Navbar from "./nabar.vue";
import Alert from "./AlertMessage.vue";

export default {
    components:{
        Sidebar,
        Navbar,
        Alert,
    },
    created(){
        //參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie

        // 把cookie讀出來,並往後端發送
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log(myCookie);

        // 參考 https://axios-http.com/docs/config_defaults
        // 在套用axios時,都是使用this.$http
        this.$http.defaults.headers.common.Authorization = myCookie;
    }
}
</script>

