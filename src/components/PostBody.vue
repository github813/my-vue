<template>

    <div class="upper">

      <div class="post-body">
        {{postid}}
        <div>
          {{commentcount}}评论
        </div>
      </div>

    </div>


</template>

<script>
    export default {
        name: "post-body",
        data:()=>({

        }),
      props:['title','postid'],//声明子级变量
      computed:{
        commentcount(){
          return this.$store.state.comment.all.length
        }
      },
      methods:{

      }
    }
</script>

<style scoped>

  .upper {
    display: flex;
    min-height: 40vh;
    background-color: #00bcd4;
  }


  .post-body {
    background-color: #fff;
    width: 400px;
    min-height: 30vh;
    margin: 20px auto;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  }
</style>
