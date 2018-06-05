<template>
   <div>
       <el-form ref="form" :model="address" label-width="80px">
         <el-row :gutter="10">
           <el-col :span="12">
             <label>{{addressType=='1'?'供应商':'收货'}}单位：</label>
             <el-input v-if="addressType=='2'"
               placeholder="收货单位"
               v-model="address.company">
             </el-input>
             <el-select v-if="addressType=='1'&&!address.supplierId" v-model="supplierId" placeholder="请选择">
               <el-option
                 v-for="(item,index) in supplierlist"
                 :key="item.id"
                 :label="item.supplierName"
                 :value="index">
               </el-option>
             </el-select>
             <span v-if="addressType=='1'&&address.supplierId">{{address.company}}</span>
           </el-col>
           <el-col :span="12">
             <label>地址：</label>
             <el-input
               placeholder="地址" v-model="address.province+address.city+address.county+address.town+address.street" @focus="showmap"    >
             </el-input>
           </el-col>


           <el-col :span="12">
             <label>矿名：</label>
             <el-input v-model="address.address"
               placeholder="矿名"  >
             </el-input>
           </el-col>
           <el-col :span="12">
             <label>是否设为默认地址：</label>
             <el-select v-model="address.def" placeholder="请选择">
               <el-option label="请选择" value="-1"></el-option>
               <el-option label="是" value="1"></el-option>
               <el-option label="否" value="0"></el-option>
             </el-select>
           </el-col>

         </el-row>
       </el-form>
       <el-row :gutter="10">
          <el-col :span="11">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>联系人信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addcontact()">+添加联系人(必填)</el-button>
              </div>
              <el-table border
                        :data="contactList"
                        style="width: 100%">
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号"
                  width="120">
                </el-table-column>
                <el-table-column label="是否为住联系人">
                  <template slot-scope="scope">
                    {{scope.row.main==1?"是":"否"}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button style="padding: 3px 0" type="text" @click="setdefault(scope.$index, scope.row)">{{scope.row.main==1?"":"设为主联系人"}}</el-button>
                    <el-button style="padding: 3px 0" type="text" @click="delcontact(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="11" :offset="1" v-if="addressType=='2'">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>质检员信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="addcontact(3)">+添加质检员(选填)</el-button>
              </div>
              <el-table border  :data="inspectorList"
                        style="width: 100%">
                <el-table-column
                  prop="name"
                  label="姓名" >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号" >
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button style="padding: 3px 0" type="text" @click="delcontact(scope.$index, scope.row,3)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
       <div>
         <el-button @click="goback">取 消</el-button>
         <el-button type="primary" @click="saveDto">保 存</el-button>
       </div>

     <div>


       <el-dialog
         :title="contactdialogTitle"
         :visible.sync="contactdialogVisible"
         width="30%">
         <el-row>
           <el-col :span="24" class="textC">
             <el-input v-model="contact.name" placeholder="请输入联系人名称" ></el-input>
           </el-col>
           <el-col :span="24" class="textC">
             <el-input v-model="contact.phone"  maxlength="11" placeholder="请输入电话号码"></el-input>
           </el-col>

         </el-row>

         <span slot="footer" class="dialog-footer">
            <el-button @click="contactdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sumbitcontact">确 定</el-button>
          </span>
       </el-dialog>
       <el-dialog
         title="选择地址"
         :visible.sync="dialogVisible"
         width="50%"
         :before-close="handleClose">
         <div>当前选择地址:{{addressinfo}}</div>
         <div style="position: relative;">
           <div class="map_region">所在地区：
             <select open id='subDistricts' class="form-control"></select>
             <select open id='subCity' class="form-control"></select>
           </div>
           <div id="myPageTop" style="position: absolute; right: 20px; top: 0; z-index: 999;">
             <input id="keyword" placeholder="请输入关键字" class="el-input__inner"/>
           </div>
           <div id="container" class="mymap"></div>

         </div>
         <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
       </el-dialog>
     </div>
   </div>


</template>

<script>

    import ElRow from "element-ui/packages/row/src/row";
    import userapi from '../../api/user-service'
    export default {
      components: {ElRow},
      name: "addmap",
        data() {
          return {
            dialogVisible:false,
            contactdialogVisible:false,
            contactdialogTitle:'添加联系人',
            type:this.$route.params.type,
            addressType:sessionStorage.getItem('addretype'),
            addressid:this.$route.params.id,
            addressinfo:'',
            options: [{
                value: '-1',
                label: '请选择'
              }, {
                value: '1',
                label: '是'
              }, {
                value: '0',
                label: '否'
              }
            ],
            address: JSON.parse(sessionStorage.getItem('address'))|| {
              "address": "",
              "city": "",
              "company": "",
              "county": "",
              "def": '',
              "latitude":null,
              "longitude": null,
              "name": "",
              "phone": "",
              "province": "",
              "street": "",
              "supplierId": '',
              "town": "",
              "type": parseInt(sessionStorage.getItem('addretype'))
            },
            supplierId:'',
            contactList:[],
            inspectorList:[],
            contact:{},
            contacttype:this.$route.params.type,
            mapaddress:{}
          }
        },
        created: function () {
          let comment = {
            pageNum: 1, pageSize: 500, status: 1
          }
          this.$store.dispatch({type: 'findSupplierList', comment})


        },
        computed: {
          supplierlist() {
            return this.$store.state.userservice.supplierlist;
          },

        },
         mounted(){
           this.getcontact(this.addressType)
           if(this.addressType=='2'){
              this.getcontact(3)
           }

         },
        methods: {
          onSubmit() {
            console.log('submit!');
          },
          showmap(event){
            this.dialogVisible=true;
            let self=this;
            setTimeout(function () {
              self.loadmap()
            },500)


          },
          loadmap(){
            let self=this;
            let mapcity=this.address['city']||'北京市';
            let mapprovince=this.address['province']||'北京市';
            let zxsCitys=["北京市","上海市","天津市","重庆市"];//直辖市
            let ischange=0;
            //初始化地图
            let map = this.map = new AMap.Map("container", {
              // mapStyle: 'amap://styles/5e82a5b7757d00214ead15830af9195a',//样式URL
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              buttonPosition: 'RB',
              resizeEnable: true,
              zoom: 15
            });

            AMap.service('AMap.DistrictSearch', function() {
              //回调函数 实例化DistrictSearch
              let districtSearch = new AMap.DistrictSearch();
              //TODO: 使用districtSearch对象调用行政区查询的功能
              districtSearch.search('中国', function(status, result) {
                // console.log('地区:', result);

                let subDistricts = result.districtList[0].districtList;
                let select  = document.getElementById('subDistricts');
                for (let i = 0; i < subDistricts.length; i += 1) {
                  let name = subDistricts[i].name;
                  let option = document.createElement('option');
                  option.value = option.innerHTML = name;
                  option.dataset['citycode'] = subDistricts[i].citycode;
                  select.appendChild(option);
                }
                select.onchange = function() {
                  map.setZoom(12);
                  map.setCity(this.value);
                  let pro=this.value;
                  $('#subCity').empty();
                  ischange=1;
                  $("#keyword").val('');
                  getCitylist(pro);
                };
                select.value=subDistricts[0].name;
                if(mapprovince!=''){
                  select.value=mapprovince;
                }
                getCitylist(mapprovince);
              })
              let getCitylist= function(pro){
                let select1  = document.getElementById('subCity');
                if(zxsCitys.indexOf(pro)>-1){
                  let option = document.createElement('option');
                  option.value = option.innerHTML = pro;
                  select1.appendChild(option);
                  select1.value=pro;
                  SelectMapCity();
                }else{
                  districtSearch.search(pro, function(status, result) {
                    // console.log('市:', result);
                    let citys = result.districtList[0].districtList;

                    for (let i = 0; i < citys.length; i += 1) {
                      let name = citys[i].name;
                      let option = document.createElement('option');
                      option.value = option.innerHTML = name;
                      option.dataset['citycode'] = citys[i].citycode;
                      select1.appendChild(option);
                    }
                    select1.value=citys[0].name;
                    if(ischange==0&&mapcity!=''){
                      select1.value=mapcity;
                    }
                    SelectMapCity();
                  })
                }
                select1.onchange = function() {
                  SelectMapCity();
                }
              }
              //
              let SelectMapCity=function () {
                let mapcityname=$('#subCity').val().replace('市','');

                Searchmap(mapcityname);
                // map.autocomplete= new AMap.Autocomplete(autoOptions);
                // this.placeSearch.setCity(mapcityname);
              }
            });
            var Searchmap=function (cityname) {
              AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
                let autoOptions = {
                  city: cityname, //城市，默认全国
                  input: "keyword"//使用联想输入的input的id
                };
                map.autocomplete = new AMap.Autocomplete(autoOptions);
                var placeSearch = new AMap.PlaceSearch({
                  city: mapcity.replace('市',''),
                  map: map
                })
                AMap.event.addListener(map.autocomplete, "select", function(e) {

                  //placeSearch.search(e.poi.name);
                  //placeSearch.setCity(e.poi.adcode);
                  //placeSearch.search(e.poi.name);  //关键字查询查询
                  console.log(e);
                  map.setCenter(e.poi.location);
                  map.setZoom(15);
                });
                // $("#subCity").addListener()

              });
            }

            AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {

              var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
              });

              positionPicker.on('success', function(positionResult) {
                self.address.latitude=positionResult.position.lat;
                self.address.longitude=positionResult.position.lng;
                // self.address.address = positionResult.address;
                let addressComponent=positionResult.regeocode.addressComponent
                self.address.province = addressComponent.province;
                self.address.city = addressComponent.city||addressComponent.province;
                self.address.county  = addressComponent.district;
                self.address.town = addressComponent.township;
                self.address.street = positionResult.address.replace(addressComponent.province,'')
                  .replace(addressComponent.city,'')
                  .replace(addressComponent.district,'')
                  .replace(addressComponent.township,'')
                ;
                self.addressinfo=self.address.province+self.address.city+self.address.county+self.address.town+self.address.street
              });
              positionPicker.on('fail', function(positionResult) {
                self.address.latitude='';
                self.address.longitude='';
                self.address.province = '';
                self.address.city = '';
                self.address.county  = '';
                self.address.town = '';
                self.address.street = '';
                self.addressinfo='';
              });
              var onModeChange = function(e) {
                positionPicker.setMode(e.target.value)
              }
              positionPicker.start();
              map.panBy(0, 1);

              // map.addControl(new AMap.ToolBar({
              //   liteStyle: true
              // }))
            });
            AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
              function(){
                map.addControl(new AMap.ToolBar());
                //
                // map.addControl(new AMap.Scale());
                //
                // map.addControl(new AMap.OverView({isOpen:true}));
                if (self.address.latitude&&self.address.longitude) {//存在地址信息，跳转到对应经纬度
                      map.setCenter(new AMap.LngLat(self.address.longitude, self.address.latitude));
                      map.setZoom(15);
                    }
              });

            // });
          },

          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
          addcontact(type){
            if(type){
              this.contacttype=type;
              this.contactdialogTitle='添加质检员'
            }else{
              this.contacttype=this.addressType;
              this.contactdialogTitle='添加联系人'
            }

            this.contactdialogVisible=true;
          },
          sumbitcontact(){
            if(!this.contact.name){
              this.$message.error('联系人名称不可为空');
              return;
            }
            var reg = /^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/;
            var ishavenum=/[0-9]/;
            var num=/^[\d\.]+$/;
            if(reg.test(this.contact.name)){
              this.$message.error('联系人不可输入特殊符号');
              return;
            }else if(ishavenum.test(this.contact.name)){
              this.$message.error('联系人不可输入数字');
              return;
            }
            if(!this.contact.phone){
              this.$message.error('联系人电话不可为空');
              return;
            }
            if(this.contact.phone.length!=11){
              this.$message.error('请输入正确的电话号码');
              return;
            }
            this.contact.type=parseInt(this.contacttype);
            let self=this;
            let ishave=false;
            this.contactList.forEach(function(val, index, arr){
              if(val.phone==self.contact.phone){
                self.$message.error('不能填写相同的联系人电话');
                ishave=true;
                return;
              }
            });

            this.inspectorList.forEach(function(val, index, arr){
              if(val.phone==self.contact.phone){
                self.$message.error('不能填写相同的联系人电话');
                ishave=true;
                return;
              }
            });
            if(ishave){
              return;
            }
            if(this.address.id){
              this.contact.addressId=parseInt(this.addressid)
              this.contact.main=0
              userapi.saveContact(this.contact).then(ret=>{
                if(ret.code==0){
                  this.contact={};
                  this.contactdialogVisible=false;
                  let mag='联系人'
                  if(this.contacttype==3){
                    mag='质检员'
                  }
                  this.$message({
                    message: `${mag}添加成功`,
                    type: 'success'
                  });
                  if(this.contacttype==3){
                    this.getcontact(3)
                  }else{
                    this.getcontact(this.addressType)
                  }
                }else{
                  self.$message.error(ret.msg);
                }
              })
            }else {
              if(this.contacttype==3){
                this.inspectorList.push(this.contact)
                this.contact={};
                this.contactdialogVisible=false;
              }else{
                if(this.contactList.length==0){
                  this.contact.main=1;
                }else{
                  this.contact.main=0;
                }
                this.contactList.push(this.contact)
                this.contact={};
                this.contactdialogVisible=false;
              }
            }


          },
          setdefault(ind,row){
            if(this.addressid>0){
              let param =  new FormData();
              param.append('addressId',parseInt(this.addressid));
              param.append('id',row.id);
              userapi.setMainContact(param).then(ret=>{
                if(ret.code==0){
                  this.$message({
                    message: `设置主联系人成功`,
                    type: 'success'
                  });
                  if(row.type==3){
                    this.getcontact(3)
                  }else{
                    this.getcontact(this.addressType)
                  }
                }else{
                  this.$message.error(ret.msg);
                }
              })
            }else{
              let arr=this.contactList;
              this.contactList=arr.map(function (val, index) {
                if(index==ind){
                  val.main=1;
                }else {
                  val.main=0;
                }
                return val;
              })
            }
          },
          delcontact(index,row,type){
            if(this.addressid>0){
              userapi.deleteContact({id:row.id}).then(ret=>{
                if(ret.code==0){
                  this.$message({
                    message: `删除成功`,
                    type: 'success'
                  });
                  if(row.type==3){
                    this.getcontact(3)
                  }else{
                    this.getcontact(this.addressType)
                  }
                }else{
                  this.$message.error(ret.msg);
                }
              })
            }else{
               if(type){
                 this.inspectorList.splice( index, 1 );
               }else{
                 if(row.main==1){
                   this.$message.error('主联系人不可删除');
                 }else{
                   this.contactList.splice( index, 1 );
                 }

               }
            }
          },
          goback(){
            window.history.go(-1);
          },
          saveDto(){
            if(this.addressType==1){
              if(this.supplierId!=''){
                let index=parseInt(this.supplierId);
                this.address.company=this.supplierlist[index].supplierName;
                this.address.supplierId=this.supplierlist[index].id;
              }
              if(!this.address.supplierId){
                this.$message.error('请选择供应商单位');
                return;
              }
            }
            if(!this.address.company){
              this.$message.error('单位不可为空');
              return;
            }
            if(!this.address.latitude){
              this.$message.error('地址不可为空');
              return;
            }
            if(!this.address.address){
              this.$message.error('矿名不可为空');
              return;
            }
            if(this.contactList.length==0){
              this.$message.error('联系人不可为空');
              return;
            }
            let conlist=[];
            if(this.addressType==2){
              conlist=this.contactList.concat(this.inspectorList)
            }else{
              conlist=this.contactList;
            }
            let self=this;
            this.contactList.forEach(function (val,index) {
              if(val.main==1){
                self.address.phone=val.phone;
                self.address.name=val.name;
              }
            })
            let owneraddress=this.address;
            if(owneraddress.def==''){
              owneraddress.def=0;
            }

            if(this.addressid){
              userapi.updateAddress(this.address).then(ret=>{
                if (ret.code == 0) {
                  self.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  window.history.back();
                }else{
                  self.$message.error(ret.msg);
                }
              })
            }else{
              let dto={
                contactList:conlist,
                ownerAddress:this.address
              };
              userapi.addAddress(dto).then(function (ret) {
                if (ret.code == 0) {
                  self.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  window.history.back();
                }else{
                  self.$message.error(ret.msg);
                }
              })

            }

          },
          getcontact(type){
            let comment2={
              addressId: this.addressid, type:type
            }
            userapi.getcontactList(comment2).then(ret=>{
              if(ret.code==0){
                if(type==3){
                  this.inspectorList=ret.data;
                }else{
                  this.contactList=ret.data;
                }

              }
            })
          }

        }
    }
</script>

<style scoped>
 .el-row label{display: inline-block;}
  .el-input,.el-select{width: 60%;}
 .el-select .el-input{width: 86%;}
 .el-dialog-map{  position: fixed;  }
 .el-col{ margin-bottom: 10px; }
 .mymap{
   width: 90%;
   height: 400px;
   margin: 10px auto;

 }
 .textC{text-align: center;}
  .amap-sug-result{z-index: 9999;}
</style>
