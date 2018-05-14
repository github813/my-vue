<template>
  <!--<carousel interval="3000" type="card"></carousel>-->

  <el-row :gutter="20">

    <el-col :span="24" class="main">
      <el-col :span="12">
        <carousel interval="3000" type="card"></carousel>
      </el-col>
      <el-col :span="12">
        <carousel></carousel>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <!--<img src="../assets/logo.png" class="image" />-->
      <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card  shadow="never">
          <img src="../assets/logo.png" class="image" width="100" />
          <div style="padding: 14px;">
            <span>学习vue+element{{index}}{{o}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-col>
  </el-row>

</template>

<script>
  import carousel from '../components/carousel'
    export default {
        name: "index",
        components:{carousel},
        data(){
          return {
            currentDate: new Date()
          };
        },

    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 80%;
    display: block;
    margin: 0 10%;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
