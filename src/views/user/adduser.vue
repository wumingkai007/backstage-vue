<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="用户名" prop="userName">
      <Input v-model="formValidate.userName" placeholder="用户名不能为空"></Input>
    </FormItem>
    <FormItem label="账号" prop="account">
      <Input v-model="formValidate.account" placeholder="账户不能为空"></Input>
    </FormItem>
    <FormItem label="密码" prop="passWord">
      <Input v-model="formValidate.passWord" placeholder="密码不能为空"></Input>
    </FormItem>
    <FormItem label="年龄" prop="age">
      <Input v-model="formValidate.age" placeholder="年龄不能为空"></Input>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="男">男</Radio>
        <Radio label="女">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          userName: '',
          account: '',
          gender: '',
          passWord: '',
          age: ''
        },
        ruleValidate: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '账户不能为空', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          age: [
            { required: true, message: '年龄不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios({
              url: '/sys/user/saveUser',//请求的地址
              method: 'post',//请求的方式
              data: this.formValidate
            }).then(res => {
              if(res.data.code == 200){
                this.$emit("childerChanged");
              }else if(res.data.code == 500){
                this.$Message.error(res.data.msg);
              }
            }).catch(err => {
            });
          } else {
            this.$Message.error('提交失败');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
