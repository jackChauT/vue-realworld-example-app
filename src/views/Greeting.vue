<template>
  <div class="face">
    <b-container class="bv-example-row">
      <div>
        <b-card id="face" no-body v-if="person != null">
          <b-row no-gutters>
            <b-col md="4" >
              <img v-if="!isNoImage(person.image)" :src="person.image" class="face-base64-image-main" />
            </b-col>
            <b-col md="8">
              <b-card-body>
                <b-card-title>{{ person.name }}</b-card-title>
                <b-card-text>
                  <b-col class="face-detail-text">
                    <b-row>Category: {{ person.category }}</b-row>
                  </b-col>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <br />
      <div v-for="event in events" :key="event.title">
        <Scheduler :event="event"></Scheduler>
      </div>
      <br />
      <div id="peopleAtHome" v-show="peopleAtHome.length > 0">
        <center class="face-person-title"> People at Home </center>
        <div v-for="(person, index) in peopleAtHome" :key="person.personId">
            <b-container class="">
              <b-row class="">
                <b-col><PeopleAtHome v-if="typeof peopleAtHomeGroup['even'][index] !='undefined' " :person="peopleAtHomeGroup['even'][index]"></PeopleAtHome></b-col>
                <b-col><PeopleAtHome v-if="typeof peopleAtHomeGroup['odd'][index] !='undefined'" :person="peopleAtHomeGroup['odd'][index]"></PeopleAtHome></b-col>
              </b-row>
            </b-container>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import moment from 'moment';
import router from "../router";
import Scheduler from '../components/Schedule';
import PeopleAtHome from '../components/PeopleAtHome';

export default {
  name: 'greeting',
  components: {
    Scheduler,
    PeopleAtHome
  },
  data() {
    return  {
      events: [
        {
          title: 'Dinner with wife',
          location: 'Romantic Restaurant',
          startDate:"2019-02-14T19:30:00",
	        endDate:"2019-02-14T22:30:00",
          description: 'Anniversary Dinner',
          elements: [
            {
               "distance": {
                  "text": "18.0 km",
                  "value": 17995
               },
               "duration": {
                  "text": "21 mins",
                  "value": 1244
               },
               "status": "OK"
            }
          ],
          routes: [{
            overview_polyline: {
              points: "qxpgCshmwTG\\DRRNPFXGNEr@UZOLWfCuBpAkAbCiC`AgAHS@]Om@OBQ?OIMMEO?SL[RMTCD@B?XYpDaExA}AlAmATQLErAwApFcG`EqEfCmCfAwA`@q@b@u@h@_AjAeCtAwCb@u@pAeBZYdAaA~AgAnAi@zDyAfDoA~CcAp@Yd@[\\U|C}CxAcBfFsF`CcCpDeEhEsEj@g@NKr@Wb@M|@Ir@E^BbALbARbCn@zCn@zBb@f@D`@?r@TlCf@lADfDC|AO~Ai@bAs@ZYvAcBh@y@Zq@^eAfBkGBq@R_At@}C^eAf@_Ad@m@`@_@z@m@bDgBlG_D|A}@r@e@hAeAh@u@Tg@Ti@Lk@DmAEm@Kg@Ui@_@m@c@[mAg@qEgAMGIK_@Qm@a@MIq@}@Wy@MaA?eAJu@`@}Ab@aAZs@fAcB~@wA^aAN{@Do@A[CYOm@a@u@i@q@oBeC]s@Mi@Au@FiAXi@NUh@c@bAs@f@a@Tc@Pi@Fm@BoBEsCa@mCw@iE_A_FKc@s@yB}FqQ}AwFIcBHmBDyCUiGAgA@s@TaBZcA^q@dC_CLUZc@Xq@L[Rq@PsAFsAEmAGo@_@cBq@kBa@yA[eCEgCA{BDo@PgAV_AvAuDTq@Lm@A_AMy@k@oA[e@sAoA{@q@sBqBs@cAg@mAEi@?w@B[Jo@\\u@jAaCH]La@Di@E_AI]MWW]UW_Aq@oBcA_@Y[Y_@s@wAeGG]Ei@@c@Hq@h@}Bp@qCXiBDk@F}B@g@SqHDs@Hk@Na@`@s@~@aB`BkEfAeETiBFgAF{B@aH@}@PoBrA{Dl@uBJu@B_AEwPCuJJuBC_AEsBBw@Jy@TgAhBiE|ByEdCcFfC{FtDkHd@gAzA}C`BcDx@oAv@u@xB{@d@QnDuA|@QVGX@RBRHvA~@h@Tx@Tv@Cf@SZWtD{E~BeDrBmChBuB^k@r@iAXi@|@kAZk@P[^a@^]XO|B_A^QjB}@x@_@\\Wh@Wr@Q`A?z@D`@Ah@Ah@ClACpDa@`AIbAAnAEjBGhOm@rDQ`@G`@Kf@Kf@SbAg@dAw@zAoB`@m@l@uAdAsD^sAXo@~CqLpDaNrBmHD_@T}@z@wCd@uAKWCU@QHYPSTKXGPA\\LFFFX?d@AJHF\\PNJd@j@^f@nB|Bz@|Ab@p@"
            }
          }]
        },
      ],
      scrollSpeed: 5,
      peopleAtHomeGroup: {
        even: [],
        odd: []
      }
    }
  },
  computed: {
    person() {
      return this.$store.state.greeting.currentPerson
    },
    peopleAtHome() {
      let peopleAtHome = this.$store.state.greeting.peopleAtHome || null
      console.log(peopleAtHome)
      if (peopleAtHome.length > 0 && peopleAtHome != null) {
        // let element = document.getElementById('nav-scroller')
        // this.scrollByElement(element)
        // this.scrollSpeed = peopleAtHome.length * 1.25
        this.peopleAtHomeGroup['even'] = peopleAtHome.filter((key,index) => index % 2 == 0)
        this.peopleAtHomeGroup['odd'] = peopleAtHome.filter((key,index) => index % 2 != 0)
      }
      return peopleAtHome.slice(0, 3);
    },
    eventList() {
      let events = this.$store.state.greeting.events || null;
      return events
    }
  },
  methods: {
    isNoImage(src) {
      return src.length < 30
    },
    scrollByElement(element, origin = 0) {
      var that = this;
      let waitingSeconds = 4 * 1000 // 4 sec
      let scrollInterval = 25
      setTimeout(function() {
          element.scroll(0, origin)
          let isReachedBottom = element['scrollHeight'] - origin < (waitingSeconds / scrollInterval)
          console.log(`${element['scrollHeight']} - ${origin}`)
          if (isReachedBottom) {
            that.scrollByElement(element, 0)
          } else {
            that.scrollByElement(element, origin + that.scrollSpeed)
          }
        }, scrollInterval)
    }
  },
  mounted() {
  }
}

</script>
<style>
.face-base64-image-main {
  max-height: 350px !important;
  max-width: 200px !important;
}
.face-base64-image {
  max-height: 200px !important;
  max-width: 150px !important;
}
.face-detail-text {
  font-size: 25px
}
.face-person-title {
  font-size: 26px;
  margin-bottom: 10px
}
.face-scroll {
  position: relative; 
  border: #dfdfdf 1px solid;
  max-height: 600px; 
  overflow-y:scroll;
}
</style>