<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import NewRentalButton from "./components/NewRentalButton.vue";
</script>

<template>
  <main>
    <Sidebar />
    <RouterView />
    <NewRentalButton />
  </main>
</template>

<style scoped>
main {
  display: flex;
}
</style>
