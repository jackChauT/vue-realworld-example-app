<template>
  <div id="app">
    <HomeIHeader />
    <router-view></router-view>
    <RwvFooter />
  </div>
</template>

<script>
// import RwvHeader from "@/components/TheHeader";
import HomeIHeader from "@/components/HomeIHeader";
import RwvFooter from "@/components/TheFooter";

export default {
  name: "App",
  components: {
    HomeIHeader,
    RwvFooter
  }
};
</script>

<style></style>
