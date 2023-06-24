<template>
  <button class="new-rental" @click="$router.push('/rentals/new')" title="Alugar Jogo">
    <font-awesome-icon icon="fa-solid fa-hand-holding-heart" />
  </button>
</template>

<style scoped>
button.new-rental {
  width: 64px;
  height: 64px;
  position: fixed;
  right: 24px;
  bottom: 24px;
  border-radius: 50%;
  background-color: rgb(53, 121, 220);
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  z-index: 10;
}

button.new-rental:hover {
  background-color: rgb(44, 97, 176);
}
</style>
