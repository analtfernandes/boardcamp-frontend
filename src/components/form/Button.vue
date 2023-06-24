<script setup>
import Loading from "@/components/Loading.vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  noMarginTop: {
    type: Boolean,
    default: false
  },
  noMarginBottom: {
    type: Boolean,
    default: false
  },
  props: {
    type: Object,
    default: {}
  }
});

function getButtonStyle() {
  return {
    "margin-top": props.noMarginTop ? "0px" : "16px",
    "margin-bottom": props.noMarginBottom ? "0px" : "16px"
  };
}
</script>

<template>
  <button id="form" v-bind:style="getButtonStyle()" v-bind="{ ...props.props }">
    <Loading v-if="props.isLoading" size="20px" color="#FFF" :text="false" />
    <slot v-else />
  </button>
</template>

<style scoped>
button#form {
  width: 100%;
  height: fit-content;
  border: none;
  padding: 16px;
  background-color: rgb(53, 121, 220);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button#form:hover {
  background-color: rgb(44, 97, 176);
}
</style>
