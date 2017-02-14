<template id="">
  <div class="">
    <h1>{{ weatherData }}</h1>
  </div>
</template>

<script type="text/javascript">

  import Keys from '../apiKey.js';
  export default{
    data: function(){
      return {
        lat: '',
        long: '',
        weatherData: '',
        i: 0
      }
    },

    methods:{
      getIP : function(){
        var vm = this;

        return new Promise(function(resolve, reject){
           return axios.get('http://ip-api.com/json')
            .then(function(geolocation){
              var ipData = geolocation.data;
              vm.lat = ipData.lat;
              vm.long = ipData.lon;
              resolve();
            });
        });
      },

      getWeatherData: function(lat, long){
        var vm = this;

        return new Promise(function(resolve, reject){
          return axios.get('https://api.darksky.net/forecast/'+ Keys.darkSky + '/' + lat + ',' + long)
            .then(function(weatherData){
              vm.weatherData = weatherData.request.responseText;
              resolve();
            });
        });
      }
    },
    mounted: function(){
        var vm = this;
        vm.getIP()
            .then(function(){
              return vm.getWeatherData(vm.lat, vm.long);
            }).then(function(){
              return new Promise(function(resolve, reject){
                setTimeout(function(){
                  console.log('timeout');
                  resolve();
                }, 4000);
              });
            }).then(function(){
              console.log('all calls done');
            });
      }
  }

</script>

<style media="screen">

</style>
