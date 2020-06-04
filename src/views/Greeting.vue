<template>
  <div class="face">
    <b-container class="bv-example-row">
      <b-alert show variant="primary" v-if="person != null">
        <b-row>
          <b-col>
            <img :src="person.image" class="face-base64-image" />
          </b-col>
          <b-col class="face-detail-text">
            <b-row>Name: {{ person.name }}</b-row>
            <b-row>Category: {{ person.category }}</b-row>
          </b-col>
        </b-row>
      </b-alert>
      <br />
      <div v-for="event in events" :key="event.title">
        <Scheduler :event="event"></Scheduler>
      </div>
      <br />
      <div v-if="peopleAtHome.length > 0">
        <span class="face-person-title"> People at Home </span>
        <div v-for="face in peopleAtHome" :key="face.personId">
          <b-row>
            <b-col>
              <img :src="face.image" class="face-base64-image" />
            </b-col>
            <b-col>
              <b-row>Name: {{ face.name }}</b-row>
              <b-row>Category: {{ face.category }}</b-row>
              <b-row>Time: {{ face.timestamp.replace("T", " ") }}</b-row>
            </b-col>
          </b-row>
          <br />
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

export default {
  name: 'greeting',
  components: {
    Scheduler
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
      ]
    }
  },
  computed: {
    person() {
      return this.$store.state.greeting.currentPerson
    },
    peopleAtHome() {
      return this.$store.state.greeting.peopleAtHome
    }
  },
  methods: {
  },
  mounted() {
  }
}

</script>
<style>
.face-base64-image {
  max-height: 500px;
  max-width: 500px;
}
.face-detail-text {
  font-size: 25px
}
.face-person-title {
  font-size: 26px
}
</style>
