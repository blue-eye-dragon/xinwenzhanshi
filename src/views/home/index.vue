<template>
  <el-container class="container-home">
    <el-aside  class="my-aside" :width="isOpen?'200px':'64px'">
      <div class="top" :class="{min:!isOpen}"></div>
      <el-menu
        default-active="1"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">內容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span @click="toggleMenu()" class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育公司</span>
        <el-dropdown class="my-dropdown" @command="handClick">
          <span class="el-dropdown-link">
            <img class="head" :src="photo" alt />
            <strong class="name">{{name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="delUser">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="my-main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: "Home",
  data() {
      return {
        isOpen:'true',
        name:'',
        photo:'',
      }
  },
  created () {
    const user = auth.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
      toggleMenu(){
          this.isOpen = ! this.isOpen
      },
      handClick(command){
        if (command == 'setting') {
          this.$router.push('/setting')
        }
        if(command == 'delUser'){
          auth.delUser()
          this.$router.push('/login')
        }
      }
  },
};
</script>

<style lang="less">
.container-home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .my-aside {
    background: #002233;
    .top{
        width:100%;
        height:60px;
        background: url(../../assets/logo_admin.png) no-repeat center / 140px auto  ;
    }
    .min{
        background-image:url(../../assets/logo_admin_01.png);
        background-size: 36px auto ;
    }
  }
  .my-header {
    border-bottom: 1px solid #f6f6f6;
    line-height: 60px;
    .text {
      margin-left: 10px;
    }
    .my-dropdown {
      float: right;
      margin-right: 20px;
      .head {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
}
</style>