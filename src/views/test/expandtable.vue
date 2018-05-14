<template>
  <div>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="cardGroupList"
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
  </div>
</template>

<script>
  export default {
    name: "expandtable",
    data(){
      return {

      }
    },
    created: function () {

      this.$store.dispatch({ type: 'getVipCardGroupListByVipId'})

    },
    computed: {
      cardGroupList() {
        return this.$store.state.supplier.cardGroupList;
      },

    },
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .el-form-item label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
</style>
