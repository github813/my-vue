import axios from "axios"
import userapi from '../api/user-service'

const state = {
  supplierlist: [],
  goodstypelist:[],
  goodstyperet:null,
  brokerlist:[],
  cardGroupList:[],
  address:null,
  contactlist:[],
  inspectorList:[],
}
const mutations={
  findSupplierList(state, comments) {
    state.supplierlist = comments
  },
  findgoodstypeList(state, comments) {
    state.goodstyperet = comments
    if(comments.code==0){
      state.goodstypelist = comments.data
    }
  },
  getbrokerList(state, comments) {
    state.brokerlist = comments
  },
  getVipCardGroupListByVipId(state,comments){
    state.cardGroupList=comments
  },
  getAddresslist(state, comments) {
    state.address = comments

  },
  getcontactListt(state, comments) {
    state.contactlist = comments

  },
}
const actions={

  findSupplierList({ commit },  {comment} ) {
    userapi.findSupplierList(comment).then(function (ret) {
      if(ret.code==0){
        let comments= ret.data.list;
        commit('findSupplierList',comments)
      }
    })
  },
  findgoodstypeList({ commit },  {comment} ) {
    userapi.findgoodsType(comment).then(function (ret) {
      let comments= ret;
      commit('findgoodstypeList',comments)
    })
  },
  getbrokerList({ commit },  {comment} ) {
    userapi.getbrokerList(comment).then(function (ret) {
      if (ret.code == 0) {
        let comments = ret.data;
        commit('getbrokerList', comments)
      }
    })
  },
  getVipCardGroupListByVipId({ commit } ) {
    userapi.getVipCardGroupListByVipId().then(function (ret) {
      if (ret.code == 0) {
        let comments = ret.data;
        commit('getVipCardGroupListByVipId', comments)
      }
    })
  },
  getAddresslist({ commit } ,  {comment} ) {
    userapi.getAddresslist(comment).then(function (ret) {
      if (ret.code == 0) {
        let comments = ret
        commit('getAddresslist', comments)
      }
    })
  },
  getContactList({ commit } ,  {comment} ) {
    debugger;
    userapi.getcontactList(comment).then(function (ret) {
      if (ret.code == 0) {
        let comments = ret.data
        commit('getcontactList', comments)
      }
    })
  },
}

export default {
  state,mutations,actions
}
