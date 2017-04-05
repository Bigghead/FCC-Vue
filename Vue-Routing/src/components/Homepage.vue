<template id="">
  <div class="">
    <img src="../assets/logo.png">

    <h1>Welcome, my noob friends</h1>
    <router-link to='/hello'>Go to Hello</router-link>
    <div class="" v-for='item in statuses'>
      <div class="panel panel-info">
        <div class="panel-heading">
          <h3 class="panel-title">Panel title</h3>
        </div>
        <div class="panel-body">
          Panel content
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/javascript">

import axios from 'axios';
export default{
  data: function(){
    return {
      statuses : []
    }
  },

  created(){
    axios.get('/statuses')
        //  .then(response => this.statuses = response.data);
        .then(response => console.log(response));
  }
}

</script>
