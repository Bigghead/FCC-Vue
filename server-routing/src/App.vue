<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view :status="statuses"></router-view>
    <ul>
      <li v-for='item in statuses'>
        {{item.color}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Bus from './main.js';

export default {
  name: 'app',
  data(){
    return {
      statuses: []
    }
  },
  created(){


    //http://api.forismatic.com/api/1.0/?method=getQuote
    axios.get('http://localhost:8000/testing').then((response) => this.statuses = (response.data));
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul{
  list-style: none;
}
</style>
