<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Home I
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RwvHeader",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>
