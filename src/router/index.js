import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CustomersView from "../views/Customers.vue";
import NewCustomerView from "../views/NewCustomer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/rentals",
      name: "home",
      component: HomeView
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
      path: "/:pathMatch(.*)*",
      redirect: "/rentals"
    }
  ]
});

export default router;
