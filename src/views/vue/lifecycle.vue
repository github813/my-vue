<template>
    <div>
      <h2>Vue 生命周期</h2>
      <p >{{title}}<button @click="updatetitle">修改title</button></p>
      <p>{{com}}</p>
    </div>
</template>

<script>
    export default {
        name: "lifecycle",
        data(){
          return{
            title:"测试vue生命周期"
          }
        },
      methods:{
          updatetitle(){
            this.title='组件更改';
          }
      },
      beforeCreate:function () {
        alert("beforeCreate:组件实例化之间执行的事件")
      },
      created:function () {
        alert("created：组件实例化完成，但是页面还没显示")
      },
      beforeMount:function () {
        alert("beforeMount：组件挂在前，页面没有展示，但是虚拟Dom已配置")
      },
      computed:{
        com(){
          console.log("computed")
          return "computed是计算属性，实时响应的，比如你要根据data里一个值随时变化做出一些处理，就用computed";
        }
      },
      mounted:function () {
        alert("mounted：组件挂在后，页面没有展示，执行完页面元素展示")
      },

      beforeUpdate:function () {
        alert("beforeUpdate:组件更新前，页面没有展示，但虚拟Dom已配置")
      },
      updated:function () {
        alert("updated:组件更新完成，页面没有展示，执行完该方法后显示")
      },
      beforeDestroy:function () {
        alert("beforeDestroy:组件销毁前")
      },
      destroyed:function () {
        alert("destroyed:组件销毁完成")
      }


    }
</script>

<style scoped>

</style>
