<style >
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ivu-modal{
    top: 0;
  }
</style>
<template>
  <div class="layout" id="homestage">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">

            <Menu-item  name="4">
              <Icon type="ios-paper"></Icon>
              <span @click="modal1 = true">退出</span>
            </Menu-item>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']" @on-select="(key) => selectMenu(key)">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                权限管理
              </template>
              <Menu-item name="1-1">用户管理</Menu-item>
              <Menu-item name="1-2">栏目管理</Menu-item>
              <Menu-item name="1-3">角色管理</Menu-item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <Menu-item name="2-1">Option 1</Menu-item>
              <Menu-item name="2-2">Option 2</Menu-item>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <Menu-item name="3-1">Option 1</Menu-item>
              <Menu-item name="3-2">Option 2</Menu-item>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <!--<Breadcrumb :style="{margin: '24px 0'}">
            <template>
              <Button type="info" @click="modalAddUser = true">新增</Button>
              <Button type="success" @click="updateuser">修改</Button>
              <Button type="warning" @click="deleteuser">删除</Button>
            </template>
          </Breadcrumb>
          <template>
            <Modal
              title="新增"
              v-model="modalAddUser" footer-hide="true"
              class-name="vertical-center-modal">
              <addUser v-on:childerChanged="parentAddUser" ></addUser>
            </Modal>
          </template>-->
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <template>
              <listuser></listuser>
              <!--<Table stripe border ref="selection" :columns="columns5" :data="dataResult"></Table>-->
            </template>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Modal
      v-model="modal1"
      @on-ok="ok"
      @on-cancel="cancel">
      是否退出登录
    </Modal>
  </div>
</template>
<script>
  import listuser from '@/views/user/listuser.vue';
  export default {
    name: 'homestage',
    data () {
      return {
        modal1: false
      }
    },
    components: {listuser},
    methods: {
      selectMenu(datakey) {

      },ok () {
        localStorage.removeItem("jwtToken");
        this.$router.push({ path: '/login' });
      },
      cancel () {

      }
    }
  }
</script>
