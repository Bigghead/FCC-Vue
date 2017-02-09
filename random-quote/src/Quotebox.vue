<template id="">

  <div class="">
    <div class="jumbotron vertical-center">
      <h2>{{ quote }}</h2>

      <h4 class='item'>- {{ author }}</h4>
    </div>
    <div class="">
      <button type="button" class='btn btn-primary'>New Quote</button>
      <button type="button" class='btn btn-info'>Random Quote</button>
    </div>
    </div>
  </div>

</template>

<script type="text/javascript">

    export default{
      props: ['quote', 'author']
    }
</script>

<style scoped>
.jumbotron{
  margin:  auto;
  height: 400px;
  background: black;
  color: white;
}

.vertical-center {

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
}

.item{
  align-self: flex-end;
  transform: translateY(500%);
}



</style>
