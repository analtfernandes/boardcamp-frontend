import "./assets/styles/main.css";

import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";

import { DefaultApolloClient, apolloClient } from "./config/apollo";
import { FontAwesomeIcon } from "./config/icon";

import ClipLoader from "vue-spinner/src/ClipLoader.vue";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App)
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.component("loader", ClipLoader);

app.use(router);

app.mount("#app");
