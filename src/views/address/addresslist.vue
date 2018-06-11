<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane  name="1">
      <span slot="label">发货地址</span>
    </el-tab-pane>
    <el-tab-pane label="收货地址" name="2">
    </el-tab-pane>
    <el-button type="primary" size="small" style="margin-bottom: 10px;" @click="gomap">新 增</el-button>
    <el-table
      :data="getAddresslist"
      border
      style="width:100%">
      <el-table-column  width="50" label="#">
        <template slot-scope="scope" >
          {{(page.pageNum-1)*page.pageSize+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="company"
        :label="activeName==1?'供应商单位':'收货单位'"  >
      </el-table-column>
      <el-table-column
        prop="name"
        :label="activeName==1?'发货人':'收货人'" >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话	" >
      </el-table-column>
      <el-table-column
        prop="address"
        label="详细地址	" >
      </el-table-column>

      <el-table-column label="是否默认	" width="150" >
        <template slot-scope="scope">
          {{scope.row.def==1?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column  label="操作" >
        <template slot-scope="scope" style="text-align: center">
          <el-button v-if="scope.row.def==0" type="text" size="small"
                     @click="setdefault(scope.row)">设为默认</el-button>
          <el-button type="text" size="small"
                     @click="editaddress(scope.row)">编辑</el-button>
          <el-button type="text" size="small"
                     @click="deladdress(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="page.pageNum"-->
      <!--:page-sizes="[10, 20, 30, 40]"-->
      <!--:page-size="page.pageSize"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="page.total">-->
    <!--</el-pagination>-->
  </el-tabs>
</template>

<script>
  import userapi from '../../api/user-service'
    export default {
        name: "addresslist",
        data() {
          return {
            activeName: sessionStorage.getItem('addretype')|| '1',
            page:{
              pageNum: 1,
              pageSize:10,
              total:0
            }
          };
        },
        created: function () {
          this.getlist();
        },
        computed: {
          getAddresslist() {
            let ret = this.$store.state.userservice.address;
            if (ret) {
              if (ret.code == 0) {
                this.page.total = ret.total;
                return ret.data;
              } else {
                this.$message({
                  showClose: true,
                  message: ret.msg,
                  type: 'error'
                });
                return [];
              }
            }
          }
        },
        methods: {
          handleClick(tab, event) {
            this.activeName=tab.name
            this.getlist()
            // sessionStorage.setItem('addretype',tab.name)

          },
          getlist(){
            let comment ={page:this.page.pageNum,pageSize:1000,type:this.activeName} ;
            this.$store.dispatch({ type: 'getAddresslist',comment})
            //   ...mapActions(['getAddresslist'])


          },
          gomap(){
            sessionStorage.setItem('addretype',this.activeName)
            this.$router.push({path:'/address/map/address/0'})
          },
          deladdress(index,row){
            let self=this;
            this.$confirm(`<div style="text-align: center">是否删除该地址？</div>`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true
              // center: true
              // type: 'warning'
            }).then(() => {
              userapi.delAddress({id:row.id}).then(function (ret) {
                if(ret.code==0){
                  self.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  self.getlist()
                }else{
                  self.$message.error(ret.msg)
                }
              })
            }).catch(() => {
              self.$message({
                type: 'info',
                message: `已取消删除`
              });
            });

          },
          editaddress(row){
            sessionStorage.setItem('addretype',this.activeName)
            sessionStorage.setItem('address',JSON.stringify(row) )
            this.$router.push({path:'/address/map/address/'+row.id})
          },
          setdefault(row){
            userapi.setDefault({id:row.id,type:row.type}).then(ret=>{
              if(ret.code==0){
                this.$message({
                  message: '设为默认地址成功',
                  type: 'success'
                });
                this.getlist()
              }else{
                this.$message.error(ret.msg);
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
