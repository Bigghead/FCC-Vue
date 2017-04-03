<template id="">
  <div class="">
    <div class="container text-center" v-if='weatherData !== ""'>
        <h1>{{ city }}, <strong>{{ region }}</strong></h1>
        <button class='btn btn-info' v-on:click="toggleTemp">Fahrenheit/Celcius</button>
        <h1 class='mainTemp'>{{ todayTemp }}° {{currentDegree}}</h1>
        <i class='weatherIcon' v-bind:class='todayWeather'></i>
        <h3>{{ weatherData.currently.summary }}</h3>
      <hr>

      <h4>3 Day Forecast:</h4>
      <div class="row" v-if='weatherData !== ""'>
        <div class="col col-sm-4 col-xs-12 " v-for="item in nextDayData">
          <h3>{{ timeConverter(item[0].time)}}</h3>
          <i v-bind:class='item[1]'></i>
          <p class='summary'>
            {{ item[0].summary}}
          </p>
        </div>
      </div>
    </div>
  </div> 
</template>

<script type="text/javascript">
  import Keys from '../apiKey.js';
  export default {
    data: function () {
      return {
        lat: '',
        long: '',
        city: '',
        region: '',
        weatherData: '',
        today: '',
        todayTemp: '',
        todayWeather: 'wi wi-forecast-io-',
        nextDayData: [],
        currentDegree: 'F'
      }
    },
    methods: {
      getIP: function () {
        var vm = this;
        return new Promise(function (resolve, reject) {
          return axios.get('http://ip-api.com/json')
            .then(function (geolocation) {
              var ipData = geolocation.data;
              vm.lat = ipData.lat;
              vm.long = ipData.lon;
              vm.city = ipData.city;
              vm.region = ipData.region;
              resolve();
            });
        });
      },
      getWeatherData: function (lat, long) {
        var vm = this;
        return new Promise(function (resolve, reject) {
          vm.nextDayData = [];
          return axios.get('https://api.darksky.net/forecast/' + Keys.darkSky + '/' + lat + ',' + long)
            .then(function (weatherData) {
              var data = JSON.parse(weatherData.request.responseText);
              vm.weatherData = data;
              vm.today = vm.timeConverter(data.currently.time);
              vm.todayTemp = Math.floor(data.currently.temperature);
              vm.todayWeather += data.currently.icon;
              for (var i = 1; i <= 3; i++) {
                var dayIcon = vm.getWeatherIcon(data.daily.data[i].icon);
                vm.nextDayData.push([data.daily.data[i], 'weatherIcon3 wi wi-forecast-io-' + data.daily.data[i].icon ]);
              }
              resolve();
            });
        });
      },
      timeConverter: function (UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var day = days[a.getDay()];
        var time = day + ', ' + month + ' ' + date;// ' ' + hour + ':' + min + ':' + sec ;
        return time;
      },
      getWeatherIcon: function (string) {
        var newString = string.split('-');
        newString.unshift(newString.pop());
        return newString.join('-');
      },
      toggleTemp: function (e) {
        console.log(this.currentDegree);
        if (this.currentDegree === 'F') {
          this.todayTemp = Math.round((this.todayTemp - 32) * (5 / 9));
          this.currentDegree = 'C';
        } else if (this.currentDegree === 'C') {
          this.todayTemp = Math.round((this.todayTemp * 1.8 + 32));
          this.currentDegree = 'F';
        }
      }
    },
    mounted: function () {
      var vm = this;
      vm.getIP()
        .then(function () {
          return vm.getWeatherData(vm.lat, vm.long);
        }).catch(function (err) {
          console.log(err);
        });;
    }
  }

</script>

<style media="screen">
  body {
    background-color: rgb(48, 63, 159);
    color: white;
    font-family: 'Montserrat';
  }
  
  button {
    margin-top: 5%;
  }
  
  .mainTemp {
    text-decoration: underline;
    font-size: 50px;
  }
  
  .weatherIcon {
    font-size: 10em;
  }
  
  .weatherIcon3 {
    font-size: 5em;
  }
  
  .summary {
    margin-top: 30px;
  }
  
  hr {
    color: white;
    margin-top: 50px;
  }
</style>