<template>
  <nav class="navbar navbar-light hkt-header">
    <div class="container hkt-main-style">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Home I {{ $t("GOOD_MORNING") }}
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
<style>
</style>
