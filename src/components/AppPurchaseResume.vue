<script>
export default {
  data() {
    return {};
  },
  props: {
    productsResume: Array,
  },
  methods: {
    removeCartEle(index) {
      this.productsResume.splice(index, 1);
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.productsResume));
    },
    increaseQnt(index) {
      this.productsResume[index].qnt += 1;
      this.updateCart();
    },
    decreaseQnt(index) {
      if (this.productsResume[index].qnt > 1) {
        this.productsResume[index].qnt -= 1;
        this.updateCart();
      } else {
        this.productsResume[index].qnt = 1;
      }
    },
  },
  created() {},
};
</script>

<template>
  <div
    class="resume h-60 w-[22rem] md:h-48 md:w-[26rem] bg-secondary fixed top-16 right-4 md:top-16 md:right-12 z-50 rounded-lg shadow-lg p-2 text-sm overflow-y-scroll"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-center mb-2 text-md font-semibold text-primary">
        IL TUO ORDINE
      </h2>
      <i
        @click="$emit('closeResume')"
        class="fa-solid fa-xmark p-1 mr-2 mb-1 text-primary_hover hover:bg-b_hover rounded-md cursor-pointer"
      ></i>
    </div>
    <div
      v-for="(product, index) in productsResume"
      class="grid grid-cols-7 text-white font-semibold p-1 mb-1 bg-b_hover rounded-md shadow-sm"
    >
      <span class="col-span-3">{{ product.name }}</span>
      <span class="md:col-span-2 text-center">€ {{ product.price }}</span>
      <div class="inline-block col-span-2 md:col-span-1 ml-10 md:ml-0">
        <i
          @click="decreaseQnt(index)"
          class="fa-solid fa-minus text-xs mr-2 text-primary_hover hover:text-primary cursor-pointer"
        ></i>
        <span>{{ product.qnt }}</span>
        <i
          @click="increaseQnt(index)"
          class="fa-solid fa-plus text-xs ml-2 text-primary_hover hover:text-primary cursor-pointer"
        ></i>
      </div>
      <i
        @click="removeCartEle(index)"
        class="text-right fa-solid fa-xmark p-1 mr-2 mb-1 ml-3 text-primary_hover hover:text-primary rounded-md cursor-pointer"
      ></i>
    </div>
    <RouterLink
      :to="{ name: 'cart' }"
      class="font-semibold underline hover:no-underline text-primary ml-52 md:ml-[17rem]"
      >Vai al carrello</RouterLink
    >
  </div>
</template>

<style scoped>
.resume::-webkit-scrollbar {
  background: #c79735;
  width: 5px;
  height: 8px;
}
</style>
