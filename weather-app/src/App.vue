<template id="">

</template>

<script type="text/javascript">

  import Keys from '../apiKey.js';
  export default{
    data: function(){
      return {
        lat: '',
        long: ''

      }
    },

    methods:{
      getIP : function(){
        var vm = this;
        axios.get('http://ip-api.com/json')
          .then(function(geolocation){
            var ipData = geolocation.data;
            vm.lat = ipData.lat;
            vm.long = ipData.long;
          });
      },

      getWeatherData: function(lat, long){
        var vm = this;
        console.log(lat);
        axios.get('https://api.darksky.net/forecast/'+ Keys.darkSky + '/' + lat +',' + long + '')
          .then(function(weatherData){
            console.log(weatherData);
          });
      }
    },
    mounted: function(){
      var vm = this;
      vm.getIP();
      vm.getWeatherData(vm.lat, vm.long);
    }
  }

</script>

<style media="screen">

</style>
