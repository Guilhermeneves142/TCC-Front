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
      import(/* webpackChunkName: "about" */ "@/views/Initial/Initial.vue"),
    children: [
      {
        name: "Login",
        path: "/login",
        beforeEnter: (_to, _from, next) => {
          vuex.commit("LOGOUT");
          next();
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/Initial/Login.vue"),
      },
      {
        name: "NewUser",
        path: "/new-user",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/Initial/NewUser.vue"),
      },
      {
        name: "NewConsultorio",
        path: "/new-consultorio",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Initial/SelectConsultorio.vue"
          ),
      },
    ],
  },
  {
    name: "Main",
    path: "/main",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Main/Main.vue"),
    children: [
      {
        name: "Doencas",
        path: "doencas",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/Doencas.vue"
          ),
        children: [
          {
            name: "NewDoenca",
            path: "new",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Doenca/DoencaForm.vue"
              ),
          },
          {
            name: "EditDoenca",
            path: ":id",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Doenca/DoencaForm.vue"
              ),
          },
        ],
      },
      {
        name: "Objetivos",
        path: "objetivos",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/Objetivos.vue"
          ),
        children: [
          {
            name: "NewObjetivo",
            path: "new",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Objective/ObjectiveForm.vue"
              ),
          },
          {
            name: "EditObjetivo",
            path: ":id",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Objective/ObjectiveForm.vue"
              ),
          },
        ],
      },
      {
        name: "Refeicoes",
        path: "refeicoes",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/Refeicoes.vue"
          ),
        children: [
          {
            name: "NewRefeicao",
            path: "new",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Refeicao/RefeicaoForm.vue"
              ),
          },
          {
            name: "EditRefeicao",
            path: ":id",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Refeicao/RefeicaoForm.vue"
              ),
          },
        ],
      },
      {
        name: "Dados",
        path: "/dados",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/Main/body/Dados.vue"),
      },
      {
        name: "Atendimento",
        path: "/atendimento",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/Atendimento.vue"
          ),
      },
      {
        name: "Paciente",
        path: "/paciente",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/Paciente.vue"
          ),
        children: [
          {
            name: "NewPaciente",
            path: "new",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Paciente/PacienteForm.vue"
              ),
          },
          {
            name: "EditPaciente",
            path: ":id",
            props: true,
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/Paciente/PacienteForm.vue"
              ),
          },
        ],
      },
      {
        name: "Alimento",
        path: "/alimento",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/Alimento.vue"
          ),
      },
      {
        name: "Agenda",
        path: "/agenda",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/Agenda.vue"
          ),
      },
      {
        name: "PlanoAlimentar",
        path: "/plano-alimentar",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/Main/body/PlanoAlimentar.vue"
          ),
        children: [
          {
            name: "NewPlanoAlimentar",
            path: "new",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/components/modals/PlanoAlimentar/PlanoAlimentarForm.vue"
              ),
          },
        ],
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
