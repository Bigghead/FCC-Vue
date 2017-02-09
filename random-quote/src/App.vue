<template>
  <div class="container">
    <div class="quote-box">

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

  body{
    min-height: 85vh;
  }

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .quote-box {
  height: 300px;
  width: 50%;
  border: 2px solid black;
}
</style>
