<template>
  <div>
    <el-table
      :data="cardGroupList"
      border
      style="width: 100%">
      <el-table-column
        label="消费卡组合"
        prop="name">
      </el-table-column>
      <el-table-column
        label="扣款比例" >
        <template slot-scope="scope">{{scope.row.rate+"%"}}</template>
      </el-table-column>
      <el-table-column label="消费卡名称" style="padding: 0">
        <template slot-scope="scope">
          <el-table :show-header="false"
            :data="scope.row.vipCardDTOList"
            style="width: 100%">
            <el-table-column
              prop="name">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="消费卡名称" style="padding: 0">
        <template slot-scope="scope">
          <el-table :show-header="false"
                    :data="scope.row.vipCardDTOList"
                    style="width: 100%">
            <el-table-column
              prop="name">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="消费卡名称" style="padding: 0">
        <template slot-scope="scope">
          <el-table :show-header="false"
                    :data="scope.row.vipCardDTOList"
                    style="width: 100%">
            <el-table-column
              prop="name">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    export default {
        name: "twotable",
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

</style>
