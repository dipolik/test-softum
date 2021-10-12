import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
        import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/result",
    name: "Result",

    component: () =>
      import(/* webpackChunkName: "result" */ "../views/Result.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
