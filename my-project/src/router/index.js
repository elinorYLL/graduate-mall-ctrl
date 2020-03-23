import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const routes=[
  {
    name:"product",
    path:"/product",
    component:()=>import("../pages/product")
  },
  {
    path: "*",
    redirect: "/userEdit"
  },
  {
    name:"userEdit",
    path:"/userEdit",
    component:()=>import("../pages/userEdit")
  },
  {
    name:"commentList",
    path:"/commentList",
    component:()=>import("../pages/commentList")
  },
  {
    name:"brands",
    path:"/brands",
    component:()=>import("../pages/brands")
  },
  {
    name:"saleCtrl",
    path:"/saleCtrl",
    component:()=>import("../pages/saleCtrl")
  },
  {
    name:"orderCtrl",
    path:"/orderCtrl",
    component:()=>import("../pages/orderCtrl")
  },
  {
    name:"express",
    path:'/express',
    component:()=>import("../pages/express")
  },
  {
    name:"sendOut",
    path:"/sendOut",
    component:()=>import("../pages/sendOut")
  },
  {
    name:"property",
    path:"/property",
    component:()=>import("../pages/property")
  }
]
export default new Router({
  routes
})
