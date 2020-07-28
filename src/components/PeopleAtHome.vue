<template>
  <b-card no-body>
    <b-row no-gutters>
      <b-col md="4" >
        <img v-if="!isNoImage(person.image)" :src="person.image" class="face-base64-image" />
      </b-col>
      <b-col md="8">
        <b-card-body>
          <b-card-title>{{ person.name }}</b-card-title>
          <b-card-text>
            <b-col class="face-detail-text">
              <b-row>Category: {{ person.category }}</b-row>
              <b-row>Time: {{ person.timestamp.replace("T", " ") }}</b-row>
            </b-col>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "PeopleAtHome",
  props: ['person'],
  methods: {
    isNoImage(src) {
      return src.length < 30
    },
  }
};
</script>
