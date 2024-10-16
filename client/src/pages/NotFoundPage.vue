<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you are looking for doesn't exist.</p>
    <router-link to="/" class="home-button">
    <button>Return to Home</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>
