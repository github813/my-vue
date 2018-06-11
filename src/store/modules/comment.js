import axios from "axios"


const state = {
  all: [] 
}
const mutations={
  //同步操作、不可使用外部链接
  addComment(state,comment){
    state.all.push(comment);
  },
  loadComment(state, comments) {
    state.all = comments
    // console.log(state.all)
  }
}
const actions={
  // addComment ({ commit }, { comment }) {
  //   commit('addComment', comment)
  // },
  loadcomments({ commit }){
    var url='http://localhost:3008/comments'
     // axios.get(url).then(res=>{
     //   let comments=res.data;
     //   commit('loadComment',comments)
     // })
  },
  addcomment ({ commit }, { comment }) {
    var url='http://localhost:3008/comments'
    const { body } = comment
    // axios.post(url,{body}).then(res=>{
    //   // console.log("res:data",res.data)
    //   const comment = res.data
    //   commit('addComment', comment)
    //
    // })
  }


}

export default {
  state,mutations,actions
}
