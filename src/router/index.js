import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CustomersView from "../views/Customers.vue";
import NewCustomerView from "../views/NewCustomer.vue";
import CustomerView from "../views/Customer.vue";
import GamesView from "../views/Games.vue";
import NewGameView from "../views/NewGame.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/rentals",
      name: "home",
      component: HomeView
    },
    {
      path: "/games",
      name: "games",
      component: GamesView
    },
    {
      path: "/games/new",
      name: "new-game",
      component: NewGameView
    },
    {
      path: "/customers",
      name: "customers",
      component: CustomersView
    },
    {
      path: "/customers/new",
      name: "new-customer",
      component: NewCustomerView
    },
    {
      path: "/customers/:id",
      name: "customer",
      component: CustomerView,
      props: true
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/rentals"
    }
  ]
});

export default router;
