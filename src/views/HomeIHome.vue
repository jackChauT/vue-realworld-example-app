<template>
  <div class="home-page">
    <!-- <div class="mx-auto bg-info" style="font-size:42px;min-width:500px;">User:<b-alert show>
      <p class="text-left" :style="{maxHeight: windowHeight+'px', wordWrap: 'break-word', overflow: 'hidden'}">{{messageFromUser}}</p>
    </b-alert></div>
    <div class="mx-auto bg-info" style="font-size:42px;min-width:500px;">Home-I:<b-alert show variant="secondary">
      <p class="text-right" :style="{maxHeight: windowHeight+'px', wordWrap: 'break-word', overflow: 'hidden'}">{{messageFromRobot}}</p>
    </b-alert></div> -->
    <div class="mx-auto bg-info chat">
      <b-alert show>
        <div
          :style="{
            maxHeight: windowHeight + 'px',
            wordWrap: 'break-word',
            overflow: 'hidden'
          }"
        >
          <div v-html="message" :style="style"></div>
        </div>
      </b-alert>
    </div>
    <div class="container page"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvTag from "@/components/VTag";
// import { FETCH_TAGS } from "@/store/actions.type";

export default {
  name: "home",
  components: {
    RwvTag
  },
  data: function() {
    return {
      message: "Waiting for Command...",
      messageFromUser: "Waiting for Question...",
      messageFromRobot: "Waiting for Command...",
      windowHeight: 800,
      delayInSec: 0.5,
      style: { fontSize: "36px", textAlign: "center" }
    };
  },
  mounted() {
    var that = this;
    setTimeout(function() {
      that.windowHeight = window.screen.height * 0.8;
    }, 1000);
    // this.$store.dispatch(FETCH_TAGS);
    this.$options.sockets.onmessage = function(data) {
      if (typeof data.data === "undefined") return;
      let result = JSON.parse(data.data);
      console.log(result);
      if (typeof result.method === "undefined") return;
      switch (result.method) {
        case "chat": {
          let message = result.data.message.replace(/(?:\r\n|\r|\n)/g, "<br/>");
          let isHuman = result.data.isHuman;
          // console.log(result.data.message)
          // console.log(this.style)
          // if (message.toLowerCase() == "ok") return;
          setTimeout(function() {
            that.style = result.data.style;
            that.message = message;
          }, this.delayInSec * 1000);
          if (isHuman == "true") {
            setTimeout(function() {
              that.messageFromUser = message;
            }, 1000);
          } else {
            setTimeout(function() {
              that.messageFromRobot = message;
            }, 1000);
          }
          break;
        }
        default: {
          break;
        }
      }
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags"]),
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
<style>
.chat {
  font-size: 36px;
  min-width: 500px;
}
</style>
