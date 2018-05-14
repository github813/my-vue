<template>
  <div class="bottom">
    <div class="comment-box">
      <input v-model="message" type="text"/><button @click="sumbitmessage">提交</button>

       <div  :key="comment.id" v-for="comment in commentlist">{{comment.body}} </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "comment-box",
        data:()=>({
          // commentlist:[],
          message:''
        }),
      computed:{
        // reversedComments(){return this.commentlist.reverse()},
        commentlist() { return this.$store.state.comment.all },
      },
      methods:{

          sumbitmessage(){
            let comment = {
              body: this.message
            }
            // this.commentlist.push(comment) ;
            // this.$store.commit('addComment', comment) // mutations
            this.$store.dispatch({ type: 'addcomment', comment })  //actions
            this.message = ''

          }
      }
    }
</script>

<style scoped>
  .bottom {
    display: flex;
    flex-grow: 1;
    background-color: rgba(240, 240, 240, .5);
  }
  .comment-box {
    background-color: #fff;
    width: 400px;
    min-height: 30vh;
    margin: 20px auto;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  }
</style>
