<template v-show="event">
      <b-card no-body class="overflow-hidden" >
        <b-row no-gutters>
          <b-col md="4">
            <b-card-body>
              <b-card-title>{{event.title}}</b-card-title>
              <b-card-text>
                {{event.description}} <br />
                In <b> {{event.location}} </b> <br />
                From <b> {{event.startDate.split('T')[1]}}</b> to <b>{{event.endDate.split('T')[1]}} </b> 
                <br />
                <div v-if="event.elements">
                  <span>Distance: <b>{{event.elements[0]['distance']['text']}}</b></span> <br />
                  <span>Estimated Travelling Time: <b>{{event.elements[0]['duration']['text']}}</b></span>
                </div>
              </b-card-text>
            </b-card-body>
          </b-col>
          <b-col md="7">
            <gmap-map
              :zoom="defaultZoom"
              :center="defaultCenter"
              style="width: 120%; height: 200px"
              :options="{
                disableDefaultUI: true,
              }"
            >
              <gmap-marker v-if="destinationMarker != null" :position="destinationMarker" :clickable="false" :draggable="false"></gmap-marker>
              <gmap-polyline v-if="event.routes.length > 0" :path="path"
                  :options="styles.polyline"
                  ref="polyline">
              </gmap-polyline>
            </gmap-map>
          </b-col>
        </b-row>
      </b-card>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'

export default {
  name: "Schedule",
  computed: {
    google: gmapApi
  },
  data(){
    return {
      defaultZoom: 11,
      defaultCenter: {lat: 22.352734, lng: 114.1277},
      styles: {
        polyline: { strokeColor:'red'}
      },
      destinationMarker: null,
      path: []
    }
  },
  props: ['event'],
  methods:{
  },
  mounted () {
    var that = this;
    this.$gmapApiPromiseLazy().then(() => {
    if (that.event.routes.length > 0) {
      that.path = new google.maps.geometry.encoding.decodePath(that.event.routes[0].overview_polyline.points)
      let startMarker = that.path[0]
      let destinationMarker = that.path[that.path.length - 1]
      that.destinationMarker = {
        lat: destinationMarker.lat(),
        lng: destinationMarker.lng()
      }
      that.defaultCenter = {
        lat: (startMarker.lat() + destinationMarker.lat()) / 2,
        lng: (startMarker.lng() + destinationMarker.lng()) / 2
      }
    }
  });
  }
};
</script>
<style scoped>
.gmnoprint a, .gmnoprint span, .gm-style-cc {
    display:none;
}
.gmnoprint div {
    background:none !important;
}
.gmnoprint a, .gmnoprint span {
    display:none;
}
.gmnoprint div {
    background:none !important;
}
</style>
