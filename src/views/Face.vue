<template>
  <div class="face">
    <b-container class="bv-example-row">
      <b-row v-if="person_data != null">
        <b-col>
          <img :src="person_data.image" class="face-base64-image" />
        </b-col>
        <b-col class="face-detail-text">
          <b-row>ID: {{ person_data.personId }}</b-row>
          <b-row>Name: {{ person_data.name }}</b-row>
          <b-row>Category: {{ person_data.category }}</b-row>
        </b-col>
      </b-row>
      <br />
      <b-alert
        show
        variant="success"
        v-for="face in facesResult"
        :key="face.id"
      >
        <b-row v-if="facesResult != null">
          <b-col>
            <img :src="face.image" class="face-base64-image" />
          </b-col>
          <b-col>
            <b-row>Name: {{ face.name }}</b-row>
            <b-row>Category: {{ face.category }}</b-row>
            <b-row>Time: {{ face.timestamp.replace("T", " ") }}</b-row>
          </b-col>
        </b-row>
      </b-alert>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'face',
  data() {
      return  {
        ws: null,
        person_data: null,
        config: {
          withCredentials: true,
          auth: {
            username: "root",
            password: "root1234"
          }
        },
        facesResult: []
      }
    },
  methods: {
    // eslint-disable-next-line
    isMaster(category) {
      if (category.toLowerCase() == "master") {
        return true;
      } 
      return false; 
    },
    clearFacesResult() {
      this.facesResult = []
    },
    initWebsocketClient() {
      console.log('init')
      var that = this;
      this.$options.sockets.onmessage = function(data) {
        console.log(data)
        if (typeof data.data === 'undefined') return;
        let result = JSON.parse(data.data);
        console.log(result);
        if (typeof result.method === 'undefined') return;
        switch(result.method) {
          case "/data/face/alert":
            result.image = "data:image/jpeg;base64," + result.image
            that.person_data = result;
            console.log(result)
            if (!that.isMaster(result.category)) {
              that.clearFacesResult()
            }
            break;
          case "/data/mobile/face/records":
              that.facesResult = result.faces;
            break;
          default:
        }
      }
    }
  },
  mounted() {
      console.log('Face')

    this.initWebsocketClient();
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
</style>
