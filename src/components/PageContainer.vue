<script setup>
import PageTitle from "@/components/PageTitle.vue";

const props = defineProps(["title"]);
</script>

<template>
  <div class="page">
    <PageTitle>
      {{ props.title }}
    </PageTitle>
    <div class="page-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
div.page {
  width: calc(100% - var(--sidebar-width));
  flex-shrink: 0;
  background-color: #fafafa;
}

div.page-container {
  padding: 20px;
}
</style>
