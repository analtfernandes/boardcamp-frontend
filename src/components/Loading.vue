<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "60px"
  },
  color: {
    type: String,
    default: "#483d8b"
  },
  text: {
    type: Boolean,
    default: true
  }
});
const ellipsis = ref("...");

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
    <loader :loading="true" :color="props.color" :size="props.size"></loader>
    <span v-if="props.text">Carregando dados{{ ellipsis }} </span>
  </div>
</template>

<style>
div.container {
  flex-shrink: 0;
  display: flex;
  width: calc(100% - var(--sidebar-width));
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
