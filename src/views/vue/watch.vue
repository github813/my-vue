<template>
  <div>
    <p>FullName: {{fullName}}</p>
    <p>FirstName: <input type="text" v-model="firstName"></p>
  </div>
</template>

<script>
    export default {
        name: "watch",
      data(){
        return {
          firstName:"Dawei",
          lastName: 'Lou',
          fullName:"",

        }
      },
      watch:{
        // firstName(newName, oldName) {
        //   console.log(oldName);
        //   this.fullName = newName + ' ' + this.lastName;
        // }
        firstName: {
          handler(newName, oldName) {
            this.fullName = newName + ' ' + this.lastName;
          },
          // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
          immediate: true
        }
      },
      methods:{
        a(curVal,oldVal){
          conosle.log(curVal,oldVal)
        }
      }
    }
</script>

<style scoped>

</style>
