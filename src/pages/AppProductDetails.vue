<script>
import { store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
      productDetails: [],
    };
  },
  methods: {
    getProductDetails() {
      axios
        .get(this.store.baseUrl + "api/products/" + this.$route.params.slug)
        .then((response) => {
          this.productDetails = response.data.results;
        });
    },
    getImageUrl(image) {
      return image
        ? this.store.baseUrl + "storage/" + image
        : this.store.baseUrl + "storage/uploads/products/non-disponibile.jpg";
    },
  },
  created() {
    this.getProductDetails();
  },
};
</script>

<template>
  <div class="container mx-auto mt-32 mb-8 px-3">
    <RouterLink
      :to="{ name: 'menu' }"
      class="px-6 py-3 text-base font-medium text-center text-white bg-secondary rounded-lg hover:bg-b_hover focus:ring-4 focus:outline-none focus:ring-secondary"
    >
      Torna Indietro
    </RouterLink>
    <div
      class="flex flex-col items-center bg-primary border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl my-8"
    >
      <img
        class="object-cover myImage md:pl-3 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg"
        :src="getImageUrl(productDetails.url_image)"
        :alt="productDetails.name"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-secondary">
          {{ productDetails.name }}
        </h5>
        <p class="mb-3 font-normal text-gray-700">
          {{ productDetails.description }}
        </p>
        <div>
          <h2 class="text-secondary font-semibold">Ingredienti:</h2>
          <p class="mb-3 font-normal text-gray-700">
            {{ productDetails.ingredients }}
          </p>
        </div>
        <div>
          <h2 class="text-secondary font-semibold">Prezzo:</h2>
          <p class="mb-3 font-normal text-gray-700">
            € {{ productDetails.price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myImage {
  width: 250px;
  aspect-ratio: 1/1;
}
</style>
