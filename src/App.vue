<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <main>
    <Sidebar />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
}
</style>
