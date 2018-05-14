import axios from "axios"
import supplier from '../api/api-supplier'

const state = {
  supplierlist: [],
  goodstypelist:[],
  brokerlist:[],
  cardGroupList:[]
}
const mutations={
  findSupplierList(state, comments) {
    state.supplierlist = comments
  },
  findgoodstypeList(state, comments) {
    state.goodstypelist = comments
  },
  getbrokerList(state, comments) {
    state.brokerlist = comments
  },
  getVipCardGroupListByVipId(state,comments){
    state.cardGroupList=comments
  }
}
const actions={

  findSupplierList({ commit },  {comment} ) {
    supplier.findSupplierList(comment).then(function (ret) {
      if(ret.code==0){
        let comments= ret.data.list;
        commit('findSupplierList',comments)
      }
    })
  },
  findgoodstypeList({ commit },  {comment} ) {
    supplier.findgoodsType(comment).then(function (ret) {
      if(ret.code==0){
        let comments= ret.data;
        commit('findgoodstypeList',comments)
      }
    })
  },
  getbrokerList({ commit },  {comment} ) {
    supplier.getbrokerList(comment).then(function (ret) {
      if (ret.code == 0) {
        let comments = ret.data;
        commit('getbrokerList', comments)
      }
    })
  },
  getVipCardGroupListByVipId({ commit } ) {
    supplier.getVipCardGroupListByVipId().then(function (ret) {
      if (ret.code == 0) {
        let comments = ret.data;
        commit('getVipCardGroupListByVipId', comments)
      }
    })
  },
}

export default {
  state,mutations,actions
}
