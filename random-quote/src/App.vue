<template>
  <div class="container text-center">
    <div class="heading ">
      <h2>Random Quotes</h2>
    </div>

    <quote-box
    v-bind:quote="quote"
    v-bind:author="author"
    v-bind:getQuote="getQuote"

    ></quote-box>
  </div>
</template>

<script>
import Quotebox from './Quotebox.vue';

export default {

  data: function(){
    return {
      quote:  '"' + 'Random Words Go Inside Here ' + '"',
      author: 'Some Cool Guy'
    }
  },

  components:{
    'quote-box': Quotebox
  },

  methods:{
    getQuote: function(){
      var vm = this;
      axios.get('http://quotesondesign.com/wp-json/posts')
        .then(function(data){
          console.log(data);
          // var quote = data.data[0].content;
          //
          // vm.quote = data.data[0];
        });
    }
  }
}
</script>

<style >

  .container{
    margin-top: 5%;
  }





</style>
