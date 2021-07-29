import Vue from "vue";
import vuex from "@/store/index";
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
        beforeEnter: (_to, _from, next) => {
          vuex.commit("LOGOUT");
          next();
        },
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
      {
        name: "NewConsultorio",
        path: "/new-consultorio",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Initial/SelectConsultorio.vue"
          ),
      },
    ],
  },
  {
    name: "Main",
    path: "/main",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Main/Main.vue"),
    children: [
      {
        name: "Doencas",
        path: "/doencas",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Main/body/Doencas.vue"
          ),
      },
      {
        name: "Objetivos",
        path: "/objetivos",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Main/body/Objetivos.vue"
          ),
      },
      {
        name: "Refeicoes",
        path: "/refeicoes",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Main/body/Refeicoes.vue"
          ),
      },
      {
        name: "Dados",
        path: "/dados",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Main/body/Dados.vue"
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
