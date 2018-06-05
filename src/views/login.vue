<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
      <el-form-item  prop="name">
        <el-input maxlength="11" v-model="ruleForm.mobile" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item  prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="textcenter">
        <el-button type="primary" @click="submitForm('ruleForm')" class="width100" >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import axios from "axios"
  import md5 from 'js-md5';
  export default {
    name: "login",
    // captcha:["",[Validators.required]],
    // mobile:["",[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
    // platform:[4,[Validators.required]],
    // pwd:["",[Validators.required]]


    data:()=>({
      ruleForm: {
        captcha:'1',
        mobile: '12222222222',
        pwd:'123456',
        platform:4,
      },
      rules: {
        mobile: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 12, message: '请输入正确的用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 12, message: '请输入4到8位', trigger: 'blur' }
        ]
      }
    }),
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.pwd=md5(this.ruleForm.pwd);
            var data=this.ruleForm;

            axios.post('https://api.clxkj.cn:8088/user-service/owner/user/login',data).then(res=>{
              if(res.data.code==0){
                sessionStorage.setItem("userinfo",JSON.stringify(res.data.data));
                this.$router.push('/')

              }else{
                this.$message.error(res.data.msg);
              }
              console.log(res);
            })

          } else {

            return false;
          }
        });
        // this.$router.push('page')
        // 对象
        //  this.$router.push({ path: '/home/first' })
        // 命名的路由
        //  this.$router.push({ name: 'home', params: { userId: wise }})
      }


    }

  }
</script>
<style>
  body {
    background: #DFE9FB;
  }
</style>
<style lang="scss"  scoped>
  .login{
      width: 400px; max-width: 90%; background: #fff;  margin: 160px auto; padding: 30px 20px 10px; border-radius: 5px;
    .width100{width: 100%;}
    .textcenter{text-align: center;}
  }




</style>
