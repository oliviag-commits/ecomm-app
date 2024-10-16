<template>
  <div class="nav-bar">
    <router-link to="/plp" class="products-link">
      <div class="logo-wrap">
        <img :src="logo" />
      </div>
    </router-link>
    <div class="nav-buttons-wrap">
      <button @click="signOut" v-if="user">Sign Out</button>
      <router-link to="/cartcheckout">
        <button>Shopping Cart</button>
      </router-link>
    </div>

  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import logo from '@/assets/logo.svg';

export default {
  name: "NavBar",
  props: ['user'],
  data() {
    return {
      logo,
    }
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth);
    }
  }
}
</script>