
<template>
  <div>
    <template>
      <Button type="info" @click="modalAddUser = true">新增</Button>
      <Button type="success" @click="updateuser">修改</Button>
      <Button type="warning" @click="deleteuser">删除</Button>
      <template>
        <Modal
          title="新增"
          v-model="modalAddUser" footer-hide="true"
          class-name="vertical-center-modal">
          <addUser v-on:childerChanged="parentAddUser" ></addUser>
        </Modal>
      </template>
    </template>
    <Table stripe border ref="selection" :columns="columns5" :data="dataResult"></Table>
  </div>
</template>

<script>
  import addUser from '@/views/user/adduser.vue';
  export default {
    name: "listuser",
    components: {addUser},
    data() {
      return {
        modalAddUser: false,
        columns5: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'userName',
            resizable: true,
            width: 180
          },
          {
            title: '账号',
            key: 'account',
            resizable: true,
            width: 180
          },
          {
            title: '年龄',
            key: 'age',
            resizable: true,
            width: 180
          },
          {
            title: '性别',
            key: 'gender'
          },
          {
            title: '账号状态',
            key: 'userStatus'
          }
        ],
        dataResult: []
      }
    },created: function () {
      this.listUser();
    },methods:{
      listUser(){
        this.$axios.get('/api/sys/user/selectListUser').then(res =>{
          if (res.data.code == 200) {
            var dataResult = res.data.data;
            this.dataResult = dataResult;
          } else if (res.data.code == 500) {
            this.$Message.error(res.data.msg);
          }
        }).catch(function (err) {

        })
      },parentAddUser(){
        this.modalAddUser = false;
        this.listUser();
      },
      updateuser(){

      },deleteuser(){
        var userlistData = this.$refs.selection.getSelection();
        var userPush = new Array();
        userlistData.forEach(user =>{
          let idmap = new Object();
          idmap.id = user.userId;
          userPush.push(idmap)
        });
        this.$axios({
          url: '/api/sys/user/deleetListUser',//请求的地址
          headers : {"Content-Type" : "application/json;charset=utf-8"},
          method: 'post',//请求的方式
          data: JSON.stringify(userPush)
        }).then(res => {
          if (res.data.code == 200) {
            this.$Message.success("删除成功");
            this.listUser();
          } else if (res.data.code == 500) {
            this.$Message.error(res.data.msg);
          }

        }).catch(err => {

        });
      }
    }
  }
</script>

