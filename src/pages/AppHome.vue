<script>
import axios from "axios";
import { store } from "../store";
import AppRestaurant from "../components/AppRestaurant.vue";
import AppCategorySelector from "../components/AppCategorySelector.vue";
import AppJumbo from "../components/AppJumbo.vue";
import AppLoader from "../components/AppLoader.vue";

export default {
  components: { AppRestaurant, AppCategorySelector, AppJumbo, AppLoader },
  data() {
    return {
      // Store
      store,
      // Categorie
      arrCategory: [],
      category: null,
      // Ristoranti
      arrRestaurants: [],
      restaurants: null,
      // Paginatore
      currentPage: 1,
      nPages: 0,
      loader: false,
      noResults: false,
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      window.scrollTo(0, 400);
    },
    nextPage(page) {
      if (this.currentPage >= this.nPages) {
        this.currentPage = page;
      }
      this.currentPage++;
    },
    previousPage(page) {
      if (this.currentPage <= 1) {
        this.currentPage = page;
      }
      this.currentPage--;
    },
    getCategory() {
      axios.get("http://localhost:8000/api/categories").then((response) => {
        this.arrCategory = response.data.results;
      });
    },
    getRestaurants() {
      this.loader = true;
      const params = {
        page: this.currentPage,
      };
      if (this.category && this.category.length > 0) {
        params.category_id = this.category;
      }

      axios
        .get(this.store.baseUrl + "api/restaurants", { params })
        .then((response) => {
          const resultsData = response.data.results.data;
          if (resultsData.length) {
            this.arrRestaurants = resultsData;
            this.loader = false;
          } else {
            this.arrRestaurants = [];
            this.loader = false;
            this.noResults = true;
          }
          this.nPages = response.data.results.last_page;
        });
    },
    refreshFilter() {
      if (this.arrRestaurants.length === 0) {
        this.noResults = false;
      }
    },
  },
  created() {
    this.getCategory();
    this.getRestaurants();
  },
  watch: {
    currentPage() {
      this.getRestaurants();
    },
    category: {
      deep: true,
      handler() {
        this.getRestaurants();
      },
    },
  },
};
</script>

<template>
  <AppJumbo />
  <div class="container mx-auto">
    <h1 class="text-4xl lg:text-5xl text-center font-bold text-secondary my-3">
      Ristoranti
    </h1>
    <!-- filtro categorie  -->
    <AppCategorySelector
      :categories="arrCategory"
      @filtered="category = $event"
      @resetFilter="refreshFilter"
    />

    <!-- filtro senza risultati  -->
    <div v-if="noResults" class="flex flex-col items-center p-20">
      <div class="flex items-center gap-8">
        <div class="text-2xl text-primary font-bold mb-4">
          NON CI SONO RISULTATI PER LA RICERCA
        </div>
        <img
          src="../../public/img/cryng-pizza.jpg"
          alt="not-found"
          class="h-24 md:h-40"
        />
      </div>
    </div>

    <!-- ristoranti  -->
    <div
      v-else
      class="mt-5 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AppRestaurant
        v-for="restaurant in arrRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>

    <!-- paginator -->
    <nav
      class="pl-4 md:pl-6 lg:pl-4 mb-3 py-3"
      aria-label="Page navigation example"
    >
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li class="rounded-full">
          <button
            class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-b_hover bg-primary_hover border border-prbg-primary_hover hover:bg-primary shadow-md rounded-full"
            @click="previousPage(page)"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        <li v-for="page in nPages" :key="page">
          <button
            class="flex items-center justify-center px-4 h-10 leading-tight text-b_hover border border-prbg-primary_hover hover:bg-primary shadow-md rounded-full"
            :class="{
              'bg-primary': page == currentPage,
              'bg-primary_hover': page !== currentPage,
            }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li @click="nextPage(page)">
          <button
            class="flex items-center justify-center px-4 h-10 leading-tight text-b_hover bg-primary_hover border border-prbg-primary_hover hover:bg-primary shadow-md rounded-full"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>

    <AppLoader v-if="loader" />
  </div>
</template>

<style></style>
