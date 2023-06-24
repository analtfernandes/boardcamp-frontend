<script setup>
import { ref, onMounted } from "vue";
import Input from "@/components/form/Input.vue";

const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  onChange: {
    type: Function,
    default: () => {}
  },
  props: {
    type: Object,
    default: {}
  }
});

const editing = ref(false);
const state = ref(props.value);

onMounted(() => {
  if (!editing) state.value = props.value;
});

function onKeyPress(event) {
  handleInputChange(event);
  props.onChange(state.value);
  editing.value = false;
}

function handleInputChange(event) {
  state.value = event.target.value;
}
</script>

<template>
  <Input
    v-if="editing"
    v-bind="{ ...props.props }"
    :value="state"
    @change="handleInputChange"
    @keypress.enter.exact="onKeyPress"
  />
  <span v-else v-bind:style="{ cursor: 'pointer' }" @click="() => (editing = true)">{{
    state
  }}</span>
</template>
