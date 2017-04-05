

var app = new Vue({
  el: '#app',
  data: {
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
          return axios.get('https://api.darksky.net/forecast/fb7bfe5b5fb3a0b9f9bf5215ce4b3e6d/' + lat + ',' + long)
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
});