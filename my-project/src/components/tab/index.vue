<template>
    <div>
        <el-row class="tac">
  <el-col :span="12">
    <!-- <h5>自定义颜色</h5> -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
         <router-link to="/userEdit">
            <el-menu-item index="1-1">用户列表</el-menu-item>
         </router-link>
          <router-link to="/commentList">
            <el-menu-item index="1-2">用户评论管理</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
        <router-link to="/product">
            <el-menu-item index="2-1">商品列表</el-menu-item>
        </router-link>
          <router-link to="/property">
            <el-menu-item index="2-2">商品属性</el-menu-item>
          </router-link>
           <router-link to="/brands">
             <el-menu-item index="2-3">商品品牌</el-menu-item>
           </router-link>
            
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>运营管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
         <router-link to="saleCtrl">
            <el-menu-item index="3-1">商品销售统计</el-menu-item>
         </router-link>
          <el-menu-item index="3-2">咨询管理</el-menu-item>
          
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <router-link to="/orderCtrl">
               <el-menu-item index="4-1">发货管理</el-menu-item>
          </router-link>
          
          <!-- <el-menu-item index="4-2">发货管理</el-menu-item> -->
        <router-link to="/sendOut">
            <el-menu-item index="4-2">退货管理</el-menu-item>
        </router-link>
          <!-- <el-menu-item index="4-4">配送管理</el-menu-item>
           <el-menu-item index="4-5">退换货管理</el-menu-item> -->
         <router-link to="/express">
             <el-menu-item index="4-3">合作快递公司</el-menu-item>
         </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
    </div>
</template>
<script>
export default {
    name:"CTab",
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
.el-menu{
    overflow: hidden;
    width: 200px;
    height: calc(100vh);
    /* padding-bottom: 15px; */
}
.tac{
  height: 100%;
}
.el-tabs--border-card{
  height: 100%;
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0px !important;
}
</style>