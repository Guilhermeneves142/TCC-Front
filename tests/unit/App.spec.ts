import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

Vue.use(Vuetify);
Vue.use(VueRouter);

describe("App.vue", () => {
  test("App is a vue file", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});
