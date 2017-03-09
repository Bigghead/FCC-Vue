var app = new Vue({
  el: '#root',
  data: {
    title: 'Wikipedia Viewer',
    searchTerm: ''
  },
  methods:{
    submit: function(e){
      axios.get("http://en.wikipedia.org/w/api.php?action=opensearch&search=Nike&format=json")
            .then(function(res){
              console.log(res);
            });
            this.searchTerm = '';
    }
  }
});
