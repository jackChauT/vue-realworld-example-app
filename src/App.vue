<template>
  <div id="app" class="hkt-main-style">
    <HomeIHeader id="header" />
    <router-view
      v-if="isShow"
      :style="style"
      class="hkt-main"
    ></router-view>
    <RwvFooter id="footer" />
  </div>
</template>

<script>
// import RwvHeader from "@/components/TheHeader";
import HomeIHeader from "@/components/HomeIHeader";
import RwvFooter from "@/components/TheFooter";
import HKTWebsocket from "@/websocket/hktWebsocket.js";

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
  methods: {
    init() {
      this.$options.sockets.onmessage = new HKTWebsocket(this).init();
    }
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
      that.init();
    }, 500);
  }
};
</script>

<style>

.hkt-main {
  display: box;
  align-items: center;
  justify-content: center;
  overflow-y:scroll;
  color: black
}
</style>
