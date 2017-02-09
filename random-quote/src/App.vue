<template>
  <div class="container text-center">
    <div class="heading ">
      <h2>Random Quotes</h2>
    </div>

    <quote-box
    v-bind:quote="quote"
    v-bind:author="author"
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
  }
}
</script>

<style >

  .container{
    margin-top: 5%;
  }





</style>
