<template>
    <div>
         <mystoreNavbars></mystoreNavbars>
         <loading :active.sync="isLoading"></loading>
         <!-- 購物車列表 -->
        <div class="container">
            <div class="row allSpace">
                <!--購物車列表 -->
                <table class="table">
                    <thead>
                        <th></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart.carts">
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
                        <td class="align-middle">{{ item.final_total }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right">總計</td>
                            <td>{{ cart.total }}</td>
                        </tr>
                        <tr v-if="cart.final_total !== cart.total">
                            <td colspan="3" class="text-right text-success">折扣價</td>
                            <td class="text-right text-success">{{ cart.final_total }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm">
                    <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                        套用優惠碼
                        </button>
                    </div>
                </div>

                <!--個人資料表單 -->
               
                <form class="col-md-12 form-space" @submit.prevent="createOrder">
                        <div class="form-group">
                            <label for="useremail">Email</label>
                            <input type="email" class="form-control" name="email" id="useremail"
                                v-validate="'required|email'"
                                :class="{'is-invalid': errors.has('email')}"
                                v-model="form.user.email" placeholder="請輸入 Email">
                            <span class="text-danger" v-if="errors.has('email')">
                                {{ errors.first('email') }}
                            </span>
                        </div>

                        <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input type="text" class="form-control" name="name" id="username"
                            :class="{'is-invalid': errors.has('name')}"
                            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
                        <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                        </div>

                        <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" class="form-control" id="usertel"
                            v-model="form.user.tel" placeholder="請輸入電話">
                        </div>

                        <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="text" class="form-control" name="address"
                        :class="{'is-invalid': errors.has('address')}"
                            id="useraddress" v-model="form.user.address" v-validate="'required'"
                            placeholder="請輸入地址">
                        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                        </div>
                        <div class="form-group">
                        <label for="useraddress">留言</label>
                        <textarea name="" id="" class="form-control" cols="30" rows="10"
                            v-model="form.message"></textarea>
                        </div>
                        <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                        </div>
                </form>   
            </div>
        </div>
        
    </div>
</template>

<script>
import mystoreNavbars from "../mystoreNavbar.vue";
export default{
    data(){
        return{
            form: {
                user: {
                name: '',
                email: '',
                tel: '',
                address: '',
                },
                message: '',
            },
            cart:[],
            isLoading: false,
            coupon_code: '',
        }
    },
    components:{
        mystoreNavbars,
    },
    methods:{
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

        // 移除購物車項目
        removeCartItem(id){
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;

            /* 刪除資料，然後...*/
            this.$http.delete(url).then((response) => {
                // vm.products = response.data.products;
                vm.isLoading = false;
                vm.getCart();
            });
        },
        addCouponCode() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const coupon = {
                code: vm.coupon_code
            };
            vm.isLoading = true;
            /* 送出api資料，然後另外傳入1個參數*/
            this.$http.post(url, { data: coupon }).then(response => {
                console.log(response);
                vm.getCart();
                vm.isLoading = false;
            });
        },
        createOrder() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            // vm.isLoading = true;
            this.$validator.validate().then((result) => {
                if (result) {
                this.$http.post(url, { data: order }).then((response) => {
                    console.log('訂單已建立', response);
                    if (response.data.success) {
                    vm.$router.push(`/mystoreCheckout/${response.data.orderId}`);
                    }
                    // vm.getCart();
                    vm.isLoading = false;
                });
                } else {
                console.log('欄位不完整');
                }
            });
        },    
        
    },
    created(){
        this.getCart();
    }
}   
</script>

<style scoped src="../css/mystoreCartList.css"></style>