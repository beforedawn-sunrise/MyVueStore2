// 官方元件
import Vue from 'vue'
import VueRouter from 'vue-router'

// // 自訂
// import Home from '@/components/HelloWorld';
import Dashboard from '@/components/dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/products';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import MyStore from '@/components/pages/mystore';
import myStoreProduct from '@/components/pages/mystoreProduct';
import mystoreCartList from '@/components/pages/mystoreCartList';
import mystoreCheckout from '@/components/pages/mystoreCheckout';
// import mystoreLogin from '@/components/pages/mystoreLogin';


Vue.use(VueRouter);

export default new VueRouter({
    // mode:'history',
    // linkActiveClass:'active',
    routes:[
      // {
      //   path:'*',
      //   redirect:'mystoreLogin',
      // },
      

      {
        name:'登入頁面',//元件呈現的名稱
        path:'/login',//對應的虛擬路徑
        component:Login//對應的元件
      },

      {
        name:'dashboard',//元件呈現的名稱
        path:'/admin',//對應的虛擬路徑
        component:Dashboard,//對應的元件
        children:[
          {
            name:'products',//元件呈現的名稱
            path:'products',//對應的虛擬路徑
            component:Products,//對應的元件
            meta:{ requiresAuth: true },
          },  
          
        ],

      },

      {
        name:'dashboard2',//元件呈現的名稱
        path:'/admin',//對應的虛擬路徑
        component:Dashboard,//對應的元件
        children:[
          {
            name:'CustomerOrder',//元件呈現的名稱
            path:'customer_order',//對應的虛擬路徑
            component:CustomerOrder,//對應的元件
          }, 
          {
            name:'CustomerCheckout',//元件呈現的名稱
            path:'customer_checkout/:orderId',//對應的虛擬路徑
            component:CustomerCheckout,//對應的元件
          }, 
          
        ],

      },
      // {
      //   name:'前台登入頁面',//元件呈現的名稱
      //   path:'/',//對應的虛擬路徑
      //   component:mystoreLogin//對應的元件
      // },
      {
        name:'前台頁面',//元件呈現的名稱
        path:'/',//對應的虛擬路徑
        component:MyStore//對應的元件
      },
      {
        name:'單一頁面',//元件呈現的名稱
        path:'/mystoreProduct',//對應的虛擬路徑
        component:myStoreProduct//對應的元件
      },
      {
        name:'購物車列表',//元件呈現的名稱
        path:'/mystoreCartList',//對應的虛擬路徑
        component:mystoreCartList//對應的元件
      },
      {
        name:'結帳頁面',//元件呈現的名稱
        path:'/mystoreCheckout/:orderId',//對應的虛擬路徑
        component:mystoreCheckout//對應的元件
      },

    ],
})