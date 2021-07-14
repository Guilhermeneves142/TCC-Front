import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    name: "Initial",
    path: "",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Initial/Initial.vue"),
    children: [
      {
        name: "Login",
        path: "/",
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
