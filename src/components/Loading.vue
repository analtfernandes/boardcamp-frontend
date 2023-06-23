<script setup>
import { ref, onMounted } from "vue";

const ellipsis = ref("...");
const size = "60px";

onMounted(initLoading);

function initLoading() {
  setInterval(() => {
    if (ellipsis.value.length === 3) ellipsis.value = "";
    else ellipsis.value += ".";
  }, 333);
}
</script>

<template>
  <div class="container">
    <loader loading="true" color="#483d8b" :size="size"></loader>
    Carregando dados{{ ellipsis }}
  </div>
</template>

<style>
div.container {
  flex-shrink: 0;
  display: flex;
  width: calc(100% - var(--sidebar-width));
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
