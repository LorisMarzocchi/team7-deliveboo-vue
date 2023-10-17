<script>
export default {};
</script>

<template>
  <nav class="bg-primary fixed w-full z-20 top-0 left-0">
    <div
      class="container flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <router-link class="flex items-center" :to="{ name: 'home' }">
        <div
          class="h-14 w-52 md:ml-[-25px] bg-[url('../../public/img/logo-deliveboo_thumbnail.png')] overflow-hidden bg-[length:245px_155px] bg-center"
        ></div>
      </router-link>
      <div class="flex">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg md:hidden hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col lg:items-center text-center p-4 md:p-0 mt-4 font-medium border bg-primary border-secondary rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0"
        >
          <li>
            <router-link
              class="block py-2 pl-3 pr-4 text-gray-900 hover:bg-secondary hover:text-white md:p-0 rounded md:bg-transparent md:text-secondary"
              :to="{ name: 'home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-secondary md:hover:bg-transparent md:hover:text-secondary hover:text-white md:p-0"
              :to="{ name: 'about' }"
              >Chi Siamo</router-link
            >
          </li>

          <li>
            <router-link
              class="block py-2 pl-3 pr-4 mb-2 lg:mb-0 text-gray-900 rounded hover:bg-secondary md:hover:bg-transparent md:hover:text-secondary hover:text-white md:p-0"
              :to="{ name: 'cart' }"
            >
              <i class="fa-solid fa-cart-shopping mr-1"></i>Carrello
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script></script>
