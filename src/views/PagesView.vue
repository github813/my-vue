<template>
  <div class="pages-view">
    <!--<header-bar @showTalion="open"></header-bar>-->
    <!--<HelloWorld></HelloWorld>-->
    <!--<router-view></router-view>-->
    <!--<talion-view v-show="talion" @closeTalion="close"></talion-view>-->
    <div class="post">
      <post-body :postid="postid"/>
      <comment-box/>
    </div>



  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar'
import HelloWorld from '../components/HelloWorld'
// import TalionView from '../views/TalionView'
import CommentBox from '../components/CommentBox'
import PostBody from '../components/PostBody'
export default {
  name: 'pages-view',
  components: { HeaderBar,HelloWorld,PostBody,CommentBox },
  // data () {
  //   return {
  //     talion: ''
  //   }
  // },
  data:()=>({
    talion: '',
    title:"vue 技巧"
  }),
  methods: {
    open: function () {
      this.talion = 'open'
    },
    close: function () {
      this.talion = ''
    }
  },
  computed:{
    postid(){return this.$route.params.id}
  }
}
</script>

<style scoped>
  .post {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
