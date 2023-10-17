<script>
export default {};
</script>
<template>
  <div
    class="text-white text-sm MyFooteer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <div class="cardFooter">
      <h1 class="mb-7 mt-4 font-bold text-xl">Scopri Deliveboo</h1>
      <ul>
        <li><div class="cursor-pointer">Investitori</div></li>
        <li><router-link :to="{ name: 'about' }">Chi siamo</router-link></li>
        <li><div class="cursor-pointer">Ristoranti</div></li>
        <li><div class="cursor-pointer">Altro</div></li>
        <li><div class="cursor-pointer">Pressroom</div></li>
      </ul>
    </div>
    <div class="cardFooter">
      <h2 class="mb-7 mt-4 font-bold text-xl">Note Legali</h2>
      <ul>
        <li><div class="cursor-pointer">Termini & Condizioni</div></li>
        <li><div class="cursor-pointer">Informativa sulla privacy</div></li>
        <li><div class="cursor-pointer">Cookies</div></li>
      </ul>
    </div>
    <div class="cardFooter">
      <h2 class="mb-7 mt-4 font-bold text-xl">Aiuto</h2>
      <ul>
        <li><div class="cursor-pointer">Contatti</div></li>
        <li><div class="cursor-pointer">FAQ</div></li>
        <li><div class="cursor-pointer">Tipi di cucina</div></li>
        <li><div class="cursor-pointer"></div></li>
      </ul>
    </div>
    <div class="cardFooter flex flex-col">
      <h2 class="my-4 font-bold text-xl">Porta Deliveboo con te</h2>
      <div class="appStoreApple w-40 mb-4 cursor-pointer"></div>
      <div class="appStoreGoogle w-40 cursor-pointer"></div>
    </div>
  </div>
  <div class="icon text-white flex items-center gap-4 px-[50px] pb-4">
    <div>
      <i class="fa-brands fa-facebook text-2xl hover:text-b_hover"></i>
    </div>
    <div>
      <i class="fa-brands fa-twitter text-2xl hover:text-b_hover"></i>
    </div>
    <div>
      <i class="fa-brands fa-instagram text-2xl hover:text-b_hover"></i>
    </div>
  </div>
</template>
<style scoped>
.icon {
  background-color: #2e3333;
  height: 50px;
}

.MyFooteer {
  background-color: #2e3333;
  padding: 50px;
  width: 100%;
}

.cardFooter {
  background-color: #434848;
  border-radius: 0.5rem;
  padding-left: 15px;
  padding-bottom: 20px;
}

li {
  margin-top: 0.8rem;
}

li:hover {
  color: #00846b;
}

.appStoreApple {
  background-image: url(public/img/download-on-the-app-store-apple-logo-svgrepo-com.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
  /* width: 65%; */
  background-position: center;
}

.appStoreGoogle {
  background-image: url(public/img/google-play-badge-logo-svgrepo-com.svg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
  /* width: 65%; */
  background-position: center;
}
</style>
