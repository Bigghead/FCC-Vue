var app = new Vue({
  el: '#root',
  data: {
    title: 'Wikipedia Viewer',
    searchTerm: '',
    searchData: []
  },
  methods: {
    submit: function (e) {
      var vm = this;
      vm.searchData = [];
      axios.get("http://en.wikipedia.org/w/api.php?action=opensearch&search=" + this.searchTerm + "&format=json&origin=*")
        .then(function (res) {
          console.log(res.data);
          for( let i = 0 ; i < 10; i ++){
            vm.searchData.push([res.data[1][i], res.data[2][i], res.data[3][i]]);
          }
         vm.searchTerm = '';
          console.log(vm.searchData);
        });
    }
    
  }
});
