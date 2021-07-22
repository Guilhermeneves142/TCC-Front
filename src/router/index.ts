import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    name: "Initial",
    path: "",
    redirect: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Initial/Initial.vue"),
    children: [
      {
        name: "Login",
        path: "/login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Initial/Login.vue"),
      },
      {
        name: "NewUser",
        path: "/new-user",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Initial/NewUser.vue"
          ),
      },
    ],
  },
  {
    name: "Main",
    path: "/main",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Main/Main.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
