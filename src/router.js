import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./components/Search.vue"),
  },
];

export const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory("/") : createWebHistory("/"),
    routes,
  });
