<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {

  }
}
</script>

<style lang="scss">


  *,:before,:after{box-sizing: border-box;}
  body,html{
    padding:0px;
    margin:0px auto;
  }
  a{
    text-decoration:none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }


</style>
