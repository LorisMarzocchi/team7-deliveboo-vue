<script>
export default {};
</script>

<template>
  <div class="container max-w-2xl mx-auto mt-[88px] error flex items-center">
    <div class="my-div-black flex items-center px-2">
      <h1 class="text-center text-3xl w-6/12">Errore 404! La Pagina che cerchi non esiste!</h1>
      <img src="../../public/img/tacos.png" alt="tacos" class="w-6/12">
    </div>
  </div>
</template>

<style scoped>
.error {
  height: calc(100vh - 88px);
}

.my-div-black {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
