<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <mystoreNavbar></mystoreNavbar>

    <div class="conatiner-fluid all">
        <div class="container">
            <div class="row space">
                <div class="col-md-3" v-for="item in products" :key="item.id">
                    <div class="productBox" @click="mystoreProduct(item.id)">
                        <div class="productImg effect"  :style="{backgroundImage: 'url('+item.imageUrl+')'}">
                            <div class="gradient">
                                <div class="transparent-block"></div>
                            </div>
                        </div>
                        <p class="card-title">{{item.title}}</p>
                        <p class="card-text">NT{{item.price}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
</template>
<script>
import $ from 'jquery';
import mystoreNavbar from "../mystoreNavbar.vue";

export default{
    data(){
        return{
            products: [],
            isLoading: false,
        }
    },
    components:{
        mystoreNavbar,
    },
    methods:{
        getProducts() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            vm.isLoading = true;
            // 如果取得資料成功,就...
            this.$http.get(url).then((response) => {
                // 取得產品資料
                vm.products = response.data.products;
                console.log(response);
                vm.isLoading = false;
            });
        },
        mystoreProduct(id){
            const vm = this;
            vm.$router.push({path:'./mystoreProduct',query:{productId:`${id}`}});
        },
    },
    created(){
        this.getProducts();
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
<style scoped src="../css/mystore.css"></style>


