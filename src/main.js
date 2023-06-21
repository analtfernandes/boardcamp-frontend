import "./assets/styles/main.css";

import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";

import { DefaultApolloClient, apolloClient } from "./config/apollo";
import { FontAwesomeIcon } from "./config/icon";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App)
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
