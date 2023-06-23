<template>
  <div class="title-container">
    <h1>
      <slot />
    </h1>
  </div>
</template>

<style scoped>
div.title-container {
  position: sticky;
  top: 0px;
  background-image: linear-gradient(to right, rgb(72, 61, 139), rgb(79, 67, 153));
  width: 100%;
  padding: 120px 20px 0;
  z-index: 2;
}

h1 {
  font-size: 2.4em;
  font-weight: bold;
  letter-spacing: 1px;
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--colors-main);
  color: #fff;
  text-transform: uppercase;
}
</style>
