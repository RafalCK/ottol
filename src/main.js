import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./yup/setLocale";

import "./assets/scss/global.scss";

createApp(App).use(store).use(router).mount("#app");
