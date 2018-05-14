<template>
  <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>*货源信息</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    </div>

      <el-form-item label="发货供应商" prop="supplierIndex">
        <el-select v-model="formInline.supplierIndex" placeholder="请选择发货供应商">
          <el-option label="请选择发货供应商" value="-1" disabled></el-option>
          <el-option  v-for="(item, index) in supplierlist"
                      :key="item.id"  :label="item.supplierName"  :value="index">
          </el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="品类名称：" prop="goodsTypeId">
        <el-select v-model="formInline.goodsTypeId" placeholder="请选择品类名称">
          <el-option label="请选择品类名称：" value="-1" disabled></el-option>
          <el-option  v-for="(item, index) in goodstypelist"
                      :key="item.id"  :label="item.name"  :value="index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货物运费" prop="freightPrice">
        <el-input-number v-model="formInline.freightPrice" controls-position="right"  :min="10"  ></el-input-number>
        <span>元/吨</span>
      </el-form-item><br/>
      <el-form-item label="损耗价格：" prop="goodsPrice">
        <el-input-number v-model="formInline.goodsPrice"   controls-position="right"  :min="10"  ></el-input-number>
        <span>元/吨 </span>
      </el-form-item>
      <el-form-item label="最晚接单时间：" prop="endTime">
        <el-date-picker
          v-model="formInline.endTime"
          type="datetime"
          placeholder="选择最晚接单时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最晚装货时间：" prop="latestArrivalTime">
        <el-date-picker
          v-model="formInline.latestArrivalTime"
          type="datetime"
          placeholder="选择最晚装货时间">
        </el-date-picker>
      </el-form-item><br/>
      <el-form-item label="消费卡组合：">
        <el-button @click="dialogVisible = true" >添加消费卡组合</el-button>
      </el-form-item><br/>
      <div>
        <el-table
          :data="multipleSelection"
          style="width: 100%">

          <el-table-column type="expand">
            <template slot-scope="props">
              <div v-for="(card ,index) in  props.row.vipCardDTOList">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="消费卡名称：">
                    <span>{{ card.name }}</span>
                  </el-form-item>
                  <el-form-item label="消费卡类别：">
                    <span>{{ card.type }}</span>
                  </el-form-item>
                  <el-form-item label="发放概率：">
                    <span>{{ card.rate }}</span>
                  </el-form-item>
                </el-form>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            label="消费卡组合"
            prop="name">
          </el-table-column>
          <el-table-column
            label="扣款比例" >
            <template slot-scope="scope">{{scope.row.rate+"%"}}</template>
          </el-table-column>
        </el-table>
      </div>
      <el-form-item label="备注：" >
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}" style="width: 400px;" resize="none"
          placeholder="请输入内容"
          v-model="formInline.remark">
        </el-input>
      </el-form-item><br/>
  </el-card>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="cardGroupList"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-for="(card ,index) in  props.row.vipCardDTOList">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="消费卡名称：">
                  <span>{{ card.name }}</span>
                </el-form-item>
                <el-form-item label="消费卡类别：">
                  <span>{{ card.type }}</span>
                </el-form-item>
                <el-form-item label="发放概率：">
                  <span>{{ card.rate }}</span>
                </el-form-item>
              </el-form>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          label="消费卡组合"
          prop="name">
        </el-table-column>
        <el-table-column
          label="扣款比例" >
          <template slot-scope="scope">{{scope.row.rate+"%"}}</template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
      </span>
    </el-dialog>
  </el-form>

</template>

<script>
    export default {
        name: "sendgood",
        data() {
          return {
            dialogVisible:false,
            formInline: {
              supplierIndex:'',
              goodsTypeId:'',
              freightPrice:'',
              goodsPrice:'',
              latestArrivalTime:'',
              endTime:'',
              remark:''
            },
            rules:{
              supplierIndex:[{ required: true, message: '请选择发货供应商', trigger: 'blur' },],
              goodsTypeId:[{ required: true, message: '请选择品类名称', trigger: 'blur' },],
              freightPrice:[{ required: true, message: '请填写货物运费', trigger: 'blur' },],
              goodsPrice:[{ required: true, message: '请填写选择损耗价格', trigger: 'blur' },],
              endTime:[{ required: true, message: '请选择最晚接单时间', trigger: 'blur' },],
              latestArrivalTime:[{ required: true, message: '请选择最晚装货时间', trigger: 'blur' },]
            },
            multipleSelection: []

          }
        },
        created: function () {
          let comment = {
            pageNum: 1,pageSize:500,status:1
          }
          this.$store.dispatch({ type: 'findSupplierList',comment})
          this.$store.dispatch({ type: 'findgoodstypeList',comment})
          this.$store.dispatch({ type: 'getbrokerList',comment})
          this.$store.dispatch({ type: 'getVipCardGroupListByVipId'})
        },
        computed: {
          supplierlist() {
            return this.$store.state.supplier.supplierlist;
          },
          goodstypelist(){
            return this.$store.state.supplier.goodstypelist;
          },
          brokerList(){
            return this.$store.state.supplier.brokerlist;
          },
          cardGroupList() {
            return this.$store.state.supplier.cardGroupList;
          },
        },
        methods: {
          onSubmit() {
            console.log(this.$refs['formInline'].model.supplierIndex);
            this.$refs['formInline'].validate((valid) => {
              if (valid) {
                alert('submit!');
                console.log(this.$refs['formInline'].model.region)
              } else {
                console.log('error submit!!');
                return false;
              }
            });

          },
          toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
          },
          handleSelectionChange(val) {
            this.multipleSelection = val;
          }
        }
    }
</script>

<style scoped>

</style>
