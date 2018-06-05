<template>
  <div>
    <el-button type="primary" size="small" style="margin-bottom: 10px;" @click="dialogVisible=true">新 增</el-button>
    <el-table
      :data="goodstypelist"
      border
      style="width: 600px">
      <el-table-column  width="50" label="#">
        <template slot-scope="scope" >
          {{(page.pageNum-1)*page.pageSize+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称" >
      </el-table-column>
      <el-table-column label="状态"  >
        <template slot-scope="scope">
          {{scope.row.status==1?"启用":"禁用"}}
        </template>
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updatestatus(scope.$index, scope.row)"> {{scope.row.status==1?"禁用":"启用"}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delgoodsType(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
    <el-dialog
      title="添加品类"
      :visible.sync="dialogVisible"
      width="30%" >
      <el-input v-model="name" maxlength="16" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="additem">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import userapi from '../../api/user-service'
    export default {
        name: "goodstype",
        data(){

            return{
              dialogVisible:false,
              name:'',
              page:{
                pageNum: 1,
                pageSize:10,
                total:0
              }
            }
        },
        created: function () {
          this.getlist();
        },
        computed: {
          goodstypelist(){
            let ret=this.$store.state.userservice.goodstyperet;
            if(ret){
              if(ret.code==0){
                this.page.total=ret.total;
                return ret.data;
              }else{
                this.$message({
                  showClose: true,
                  message: ret.msg,
                  type: 'error'
                });
                return [];
              }
            }
          },

        },
      methods: {
        handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.page.pageSize=val;
          this.getlist()
        },
        handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.page.pageNum=val;
          this.getlist()
        },
        getlist(){
          let comment ={page:this.page.pageNum,pageSize:this.page.pageSize} ;
          this.$store.dispatch({ type: 'findgoodstypeList',comment})
        },
        additem(){
          if(this.name!=''){
            let slef=this;
            userapi.addgoodsType(this.name).then(function (ret) {
              if(ret.code==0){
                slef.dialogVisible=false;
                slef.getlist()
                slef.$message({
                  type: 'success',
                  message: `添加成功！`
                });
              }else{
                slef.$message.error(ret.msg);
              }
            })
          }else {
            this.$message.error('品类名称不可为空！');
          }

        },
        updatestatus(index,row){
          let status=row.status;
          let updatestatus=0;
          let str='禁用';
          if(status==0){
            str='启用'
            updatestatus=1
          }
          let slef=this;
          this.$confirm(`<div style="text-align: center">是否${str}该品类？</div>`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true
            // center: true
            // type: 'warning'
          }).then(() => {
            let param =  new FormData();
            param.append('id',row.id);
            param.append('status',updatestatus);
            userapi.updategoodsTypeStatus(param).then(function (ret) {
               if(ret.code==0){
                 slef.getlist()
                 slef.$message({
                   type: 'success',
                   message: `${str}成功！`
                 });
               }
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: `已取消${str}`
            });
          });
        },
        delgoodsType(index,row){
          let slef=this;
          this.$confirm(`<div style="text-align: center">是否删除该品类？</div>`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true
            // center: true
            // type: 'warning'
          }).then(() => {
            userapi.delgoodsType({id:row.id}).then(function (ret) {
              if(ret.code==0){
                slef.getlist()
                slef.$message({
                  type: 'success',
                  message: `删除成功！`
                });
              }
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: `已取消删除`
            });
          });
        }
      }

    }
</script>

<style scoped>
  .el-pagination{ margin-top: 10px;}
</style>
