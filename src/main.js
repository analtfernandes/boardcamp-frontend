import "./assets/styles/main.css";

import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";

import { DefaultApolloClient, apolloClient } from "./config/apollo";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserGroup, faRectangleList, faChessBoard } from "@fortawesome/free-solid-svg-icons";

library.add(faUserGroup, faRectangleList, faChessBoard);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App)
});

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
