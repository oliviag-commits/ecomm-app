<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length > 0">
    <CartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-if="cartItems.length === 0">
    You current have no items in your cart!
  </div>
</template>

<script>
import axios from 'axios';
import CartList from '@/components/CartList.vue';

export default {
  name: "CartCheckout",
  props: ['user'],
  components: {
    CartList,
  },
  data() {
    return {
      cartItems: [],
    }
  },
  watch: {
    async user(newUserValue) {
      console.log('Changed!');
      console.log(newUserValue);
      if (newUserValue) {
        const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cartcheckout`);
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
      }
    }
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/${this.user.uid}/cartcheckout/${productId}`);
      const updatedCart = response.data;
      this.cartItems = updatedCart;
    },
  },
  async created() {
    console.log(this.user);
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cartcheckout`);
      const cartItems = response.data;
      this.cartItems = cartItems;
    }
  }
}
</script>