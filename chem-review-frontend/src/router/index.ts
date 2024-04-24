import { createRouter, createWebHistory } from "vue-router";

import { ROUTE_NAMES } from "./meta/route.names";

import { authGuard } from './middlewares/auth.middlewares';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/AppLayout.vue"),
      name: ROUTE_NAMES.HOME.ROOT,
      redirect: "/home",
      meta: {
        protected: true,
      },
      children: [
        {
          path: "home",
          component: () => import("@/views/PageHome.vue"),
        },
        {
          path: "saved",
          component: () => import("@/views/PageSaved.vue"),
        },
        {
          path: "calculate",
          component: () => import("@/views/Calculate/PageRoot.vue"),
          children: [
            {
              path: '',
              component: () => import("@/views/Calculate/PageChoose.vue"),
              name: ROUTE_NAMES.CALULATE.CHOOSE,
            },
            {
              path: 'single',
              component: () => import("@/views/Calculate/PageSinglePrediction.vue"),
              name: ROUTE_NAMES.CALULATE.SINGLE,
            },
            {
              path: 'file',
              component: () => import("@/views/Calculate/PageFilePrediction.vue"),
              name: ROUTE_NAMES.CALULATE.FILE,
            }
          ]
        },
      ],
    },
    {
      path: "/auth",
      component: () => import("@/layouts/AuthLayout.vue"),
      children: [
        {
          path: "registrate",
          component: () => import("@/views/Auth/PageRegister.vue"),
          name: ROUTE_NAMES.AUTH.REGISTER,
        },
        {
          path: "login",
          component: () => import("@/views/Auth/PageLogin.vue"),
          name: ROUTE_NAMES.AUTH.LOGIN,
        },
      ],
    },
  ],
});

router.beforeEach(authGuard);

export default router;
