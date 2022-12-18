import Vue from "vue";
// import VueRouter from "vue-router";
// import VueRouter from "@/myRouter";
import VueRouter from "@/myRouterV2";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/music",
    name: "music",
    component: () =>
      import(/* webpackChunkName: "music" */ "../views/music/Index.vue"),
    children: [
      {
        path: "pop",
        name: "pop",
        component: () =>
          import(/* webpackChunkName: "popMusic" */ "../views/music/Pop.vue"),
      },
      {
        path: "rock",
        name: "rock",
        component: () =>
          import(/* webpackChunkName: "rockMusic" */ "../views/music/Rock.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "*",
    name: "404NotFound",
    component: () => import(/* webpackChunkName: '404' */ "../views/404.vue"),
  },
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

router.beforeEach((to, from) => {
  console.log("beforeEach:", to, from);
});

export default router;
