<script setup>
const props = defineProps({
  props: {
    type: Object,
    default: {}
  }
});
</script>

<template>
  <input id="form" v-bind="{ ...props.props }" />
</template>

<style scoped>
input#form {
  padding: 10px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
  width: 100%;
}
</style>
