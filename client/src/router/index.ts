//import store from "@/store";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

// These components are only viewable to logged in users and so are lazy loaded
const Chat = () => import("../views/Chat.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    // beforeEnter: (to, from, next) => {
    //   const s = store.state.auth.user;
    //   debugger;
    //   next();
    // }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
