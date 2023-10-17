<script>
export default {};
</script>

<template>
  <div class="bg-primary mt-[5.5rem] mb-[-5px] pt-8">
    <div
      class="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 bg-primary"
    >
      <img
        class="w-80 rounded-full"
        src="../../public/img/logo-deliveboo.png"
        alt="logo"
      />
      <div class="flex flex-col justify-center items-center gap-4 p-4">
        <h2 class="text-2xl font-bold">Sei un ristoratore?</h2>
        <div>
          <a
            href="http://localhost:8000/login"
            class="text-white bg-secondary hover:bg-b_hover focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0"
          >
            Accedi
          </a>
        </div>
      </div>
    </div>
  </div>
  <img src="../../public/img/wave.svg" alt="wave" class="md:mb-[-4rem]" />
</template>

<style scoped></style>
