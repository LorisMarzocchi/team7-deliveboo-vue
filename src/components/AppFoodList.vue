<script>
import axios from "axios";
import { store } from "../store";
import { RouterLink } from "vue-router";
import AppLoader from "./AppLoader.vue";
import AppAlert from "./AppAlert.vue";
import AppPurchaseResume from "./AppPurchaseResume.vue";

export default {
  data() {
    return {
      store,
      products: [],
      productsCart: JSON.parse(localStorage.getItem("cart")) || [],
      restaurantId: null,
      notAllowed: false,
      showAlert: false,
      resume: false,
      loading: false,
      timer: null,
    };
  },
  methods: {
    getProducts() {
      this.loading = true;
      axios
        .get(store.baseUrl + "api/products", {
          params: {
            restaurant_id: this.restaurantId,
          },
        })
        .then((response) => {
          this.products = response.data.results.data;
          this.loading = false;
        });
    },

    getProductInfo(product) {
      // console.log("Current restaurantId:", this.restaurantId);
      // console.log("Product restaurantId:", product.restaurantId);
      // console.log("Current productsCart:", this.productsCart);
      // Se il carrello è vuoto o contiene prodotti dello stesso ristorante
      if (
        this.productsCart.length === 0 ||
        this.productsCart[0].restaurant_id === this.restaurantId
      ) {
        let newProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          qnt: 1,
          restaurant_id: this.restaurantId,
          url_image: product.url_image,
        };
        if (this.productsCart.some((item) => item.id === newProduct.id)) {
          const obj = this.productsCart.find(
            (item) => item.id === newProduct.id
          );
          obj.qnt++;
        } else {
          this.productsCart.push(newProduct);
        }
        let cartStr = JSON.stringify(this.productsCart);
        localStorage.setItem("cart", cartStr);
        this.notAllowed = false; // Resetta il flag di errore
      } else {
        this.notAllowed = true;
        this.showAlert = true;
      }
    },
    alert() {
      this.showAlert = false;
    },
    handleProductButtonClick(product) {
      this.getProductInfo(product);
      if (
        this.productsCart.length === 0 ||
        this.productsCart[0].restaurant_id === this.restaurantId
      ) {
        if (this.timer) {
          // Se il timer è già stato avviato, annullalo
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.resume = true;
        // Avvia il timer nuovamente
        this.timer = setTimeout(() => {
          this.resume = false;
          this.timer = null;
        }, 8000);
      }
    },
    closeResume() {
      this.resume = false;
    },
    getImageUrl(image) {
      return image
        ? this.store.baseUrl + "storage/" + image
        : this.store.baseUrl + "storage/uploads/products/non-disponibile.jpg";
    },
  },
  created() {
    this.restaurantId = sessionStorage.getItem("restaurant_id");
    this.getProducts();
  },
  components: { RouterLink, AppLoader, AppAlert, AppPurchaseResume },
};
</script>

<template>
  <div class="container mt-[5.5rem] py-8 px-4 md:px-0">
    <AppAlert v-show="this.showAlert" @closeAlert="alert" />

    <h1 class="text-4xl text-center font-bold text-secondary pb-8">
      Il nostro Menù
    </h1>
    <AppLoader v-if="loading" />

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        v-for="product in products"
      >
        <img
          :src="getImageUrl(product.url_image)"
          :alt="product.name"
          class="object-cover w-full rounded-t-lg h-[250px] md:w-full md:rounded-none md:rounded-l-lg"
        />
        <!-- <img -->
        <!-- class="object-cover w-full rounded-t-lg h-96 md:h-48 lg:h-full md:w-full md:rounded-none md:rounded-l-lg" -->
        <!-- src="https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg" -->
        <!-- alt="ristorante" -->
        <!-- /> -->
        <div class="grid grid-cols-1 justify-between p-4 leading-normal">
          <div>
            <h5
              class="mb-2 text-2xl md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900"
            >
              {{ product.name }}
            </h5>
            <h5
              class="mb-2 text-xl font-semibold tracking-tight text-secondary"
            >
              € {{ product.price }}
            </h5>
          </div>
          <button
            @click="handleProductButtonClick(product)"
            class="text-white text-sm bg-secondary hover:text-primary px-0 py-1 rounded-md shadow-md mb-2"
          >
            <i class="fa-solid fa-cart-arrow-down"></i>
            Aggiungi al carrello!
          </button>

          <RouterLink
            :to="{ name: 'details', params: { slug: product.slug } }"
            class="text-white text-center text-sm bg-primary hover:text-secondary px-0 py-1 rounded-md shadow-md"
          >
            Dettagli prodotto
          </RouterLink>
        </div>
      </div>
    </div>
    <div>
      <AppPurchaseResume
        v-show="resume"
        :productsResume="productsCart"
        @closeResume="closeResume"
      />
    </div>
  </div>
</template>

<style scoped></style>
