<script>
export default {};
</script>

<template>
  <div class="container p-3 md:p-0">
    <h1 class="mt-28 text-3xl font-bold text-secondary">
      DeliveBoo: Gusta i Sapori del Mondo Comodamente a Casa Tua!
    </h1>

    <p class="pt-5 text-xl text-gray-900">
      Sei stanco di cucinare dopo una lunga giornata di lavoro? Vuoi gustare
      prelibatezze culinarie senza alzarti dal divano? Benvenuto su DeliveBoo,
      il luogo dove i tuoi desideri culinari diventano realtà con un semplice
      click.
    </p>

    <!-- PRIMA SEZIONE PER ABOUT -->
    <div class="flex flex-col md:flex-row gap-5 mt-10">
      <div class="image basis-full">
        <img
          class="w-full md:w-9/12 py-10"
          src="../../public/img/food-delivery.jpg"
          alt="Delivery"
        />
      </div>

      <div class="flex flex-col basis-9/12 pt-6">
        <h2 class="text-2xl text-gray-900 font-bold">Cosa Offriamo:</h2>

        <ul>
          <li class="pt-6 text-xl">
            <strong>Selezione Culinaria:</strong> Esplora un ampio assortimento
            di cucine provenienti da tutto il mondo. Dalla pizza italiana alla
            cucina thailandese, dalle prelibatezze giapponesi ai sapori
            tradizionali locali, abbiamo tutto ciò di cui hai bisogno per
            soddisfare i tuoi gusti.
          </li>

          <li class="pt-6 text-xl">
            <strong>Facile Navigazione:</strong> Il nostro sito è intuitivo e
            user-friendly. Scegli tra categorie come pizza, sushi, cibo
            tradizionale, cucina etnica e molto altro. Trovare il tuo pasto
            preferito non è mai stato così semplice.
          </li>
        </ul>
      </div>
    </div>

    <!-- SECONDA SEZIONE PER ABOUT -->
    <div class="flex flex-col md:flex-row gap-5 mt-14">
      <div class="flex flex-col basis-7/12 pt-6">
        <ul>
          <li class="pt-4 text-xl">
            <strong>Personalizzazione:</strong> Hai preferenze alimentari
            specifiche o allergie? Nessun problema. Nel nostro sistema di
            ordinazione, puoi facilmente indicare le tue esigenze e
            personalizzare ogni piatto secondo i tuoi gusti.
          </li>

          <li class="pt-6 text-xl">
            <strong>Ordinazione Veloce:</strong> Basta perdere tempo al
            telefono. Con pochi clic, puoi completare il tuo ordine e attendere
            comodamente che il tuo pasto venga consegnato direttamente alla tua
            porta.
          </li>
        </ul>
      </div>

      <div class="image basis-9/12">
        <img
          src="../../public/img/food-delivery-hotel1.jpg"
          alt="food delivery"
          class="rounded-xl"
        />
      </div>
    </div>

    <!-- TERZA SEZIONE PER ABOUT CON IMMAGINE GRANDE -->
    <div>
      <h2 class="text-center text-2xl pt-14 pb-6">
        <strong>Consegna Rapida e Affidabile:</strong> Sappiamo che la fame non
        aspetta. I nostri autisti esperti assicurano che il tuo pasto arrivi
        caldo e pronto per essere gustato nel minor tempo possibile.
      </h2>

      <img
        class="mx-auto w-10/12 rounded-xl"
        src="../../public/img/cibo-domicilio.jpg"
        alt="food"
      />
    </div>

    <!-- ULTIMA SEZIONE -->
    <div class="mt-14">
      <h2 class="text-3xl font-bold text-secondary text-center">
        La Nostra Missione
      </h2>

      <p class="pt-5 text-xl text-gray-900 text-center">
        La nostra missione è rendere le tue esperienze culinarie il più comode
        possibile. Vogliamo liberarti dagli oneri della cucina e permetterti di
        goderti pasti deliziosi nella tranquillità del tuo spazio personale.
      </p>

      <div
        class="flex flex-col items-center md:flex-row gap-5 justify-between pt-10"
      >
        <img
          class="w-3/6 rounded-2xl"
          src="../../public/img/Ricerca-delivery.jpg"
          alt="food delivery"
        />

        <img
          class="w-3/6 rounded-2xl"
          src="../../public/img/Sushi-delivery-a-Milano.jpg"
          alt="food delivery"
        />
      </div>

      <p class="py-9 text-xl text-gray-900">
        Affidati a
        <span class="text-xl font-bold text-secondary">DeliveBoo</span> per
        soddisfare i tuoi desideri gastronomici. Non importa se sei da solo, con
        la famiglia o con gli amici, siamo qui per portare il buon cibo
        direttamente da noi a te. Rilassati, goditi il viaggio culinario e
        lascia che il tuo prossimo pasto sia un'esperienza indimenticabile.
      </p>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 1300px;
  margin-inline: auto;
}
</style>
