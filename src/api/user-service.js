import * as API from './'
let base='/user-service';
export default {
  //
  findSupplierList: params => {
    return API.GET(`${base}/vip/supplier/findSupplierList`, params)
  },
  //品类-获取列表
  findgoodsType:params=>{
    return API.GET(`${base}/vip/goodsType/list`, params)
  },
  //品类- 添加
  addgoodsType:name=>{
    let params =  new FormData();
    params.append('name',name);
    return API.POST(`${base}/vip/goodsType`, params)
  },

  //品类-修改状态
  updategoodsTypeStatus:params=>{
    return API.POST(`${base}/vip/goodsType/updateStatus`, params)
  },
  //品类- 删除
  delgoodsType:params=>{
    return API.DELETE(`${base}/vip/goodsType`, params)
  },
  //获取信息部
  getbrokerList:params=>{
    return API.GET(`${base}/vip/broker/list`, params)
  },
//获取消费卡组合
  getVipCardGroupListByVipId:()=>{
    return API.GET(`${base}/card/group/getVipCardGroupListByVipId`, null)
  },
  //获取地址
  //GET /user-service/owner/address/findList
  getAddresslist:params=>{
    return API.GET(`${base}/owner/address/findList`, params)
  },
//  新增地址
  addAddress:params=>{
    return API.POST(`${base}/owner/address/saveDTO`, params)
  },
//  PUT /user-service/owner/address
  updateAddress:params=>{
    return API.PUT(`${base}/owner/address`, params)
  },
//  删除地址
  delAddress:params=>{
    return API.DELETE(`${base}/owner/address`, params)
  },
// 设为默认
  setDefault:params=>{
    return API.PUT(`${base}/owner/address/setDefault`, params)
  },
//   获取地址联系人列表 1发货人2收货人3质检员
  getcontactList:params=>{
    return API.GET(`${base}/owner/address/contactList`, params)
  },
//  添加联系人
  saveContact:params=>{
    return API.POST(`${base}/owner/address/saveContact`, params)
  },
//  删除联系人
  deleteContact:params=>{
    return API.DELETE(`${base}/owner/address/deleteContact`, params)
  },
//  设为竹联系人
  setMainContact:params=>{
    return API.POST(`${base}/owner/address/setMain`, params)
  },
}
