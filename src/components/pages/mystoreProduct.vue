<template>
    <div>
        <mystoreNavbars></mystoreNavbars>
        <loading :active.sync="isLoading"></loading>
        <div class="container-fluid">
            <div class="row allSpace">
                <div class="col-md-6">
                    <img :src="product.imageUrl" style="height:600px; width:100%;" alt="">
                </div>
                <div class="col-md-6 space">
                    <p class="title">{{product.title}}</p>
                    <p class="origin_price">原價 {{product.origin_price}}元</p>
                    <p class="price">現在只要 {{product.price}}元</p><br>
                    <p class="subtitle">{{product.content}}</p>
                    <p class="description">{{product.description}}</p><br>
                    <span>數量:</span>
                    <select class="dropdown" v-model="product.num">
                       <option :value="num" v-for="num in 10" :key="num">
                            選購 {{num}} {{product.unit}}
                        </option>
                    </select><br><br>
                    <p class="total">小計{{ product.num * product.price }}元</p>

                    <button type="button" class="btn btn-info" @click="addtoCart(product.id, product.num)">
                        <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                        加入購物車
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import mystoreNavbars from "../mystoreNavbar.vue";

export default{
     data(){
        return{
            product:{},
            isLoading: false,
            status:{
                loadingItem:'',
            },
            cart:[],
        }
    },
    components:{
        mystoreNavbars,
    },
    methods:{
        getProduct() {
            
            const vm = this;
            console.log(vm.$route.query.productId);
            const id =vm.$route.query.productId;

            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.isLoading = true;
            /* 取得資料，然後... */
            this.$http.get(url).then((response) => {
                // 取得單一產品資料
                vm.product = response.data.product;
                console.log(response.data.product);
                // 開啟單一產品介紹視窗
                vm.isLoading = false;
            });
        },

        addtoCart(id,qty =1){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.status.loadingItem = id;
            const cart = {
                product_id: id,
                qty, //qty:qty
            }
            /* 送出資料，然後另外傳入2個參數*/
            this.$http.post(url,{data: cart}).then((response) => {
                console.log(response);
                vm.status.loadingItem = '';
                // 重新取得產品資料
                vm.getCart();
            });
        },
        getCart(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;

            /* 從api取得資料，然後...*/
            this.$http.get(url).then((response) => {
                // 取得購物車資料
                vm.cart = response.data.data;
                console.log(response.data.data);
                vm.isLoading = false;
            });
        },  
    },
    created(){
        this.getProduct();
    }

}
</script>

<style scoped src="../css/mystoreProduct.css"></style>