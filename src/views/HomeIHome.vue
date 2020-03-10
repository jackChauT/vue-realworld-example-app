<template>
  <div class="home-page">
    <!-- <div class="mx-auto bg-info" style="font-size:42px;min-width:500px;">User:<b-alert show>
      <p class="text-left" :style="{maxHeight: windowHeight+'px', wordWrap: 'break-word', overflow: 'hidden'}">{{messageFromUser}}</p>
    </b-alert></div>
    <div class="mx-auto bg-info" style="font-size:42px;min-width:500px;">Home-I:<b-alert show variant="secondary">
      <p class="text-right" :style="{maxHeight: windowHeight+'px', wordWrap: 'break-word', overflow: 'hidden'}">{{messageFromRobot}}</p>
    </b-alert></div> -->
    <!-- <div>{{ $t("GREETING_MASTER") }}</div> -->
    <div
      :style="{
        maxHeight: windowHeight + 'px',
        wordWrap: 'break-word',
        overflow: 'hidden',
        marginRight: '70px',
        marginLeft: '70px'
      }"
    >
      <div v-html="messages" :style="style"></div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import RwvTag from "@/components/VTag";

export default {
  name: "home",
  components: {
    RwvTag
  },
  data: function() {
    return {
      messageFromUser: "Waiting for Question...",
      messageFromRobot: "Waiting for Command...",
      windowHeight: 800,
      delayInSec: 0.5
    };
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    },
    style() {
      return this.$store.state.chat.style;
    }
  },
  mounted() {
    console.log();
    var that = this;
    setTimeout(function() {
      that.windowHeight = window.screen.height * 0.8;
    }, 1000);

    setTimeout(function() {
      that.$i18n.locale = 'en'
    }, 3000);

  }
};
</script>
<style>
.chat {
  font-size: 36px;
  min-width: 500px;
}
</style>
