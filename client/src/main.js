import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router'
import CartCheckout from './pages/CartCheckout.vue';
import PLP from './pages/PLP.vue';
import PDP from './pages/PDP.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqCSaEmAQiYTZ8c4A156SyaSEb5Qf6COM",
  authDomain: "ecomm-pet-store.firebaseapp.com",
  projectId: "ecomm-pet-store",
  storageBucket: "ecomm-pet-store.appspot.com",
  messagingSenderId: "861060774739",
  appId: "1:861060774739:web:53636e54a1a01a13a63fa6",
  measurementId: "G-LS1Y9TR2QR"
};

initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '/cartcheckout',
    component: CartCheckout,
  }, {
    path: '/plp',
    component: PLP,
  }, {
    path: '/plp/:productId',
    component: PDP,
  }, {
    path: '/',
    redirect: '/plp',
  }, {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  }]
}))
.mount('#app')