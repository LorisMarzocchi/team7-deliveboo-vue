import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./pages/AppHome.vue";
import AppAbout from "./pages/AppAbout.vue";
import AppCart from "./pages/AppCart.vue";
import App404 from "./pages/App404.vue";
import AppMenu from "./pages/AppMenu.vue";
import AppContact from "./pages/AppContact.vue";
import AppProductDetails from "./pages/AppProductDetails.vue";
import AppThankYou from "./pages/AppThankYou.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/about",
      name: "about",
      component: AppAbout,
    },
    {
      path: "/contact",
      name: "contact",
      component: AppContact,
    },
    {
      path: "/menu",
      name: "menu",
      component: AppMenu,
    },
    {
      path: "/details/:slug",
      name: "details",
      component: AppProductDetails,
    },
    {
      path: "/cart",
      name: "cart",
      component: AppCart,
    },
    {
      path: "/thankYou",
      name: "thankYou",
      component: AppThankYou,
    },
    //la 404 deve sempre stare per ultima
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: App404,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export { router };
