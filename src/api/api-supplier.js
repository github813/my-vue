import * as API from './'
let base='/user-service';
export default {
  //
  findSupplierList: params => {
    return API.GET(`${base}/vip/supplier/findSupplierList`, params)
  },
  findgoodsType:params=>{
    return API.GET(`${base}/vip/goodsType/list`, params)
  },
  getbrokerList:params=>{
    return API.GET(`${base}/vip/broker/list`, params)
  },
//  /card/group/getVipCardGroupListByVipId
  getVipCardGroupListByVipId:()=>{
    return API.GET(`${base}/card/group/getVipCardGroupListByVipId`, null)
  }
}
