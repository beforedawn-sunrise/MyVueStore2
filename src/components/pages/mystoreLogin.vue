<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12 space">
                     <div class="wrapper">
                        <div class="title">
                            登入
                        </div>
                        <form action="#" @submit.prevent="signin">
                            <div class="field">
                            <input type="text" v-model="user.username" required>
                            <label>帳號:</label>
                            </div>
                            <div class="field">
                            <input type="password" v-model="user.password" required>
                            <label>密碼:</label>
                            </div>
                            <div class="content">
                                <div class="checkbox">
                                    <input type="checkbox" id="remember-me">
                                    <label for="remember-me">記得我</label>
                                </div>
                                <div class="pass-link">
                                    <a href="#">忘記密碼?</a>
                                </div>
                            </div>
                            <div class="field">
                                <input type="submit" value="登入">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
          username:'',
          password:'',
      }
    }
  },
  methods:{
      signin(){
        const api = `${process.env.APIPATH}/admin/signin`; // 'http://localhost:3000/api/casper/products';
        // API 伺服器路徑
        // 所申請的 APIPath
        const vm = this;
        console.log(process.env.APIPATH, process.env.CUSTOMPATH);

        //參考  https://www.npmjs.com/package/vue-axios
         /* 送出資料，然後... */
        this.$http.post(api,vm.user).then((response) => {
            // 由後端送token過來,然後把token轉成cookie
            const token = response.data.token;
            const expired = response.data.expired;
            
            //參考 https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
            console.log(response.data);
            // 如果取得資料成功,就...
            if(response.data.success){
                console.log(token,expired);
                // 把cookie寫入
                document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
                vm.$router.push('/mystore');
            }
        });
      },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
html,body{
  display: grid;
  height: 100%;
  width: 100%;
  place-items: center;
  background-color: #E4E1E0;
  /* background: linear-gradient(-135deg, #c850c0, #4158d0); */
}

.space{
    padding: 50px 350px 50px 350px;
}
::selection{
  background: #4158d0;
  color: #fff;
}
.wrapper{
  width: 380px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
}
.wrapper .title{
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  color: #fff;
  user-select: none;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
}
.wrapper form{
  padding: 10px 30px 50px 30px;
}
.wrapper form .field{
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
}
.wrapper form .field input{
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 17px;
  padding-left: 20px;
  border: 1px solid lightgrey;
  border-radius: 25px;
  transition: all 0.3s ease;
}
.wrapper form .field input:focus,
form .field input:valid{
  border-color: #4158d0;
}
.wrapper form .field label{
  position: absolute;
  top: 50%;
  left: 20px;
  color: #999999;
  font-weight: 400;
  font-size: 17px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}
form .field input:focus ~ label,
form .field input:valid ~ label{
  top: 0%;
  font-size: 16px;
  color: #4158d0;
  background: #fff;
  transform: translateY(-50%);
}
form .content{
  display: flex;
  width: 100%;
  height: 50px;
  font-size: 16px;
  align-items: center;
  justify-content: space-around;
}
form .content .checkbox{
  display: flex;
  align-items: center;
  justify-content: center;
}
form .content input{
  width: 15px;
  height: 15px;
  background: red;
}
form .content label{
  color: #262626;
  user-select: none;
  padding-left: 5px;
}
form .content .pass-link{
  color: "";
}
form .field input[type="submit"]{
  color: #fff;
  border: none;
  padding-left: 0;
  margin-top: -10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
  transition: all 0.3s ease;
}
form .field input[type="submit"]:active{
  transform: scale(0.95);
}
form .signup-link{
  color: #262626;
  margin-top: 20px;
  text-align: center;
}
form .pass-link a,
form .signup-link a{
  color: #4158d0;
  text-decoration: none;
}
form .pass-link a:hover,
form .signup-link a:hover{
  text-decoration: underline;
}
</style>