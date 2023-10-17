<script>
import axios from "axios";
import braintree from "braintree-web";
import { store } from "../store";
import AppLoader from "../components/AppLoader.vue";

export default {
  data() {
    return {
      store,
      products: [],
      hostedFieldInstance: false,
      email: "",
      name: "",
      surname: "",
      message: "",
      nonce: "",
      error: "",
      amount: 10,
      paymentToken: null,
      restaurantId: null,
      hasErrors: false,
      emailError: "",
      nameError: "",
      surnameError: "",
      cardError: "",
      errorMessage1: null,
      showLoader: false,
    };
  },
  components: { AppLoader },
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
    async getPaymentToken() {
      await axios
        .get("http://localhost:8000/api/orders/generate")
        .then((response) => {
          if (response.data.success) {
            this.paymentToken = response.data.token;
          } else {
            console.error("Errore nella generazione del token di pagamento");
          }
        });
    },
    createHostedFieldsInstance() {
      braintree.client
        .create({
          //authorization: "sandbox_93smtrz3_bbgx4xf7h8bx24xg",
          authorization: this.paymentToken,
        })
        .then((clientInstance) => {
          let options = {
            client: clientInstance,

            styles: {
              input: {
                "font-size": "18px",
                "font-family": "Open Sans",
                "font-weight": "500",
              },
              ".valid": {
                color: "green",
                // border: "1px solid green",
              },
              ".invalid": {
                color: "red",
                // border: "1px solid red",
              },
            },
            fields: {
              number: {
                selector: "#creditCardNumber",
                placeholder: "Inserisci carta di credito valida",
                message: "Inserisci carta di credito valida",
                minlength: 12,
              },
              cvv: {
                selector: "#cvv",
                placeholder: "Inserisci un CVV",
                minlength: 3,
                maxlength: 3,
              },
              expirationDate: {
                selector: "#expireDate",
                placeholder: "00 / 0000",
              },
            },
          };

          return braintree.hostedFields.create(options);
        })
        .then((hostedFieldInstance) => {
          this.hostedFieldInstance = hostedFieldInstance;

          console.log(hostedFieldInstance);
        })
        .catch((err) => {
          if (err.code === "HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME") {
            console.log("errore");

            // location.reload();
          }
          console.error(err);
        });
    },

    payWithCreditCard() {
      if (this.hostedFieldInstance) {
        this.error = "";
        this.nonce = "";
        this.hasErrors = false;
        this.emailError = "";
        this.nameError = "";
        this.surnameError = "";
        this.cardError = "";

        // Verifica le validazioni dei campi
        let isValid = true;

        if (!this.email) {
          this.emailError = "Il campo 'email' è richiesto!";
          isValid = false;
          this.hasErrors = true;
        } else if (!this.email.includes("@")) {
          this.emailError = "Il campo 'email' deve contenere la '@'";
          isValid = false;
          this.hasErrors = true;
        } else if (
          !(this.email.endsWith(".com") || this.email.endsWith(".it"))
        ) {
          this.emailError =
            "Il campo 'email' deve terminare con '.com' o '.it'";
          isValid = false;
          this.hasErrors = true;
        } else if (this.email.length < 5) {
          this.emailError =
            "Il campo 'email' deve contenere almeno 5 caratteri";
          isValid = false;
          this.hasErrors = true;
        } else {
          this.emailError = ""; // Azzera l'errore se il campo è valido
        }

        if (!this.name) {
          this.nameError = "Il campo 'nome' è richiesto!";
          isValid = false;
          this.hasErrors = true;
        } else if (this.name.length < 2) {
          this.nameError = "Il campo 'nome' è troppo corto!";
          isValid = false;
          this.hasErrors = true;
        } else {
          this.nameError = ""; // Azzera l'errore se il campo è valido
        }

        if (!this.surname) {
          this.surnameError = "Il campo 'cognome' è richiesto!";
          isValid = false;
          this.hasErrors = true;
        } else if (this.surname.length < 2) {
          this.surnameError = "Il campo 'cognome' è troppo corto!";
          isValid = false;
          this.hasErrors = true;
        } else {
          this.surnameError = "";
        }

        if (!isValid) {
          return;
        }

        this.hostedFieldInstance
          .tokenize()
          .then((payload) => {
            console.log(payload);
            this.nonce = payload.nonce;
            this.cardError = "";
            if (isValid) {
              // Esci se ci sono errori
              // }
              this.showLoader = true;

              // Sending nonce to Laravel API
              axios
                .post("http://localhost:8000/api/orders/make/payment", {
                  token: this.nonce,
                  cart: this.products,
                  restaurant_id: this.products[0].restaurant_id,
                  name: this.name,
                  surname: this.surname,
                  email: this.email,
                  message: this.message,
                })
                .then((response) => {
                  if (response.data.success) {
                    this.$router.push({ name: "thankYou" });
                    localStorage.clear();
                  } else {
                    // handle failure
                  }
                })
                .catch((error) => {
                  console.error("Payment Error:", error);
                  if (error) {
                    console.log("pagamento rifiutato");
                  }
                });
            }
          })
          .catch((err) => {
            console.error(err);
            this.error = err.message;
            this.errorMessage1 = err;

            switch (err.code) {
              case "HOSTED_FIELDS_FIELDS_EMPTY":
                this.cardError = "Riempi tutti i campi della carta.";
                break;
              case "HOSTED_FIELDS_FIELDS_INVALID":
                const invalidFields = err.details.invalidFieldKeys;

                if (invalidFields.includes("cvv")) {
                  this.cardError = "Il CVV non è valido.";
                }
                if (invalidFields.includes("expirationDate")) {
                  this.cardError = "La data di scadenza non è valida.";
                }
                if (invalidFields.includes("number")) {
                  this.cardError = "Il numero della carta non è valido.";
                }
                break;
              case "HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE":
                this.cardError =
                  "Si è verificato un errore durante la tokenizzazione. Si prega di riprovare.";
                break;
              case "HOSTED_FIELDS_FIELDS_MISSING":
                this.cardError =
                  "Mancano alcuni campi obbligatori della carta.";
                break;
              default:
                this.cardError =
                  "Si è verificato un errore con la tua carta. Ricarica la pagina e riprova.";
                break;
            }
            console.log(this.error);
          });
      }
    },

    closeModalErr() {
      this.hasErrors = false;
    },
  },
  created() {
    this.getProductsCart();
  },
  beforeDestroy() {
    if (this.hostedFieldInstance) {
      this.hostedFieldInstance.teardown((err) => {
        if (err) {
          console.error(
            "Could not tear down the previous hosted fields instance:",
            err
          );
        }
      });
    }
  },

  async mounted() {
    await this.getPaymentToken();
    console.log("SERVER TOKEN", this.paymentToken);

    // Qui rimuovo manualmente eventuali iframe presenti nel container prima di procedere
    ["creditCardNumber", "expireDate", "cvv"].forEach((id) => {
      const container = document.getElementById(id);
      while (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }
    });

    if (this.hostedFieldInstance) {
      // Ho avvolto il teardown in una Promise per assicurarmi che completi prima di continuare
      new Promise((resolve, reject) => {
        this.hostedFieldInstance.teardown((err) => {
          if (err) {
            console.error(
              "Could not tear down the previous hosted fields instance:",
              err
            );
            reject(err);
            return;
          }
          console.log("Successfully torn down the previous instance");
          resolve();
        });
      })
        .then(() => {
          this.createHostedFieldsInstance();
        })
        .catch((err) => {
          console.error("Failed to teardown:", err);
        });
    } else {
      this.createHostedFieldsInstance();
    }
  },
};
</script>
<template>
  <div class="container">
    <div class="mt-28">
      <!-- ERRORE -->
      <div
        v-if="hasErrors"
        id="alert-2"
        class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50"
        role="alert"
      >
        <svg
          class="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 text-sm font-medium">
          Ordine non inviato, controlla i campi e riprova!
        </div>
        <button
          @click="closeModalErr"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#alert-2"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
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
        </button>
      </div>

      <h1 class="text-3xl text-center font-bold text-secondary">
        Completa il tuo ordine
      </h1>

      <form class="mt-20 mb-16 max-w-5xl mx-auto px-10" novalidate>
        <!-- EMAIL -->
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="email"
            type="email"
            id="email"
            class="block py-4 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
            autocomplete="off"
            required
          />
          <label
            for="email"
            class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Indirizzo Email</label
          >
          <span v-if="emailError" class="text-red-500">
            {{ emailError }}
          </span>
        </div>

        <!-- NOME E COGNOME -->

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              v-model="name"
              type="text"
              name="floating_first_name"
              id="name"
              class="block py-4 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
              autocomplete="off"
              required
            />
            <label
              for="name"
              class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Nome</label
            >
            <span v-if="nameError" class="text-red-500">{{ nameError }}</span>
          </div>

          <div class="relative z-0 w-full mb-6 group">
            <input
              v-model="surname"
              type="text"
              id="surname"
              class="block py-4 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
              autocomplete="off"
              required
            />
            <label
              for="surname"
              class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Cognome</label
            >
            <span v-if="surnameError" class="text-red-500">{{
              surnameError
            }}</span>
          </div>
        </div>

        <!-- MESSAGGIO -->
        <div class="w-full md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              v-model="message"
              type="text"
              name="message"
              id="message"
              class="block py-4 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
              autocomplete="off"
            />
            <label
              for="message"
              class="peer-focus:font-medium absolute text-lg text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Messaggio</label
            >
          </div>
        </div>
      </form>
      <div v-if="cardError" class="alert text-center alert-danger text-red-500">
        {{ cardError }}
      </div>

      <form class="mb-20 max-w-5xl mx-auto px-10" novalidate>
        <div class="form-group">
          <label for="creditCardNumber" style="color: #00a082"
            >Numero carta di credito</label
          >
          <div
            id="creditCardNumber"
            style="
              height: 80px;
              border-bottom: 2px solid #d1d5db;
              margin-bottom: 15px;
            "
          ></div>
        </div>

        <div class="form-group">
          <div
            class="row"
            style="display: flex; justify-content: space-between"
          >
            <div class="col-6" style="flex-basis: 45%">
              <label style="color: #00a082">Data di scadenza</label>
              <div
                id="expireDate"
                class="form-control"
                style="
                  height: 80px;
                  border-bottom: 2px solid #d1d5db;
                  margin-bottom: 15px;
                "
              ></div>
            </div>

            <div class="col-6" style="flex-basis: 45%">
              <label style="color: #00a082">CVV</label>
              <div
                id="cvv"
                class="form-control"
                style="
                  height: 80px;
                  border-bottom: 2px solid #d1d5db;
                  margin-bottom: 15px;
                "
              ></div>
            </div>
          </div>
        </div>

        <div v-if="showLoader">
          <AppLoader />
        </div>

        <button
          type="submit"
          class="text-white bg-secondary hover:bg-b_hover focus:ring-4 focus:outline-none font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center mt-5"
          @click.prevent="payWithCreditCard"
        >
          Paga Ora!
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.my-label {
  margin-bottom: 10px;
}
.invalid-field {
  border: 1px solid red;
  /* altri stili per indicare un campo non valido */
}

#card:hover {
  transform: rotateY(180deg);
}

#card > div:nth-child(1) {
  transition-delay: 150ms;
}

#card:hover > div:nth-child(1) {
  opacity: 0;
  z-index: -1;
}
</style>
