<style >
  @import "./login.less";
</style>
<template>
  <div class="login" id="loginstage">
    <div class="from-wrap">
      <h2>登录</h2>
      <Form ref="loginData" :model="loginData" :rules="ruleValidate" :label-width="80">
        <FormItem label="账号" prop="account">
          <Input type="text" v-model="loginData.account" placeholder="请输入账号"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="loginData.password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem class="form-footer">
          <Button type="primary" @click="handleSubmit('loginData')">Submit</Button>
          <Button type="ghost" @click="handleReset('loginData')" style="margin-left: 8px">Reset</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'loginstage',
    data () {
      return {
        loginData: {
          account:'',
          password:''
        },
        ruleValidate: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (loginData) {
        this.$refs[loginData].validate((valid) => {
          if (valid) {
            this.$axios({
              url: '/login/verify',//请求的地址
              method: 'post',//请求的方式
              data: this.loginData
            }).then(res => {
              if(res.data.code == 200){
                var dataToken = res.data.data.value;
                localStorage.setItem("jwtToken",dataToken);
                this.$router.push({ path: '/home' });
              }else if(res.data.code == 500){
                this.$Message.error(res.data.msg);
              }
            }).catch(err => {
            });
          } else {

          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

