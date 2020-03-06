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

export default {
  name: 'greeting',
  data() {
    return  {
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
