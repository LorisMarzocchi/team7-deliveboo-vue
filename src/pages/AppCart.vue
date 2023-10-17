<script>
import { initFlowbite } from "flowbite";
import { store } from "../store";

export default {
  data() {
    return {
      // store
      store,
      products: [],
      subtotal: null,
      totalPrice: null,
      shipping: 4.9,
    };
  },
  methods: {
    getProductsCart() {
      let productsStr = localStorage.getItem("cart");
      let products = JSON.parse(productsStr);
      if (products) {
        this.products = products;
      } else {
        this.products = [];
      }
    },
    getSubtotal() {
      if (this.products) {
        const subtotal = this.products.reduce(
          (sum, item) => sum + item.price * item.qnt,
          0
        );
        this.subtotal = subtotal;
      } else {
        this.subtotal = 0;
      }
    },
    getTotalPrice() {
      const price = this.subtotal + this.shipping;
      return price;
    },
    restoreCart() {
      localStorage.clear();
      this.getProductsCart();
      this.getSubtotal();
    },
    increaseQnt(index) {
      this.products[index].qnt += 1;
      this.updateCart();
      this.getSubtotal();
    },
    decreaseQnt(index) {
      if (this.products[index].qnt > 1) {
        this.products[index].qnt -= 1;
        this.updateCart();
        this.getSubtotal();
      } else {
        this.products[index].qnt = 1;
      }
    },
    removeCartEle(index) {
      this.products.splice(index, 1);
      this.updateCart();
      this.getProductsCart();
      this.getSubtotal();
      console.log(localStorage);
    },
    // Aggiorna il carrello nel localStorage
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.products));
    },
    getImageUrl(image) {
      return image
        ? this.store.baseUrl + "storage/" + image
        : this.store.baseUrl + "storage/uploads/products/non-disponibile.jpg";
    },
  },
  created() {
    this.getProductsCart();
    this.getSubtotal();
    console.log(this.products);
  },
  mounted() {
    initFlowbite();
  },
};
</script>

<template>
  <!-- component -->
  <h1 class="text-secondary text-3xl text-center font-extrabold mt-28">
    IL MIO CARRELLO
  </h1>
  <div class="flex flex-col md:flex-row h-full px-14 py-7 mt-1">
    <!-- My Cart -->
    <div class="w-full flex flex-col h-fit items-center">
      <!-- Product -->
      <div v-if="this.subtotal !== 0" class="w-4/5 gap-3 flex flex-col">
        <div
          class="flex flex-col p-4 text-lg font-semibold bg-primary shadow-md border rounded-lg"
          v-for="(product, index) in products"
          :key="product.id"
        >
          <div class="flex flex-col md:flex-row gap-3 justify-between">
            <!-- Product Information -->
            <div class="flex flex-col md:flex-row gap-6 items-center">
              <div class="w-28 h-28 rounded-full overflow-hidden">
                <img
                  class="w-full h-full"
                  :src="getImageUrl(product.url_image)"
                  :alt="product.name"
                />
              </div>
              <div class="flex flex-col gap-1 max-w-[300px] text-center">
                <p class="text-lg text-gray-800 font-semibold">
                  {{ product.name }}
                </p>
              </div>
            </div>
            <!-- Price Information -->
            <div class="flex flex-col md:flex-row">
              <div class="self-center text-center md:mr-3 lg:mr-20">
                <p class="text-gray-800 font-normal text-xl md:mb-2">
                  €{{ product.price }}
                </p>
              </div>
              <!-- Remove Product Icon -->
              <div class="self-center mb-2">
                <button @click="removeCartEle(index)">
                  <i class="fa-solid fa-trash text-secondary"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- Product Quantity -->
          <div class="flex flex-row self-center gap-1 md:mt-3 lg:mt-0">
            <button
              class="w-4 h-4 self-center rounded-full border border-secondary"
              @click="decreaseQnt(index)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00A082"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
              </svg>
            </button>
            <input
              type="text"
              readonly="readonly"
              :value="product.qnt"
              class="w-12 h-6 text-center text-gray-900 text-sm outline-none border border-secondary rounded-md"
            />
            <button
              class="w-4 h-4 self-center rounded-full border border-secondary"
              @click="increaseQnt(index)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill=""
                stroke="#00A082"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center">
        <img src="../../public/img/cryng-pizza.jpg" alt="#" class="max-h-80" />
        <h2 class="text-2xl font-semibold mb-2">
          Aggiungi prodotti al carrello!
        </h2>
      </div>
    </div>

    <!-- Purchase Resume -->
    <div
      class="flex flex-col bg-primary_hover w-full md:w-2/3 h-fit gap-4 p-4 rounded-lg mt-8 lg:mt-0"
    >
      <p class="text-b_hover text-xl font-extrabold">Riepilogo Acquisti</p>
      <div
        class="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border border-secondary rounded-sm bg-primary"
      >
        <div class="flex flex-row justify-between">
          <p class="text-dark">
            Subtotale ({{ this.products.length }} Articoli)
          </p>
          <p class="text-end font-bold">€ {{ this.subtotal }}</p>
        </div>
        <hr class="bg-secondary h-[1px] border-t-0" />
        <div class="flex flex-row justify-between">
          <p class="text-dark">Spedizione</p>
          <div>
            <p class="text-end font-bold">€ {{ this.shipping }}</p>
          </div>
        </div>
        <hr class="bg-secondary h-[1px] border-t-0" />
        <div class="flex flex-row justify-between">
          <p class="text-dark">Totale</p>
          <div>
            <p class="text-end font-bold">€ {{ getTotalPrice() }}</p>
          </div>
        </div>
        <div v-if="products.length > 0" class="flex gap-2">
          <RouterLink
            :to="{ name: 'contact' }"
            class="transition-colors text-sm text-center bg-secondary hover:bg-b_hover p-2 rounded-sm w-full text-white text-hover shadow-md"
          >
            <button>CHECKOUT</button>
          </RouterLink>
          <button
            class="block transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md"
            data-modal-target="popup-modal"
            data-modal-toggle="popup-modal"
            type="button"
          >
            SVUOTA CARRELLO
          </button>

          <!-- modal  -->
          <div
            id="popup-modal"
            tabindex="-1"
            class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative w-full max-w-md max-h-full shadow-lg">
              <div
                class="relative bg-b_hover rounded-lg shadow border-2 border-primary"
              >
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                  <svg
                    class="mx-auto mb-4 text-gray-400 w-12 h-12"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#FFC244"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-primary">
                    Sei sicuro di voler svuotare il carrello?
                  </h3>
                  <button
                    @click="restoreCart"
                    data-modal-hide="popup-modal"
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Sono sicuro!
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  >
                    No, cancella
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional CSS if needed */
.object-cover {
  height: 100%;
}

/* .card-sinistra {
  height: 200px;
} */
/* .container-carrello {
    
    width: 450px;
} */
</style>
