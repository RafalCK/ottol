import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setLocale } from "./yup";

import "./assets/scss/global.scss";

createApp(App).use(store).use(router).use(setLocale).mount("#app");
