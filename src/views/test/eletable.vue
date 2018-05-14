<template>

  <!--stripe 带有斑马纹 border 带有边框 height-固定高度默认固定表头
    row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态
    :default-sort = "{prop: 'date', order: 'descending'}"    table 中添加属性 prop-绑定默认排序的值
    column
    -->
  <div>
    <p>单选</p>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      :default-sort = "{prop: 'date', order: 'descending'}"
      @current-change="handleCurrentChange"
      border
      style="width: 100%">
      <!--fixed 列固定 fixed-固定在左侧   fixed='right'-固定在右侧  -->
      <el-table-column
        type="index" fixed
        width="50">
      </el-table-column>
      <el-table-column
        sortable
        prop="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column label="配送信息">
        <!--el-table-column 可用于多级表头 合并显示表头-->
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="120">
        </el-table-column>
        <el-table-column label="地址信息">
          <el-table-column
            prop="province"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column

        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.name,scope)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p>多选及全选</p>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column  label="姓名"  width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
        <!--show-overflow-tooltip  单行不换行 多余的内容会在 hover 时以 tooltip 的形式显示出来   -->
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>


  </div>


</template>



<script>
    export default {
        name: "eletable",
        data() {
          return {
            tableData: [{
              date: '2016-05-03',
              name: '王小虎1',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-02',
              name: '王小虎2',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-04',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }],
            currentRow:null,
          multipleSelection: []
          }
        },
      methods:{
        tableRowClassName({row, rowIndex}) {
          // if (rowIndex === 1) {
          //   return 'warning-row';
          // } else if (rowIndex === 3) {
          //   return 'success-row';
          // }
          return '';
        },
        handleClick(name,scope){
          console.log(name);
          console.log(scope);
        },
        setCurrent(row) {
          this.$refs.singleTable.setCurrentRow(row);
          console.log(this.currentRow)
        },
        handleCurrentChange(val) {
          this.currentRow = val;
          console.log(this.currentRow)
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
        },
        formatter(row, column) {
          return row.address;
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        }
      }
    }
</script>

