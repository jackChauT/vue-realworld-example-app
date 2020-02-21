<template>
  <div id="app" class="hkt-style">
    <HomeIHeader id="header" />
    <router-view
      v-if="isShow"
      :style="style"
      style="display: flex;align-items: center;justify-content: center;"
    ></router-view>
    <RwvFooter id="footer" />
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
  },
  data: function() {
    return {
      style: { height: `800px` },
      isShow: false
    };
  },
  mounted() {
    var that = this;
    setTimeout(function() {
      let headerHeight = document.getElementById("header").clientHeight;
      let footer = document.getElementById("footer");
      // console.log(document.getElementById('footer').clientHeight)
      // console.log(footer.style)
      // window.screen.availHeight
      that.style.height = `${window.screen.availHeight -
        headerHeight -
        footer.clientHeight -
        58}px`;
      that.isShow = true;
      // that.style.marginTop = `${headerHeight}px`;
    }, 500);
  }
};
</script>

<style>
.hkt-style {
  background-color: white;
  color: black;
}
</style>
