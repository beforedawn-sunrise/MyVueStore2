<template>
    <div class="header">
        <div class="menu-bar">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <!-- <a class="navbar-brand" href="#">Navbar</a>-->
                <router-link class="nav-title" href="#" to="/">伊雲坊</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                        <i class="fa-solid fa-cart-shopping" @click="shoppingCart"></i>
                        <button type="button" class="nav-btn btn btn-secondary" @click="backStage">登入後台</button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        backStage(){
            const vm = this;
            vm.$router.push('/login');
        },
        shoppingCart(){
            const vm = this;
            vm.$router.push('/mystoreCartList');
        },
    }
}

</script>

<style scoped>
/* haeader */
.navbar{
    background-color: #b2b2b5;
}
.nav-title{
    font-size: 35px;
    color: black;
    font-family: "Ubuntu", sans-serif;
    font-weight: 900;
    float: right;
    margin-left: 40px;
   
}
.nav-title:hover{
    text-decoration: none;
}

.nav-btn{
    font-size: 20px;
    margin: 20px;
    padding:5px 20px 5px 20px;
}

.navbar-nav{
    text-align: right;
    margin-right: 20px;
}

.navbar-toggler{
    margin-right: 20px;
    /* outline: none;
    border:none; */
}

.fa-solid{
    font-size:35px;
    margin-top: 20px;
}
.fa-solid:hover{
    color: aqua;
}
</style>