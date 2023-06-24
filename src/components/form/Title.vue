<template>
  <div id="form">
    <slot />
  </div>
</template>

<style scoped>
div#form {
  font-size: 1.4em;
  margin-bottom: 5px;
}

div#form::after {
  content: ":";
}

div#form:not(:first-child) {
  margin-top: 16px;
}
</style>
