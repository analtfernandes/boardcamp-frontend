<script setup>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <main>
    <Sidebar />

    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>

    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
}
</style>
