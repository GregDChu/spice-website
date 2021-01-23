import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Staff from "./views/Staff.vue"
import PastOrders from "./views/PastOrders.vue";
import Shop from "@/views/Shop.vue";
import BannerEdit from "./views/BannerEdit.vue";
import SpiceManage from "./views/SpiceManage.vue";
import OrderPlaced from "./views/OrderPlaced.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/manage/staff",
      name: "staff",
      component: Staff
    },
    {
      path: "/Shop/:item?",
      name: "Shop",
      component: Shop,
      props: true,
      ref: "shopview"
    },
    {
      path: "/complete",
      name: "complete",
      component: OrderPlaced
    },
    {
      path: "/manage/orders",
      name: "orders",
      component: PastOrders
    },
    {
      path: "/manage/banner",
      name: "banner",
      component: BannerEdit
    },
    {
      path: "/spices/:spice?",
      name: "spices",
      component: SpiceManage,
      props: true
    },
    {
      path: "/myaccount",
      name: "myaccount",
      component: () =>
        import("./views/CAccount.vue")
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () =>
        import("./views/Checkout.vue")
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: () =>
        import("./views/Confirmation.vue")
    }
  ]
});
