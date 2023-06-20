import "./assets/styles/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faUserGroup, faRectangleList, faChessBoard } from "@fortawesome/free-solid-svg-icons"

library.add(faUserGroup, faRectangleList, faChessBoard)

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(router)

app.mount("#app")
