import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
// import VueBraintree from "vue-braintree";

import "@fortawesome/fontawesome-free/css/all.css";
import "./style.css";

const app = createApp(App);

app.use(router);
// app.use(VueBraintree);

app.mount("#app");
