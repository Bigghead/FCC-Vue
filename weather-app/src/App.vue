<template id="">
  <div class="">
    <h1>{{ long }}</h1>
  </div>
</template>

<script type="text/javascript">

  import Keys from '../apiKey.js';
  export default{
    data: function(){
      return {
        lat: '',
        long: '',
        done: false

      }
    },

    methods:{
      getIP : function(){
        var vm = this;
        axios.get('http://ip-api.com/json')
          .then(function(geolocation){
            var ipData = geolocation.data;
            vm.lat = ipData.lat;
            vm.long = ipData.lon;
            return lat;
          });
      },

      getWeatherData: function(lat, long){
        var vm = this;
        axios.get('https://api.darksky.net/forecast/'+ Keys.darkSky + '/' + lat + ',' + long)
          .then(function(weatherData){
            console.log(weatherData);
          });
      }
    },
    mounted: function(){
      var vm = this;

    }
  }

</script>

<style media="screen">

</style>
