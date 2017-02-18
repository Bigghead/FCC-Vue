<template id="">
  <div class="">
    <div class="container text-center" v-if='weatherData !== ""'>
      <h1>{{ city }}, <strong>{{ region }}</strong></h1>
      <h1 style='text-decoration: underline'>{{ todayTemp }}° F</h1>
        <i class='weatherIcon' v-bind:class='todayWeather'></i>
        <h3>{{ weatherData.currently.summary }}</h3>
        <hr>

        <h4>3 Day Forecast:</h4>
        <div class="row" v-if='weatherData !== ""' >
          <div class="col col-xs-4 " v-for="item in nextDayData">
            <h3>{{ timeConverter(item.time)}}</h3>
            <p>
              {{ item.summary}}
            </p>
            <i class='weatherIcon3 wi wi-rain'></i>
          </div>
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">

import Keys from '../apiKey.js';
export default{
  data: function(){
    return {
      lat: '',
      long: '',
      city: '',
      region: '',
      weatherData: '',
      today: '',
      todayTemp : '',
      todayWeather : 'wi wi-',
      nextDayData: []
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
          vm.city = ipData.city;
          vm.region = ipData.region;
          resolve();
        });
      });
    },

    getWeatherData: function(lat, long){
      var vm = this;

      return new Promise(function(resolve, reject){
        return axios.get('https://api.darksky.net/forecast/'+ Keys.darkSky + '/' + lat + ',' + long)
        .then(function(weatherData){
          var data = JSON.parse(weatherData.request.responseText);
          vm.weatherData = data;
          vm.today = vm.timeConverter(data.currently.time);
          vm.todayTemp = Math.floor(data.currently.temperature);
          vm.todayWeather += vm.getWeatherIcon(data.currently.icon);
          for(var i = 1; i <= 3; i ++){
            vm.nextDayData.push(data.daily.data[i]);
          }
          console.log(vm.nextDayData);
          resolve();
        });
      });
    },
    timeConverter: function(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var month = months[a.getMonth()];
      var date = a.getDate();
      var day = days[a.getDay()] ;
      var time = day+ ', ' + month + ' ' + date   ;// ' ' + hour + ':' + min + ':' + sec ;
      return time;
    },
    getWeatherIcon: function(string){
      var newString = string.split('-');
      newString.unshift(newString.pop());
      return newString.join('-');
    }
  },
  mounted: function(){
    var vm = this;
    vm.getIP()
    .then(function(){
      return vm.getWeatherData(vm.lat, vm.long);
    }).catch(function(err){
      console.log(err);
    });;
  }
}

</script>

<style media="screen">

  body{
    background-color: rgb(48, 63, 159);
    color: white;
  }
  .weatherIcon{
    font-size: 10em;
  }

  .weatherIcon3{
    font-size: 5em;
  }

  hr{
    color: white;
  }
</style>
