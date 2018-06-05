<template>
  <div class="x-bar">
  <p :id="id"  :option="option"></p>
  </div>
</template>

<script>
  import HighCharts from 'highcharts'
    export default {
        name: "chart",
        props: {
          id: {
            type: String
          },
          option: {
            type: Object
          }
        },
        mounted() {
          HighCharts.chart(this.id,this.option)
        }
    }
</script>

<style scoped>

</style>
