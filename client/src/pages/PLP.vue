<!-- product list page -->
<!-- route is '/plp' -->
<template>
  <h1>Products</h1>
  <ProductsGrid :products="products"/>
</template>

<script>
import ProductsGrid from '../components/ProductsGrid.vue';
import axios from 'axios';

export default {
  name: "PLP",
  components: {
    ProductsGrid,
  },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    const response = await axios.get('/api/plp');
    const products = response.data;
    this.products = products;
  }
}
</script>