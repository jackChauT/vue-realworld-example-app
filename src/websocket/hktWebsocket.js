import router from "../router";
import Vue from "vue";
import Vuex from "vuex";
import GeneralUtils from "@/utils/general";
Vue.use(Vuex);

export default class HKTWebsocket {
  constructor(superThis) {
    this.superThis = superThis;
    this.canSwitchPage = true;
  }

  init() {
    console.log(`Current Page: ${router.currentRoute.name}`);
    var that = this.superThis;
    let canSwitchPage = this.canSwitchPage;
    return function(data) {
      if (typeof data.data === "undefined") return;
      let result = JSON.parse(data.data);
      console.log(result);
      if (typeof result.method === "undefined") return;
      switch (result.method) {
        case "chat": {
          let message = result.data.message.replace(/(?:\r\n|\r|\n)/g, "<br/>");
          // let isHuman = result.data.isHuman;
          setTimeout(function() {
            that.$store.commit("updateStyle", result.data.style);
            that.$store.commit("updateMessages", message);
          }, 0.5 * 1000);
          // if (isHuman == "true") {
          //   setTimeout(function() {
          //     that.messageFromUser = message;
          //   }, 1000);
          // } else {
          //   setTimeout(function() {
          //     that.messageFromRobot = message;
          //   }, 1000);
          // }
          break;
        }
        case "/data/face/alert":
          result.image = "data:image/jpeg;base64," + result.image;
          that.$store.commit("updateCurrentPerson", result);

          // if (!GreetingUtils.isMaster(person_data))
          if (!GeneralUtils.isEmpty(that.$store.state.greeting.peopleAtHome)) {
            that.$store.commit("updatePeopleAtHome", []);
          }

          break;
        case "/data/mobile/face/records":
          that.$store.commit("updatePeopleAtHome", result.faces);
          break;
        case "switchPageAvailable": {
          let canChange = result.data.canChange
          canSwitchPage = canChange;
          break;
        }
        case "switchPage": {
          console.log(canSwitchPage)
          if (!canSwitchPage) return
          
          let page = result.data.page;
          let currentPage = router.currentRoute.name
          if (currentPage == page.toLowerCase()) return
          switch(page.toLowerCase()) {
            // case "chat":
            // case "home":
            //   // delay 5 sec
            //   if (currentPage == "greeting") {
            //     setTimeout(function() {
            //       router.push(page);
            //     }, 5 * 1000)
            //   } else {
            //     router.push(page);
            //   }
            //   break
            case "greeting":
              router.push(page);
              break
            case "schedule":
              router.push(page);
              break
            default:
          }

          break;
        }
        default: {
          console.log("default");
        }
      }
    };
  }
}
