<script>
import { initFlowbite } from "flowbite";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
  mounted() {
    initFlowbite();
  },
};
</script>

<template>
  <header>
    <AppHeader />
  </header>

  <main>
    <router-view></router-view>
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>

<style>
/* .home {
  background-image: url('../public/img/bg-food.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
} */
</style>
