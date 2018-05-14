<template>
  <el-container >
    <!--<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"-->
             <!--background-color="#545c64"      text-color="#fff" active-text-color="#ffd04b" >-->
    <el-menu  :default-active="defaultActiveIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
             background-color="#545c64"      text-color="#fff" active-text-color="#ffd04b" router >
      <el-menu-item index="/index" >
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/goods/sendgood">
        <i class="el-icon-menu"></i>
        <span slot="title">发货</span>
      </el-menu-item>
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>学习中</span>
        </template>
        <el-menu-item-group>
          <template slot="title">表格</template>
          <el-menu-item index="/test/eletable">基本表格</el-menu-item>
          <el-menu-item index="/test/mergetable">合并行列</el-menu-item>
          <el-menu-item index="/test/twotable">嵌套表格</el-menu-item>
          <el-menu-item index="/test/expandtable">展开行</el-menu-item>
        </el-menu-item-group>

      </el-submenu>


      <el-menu-item index="/" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>





    </el-menu>

    <el-container>
      <el-header style=" font-size: 12px; line-height: 60px; border-bottom: 1px solid #545c64">

        <el-button  @click.prevent="collapse" v-if="!isCollapse" icon="el-icon-arrow-left"></el-button>
        <el-button  @click.prevent="collapse" v-if="isCollapse" icon="el-icon-arrow-right"></el-button>
        <span style="float: right;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{uname}}</span>
        </span>

      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) .el-submenu{
    width: 200px;
  }
</style>
<script>
  import API from '../api/user-service';

  export default {
        name: "home",

        // props
        data() {
          return {
            // defaultActiveIndex:'/index',
            isCollapse: false
          }
        },
        created: function () {


        },
        computed:{
         uname(){
           let userinfo=JSON.parse(sessionStorage.getItem("userinfo"));
           if(userinfo){
              return  userinfo.name;
           }else {
             return "";
           }
         },
          defaultActiveIndex(){
            return sessionStorage.getItem('url')||'/index'
          }
        },
      methods:{
        collapse: function () {
          this.isCollapse = !this.isCollapse;
        },
        jumpto(url){
          this.defaultActiveIndex=url;

          sessionStorage.setItem('url',url);
          this.$router.push(url);
        },
        handleOpen(key, keyPath) {
          // console.log(key);
          // console.log((keyPath))
        },
        handleClose(key, keyPath) {
          //
        }
      }

    }
</script>
<style>
  body {
    background: #fff;
  }
</style>
<style scoped>
.el-menu{border-color: #545c64;}
</style>
