<script setup>
import logo from "@/assets/images/logo.png"
</script>

<template>
  <aside collapsed>
    <div class="logo">
      <img v-bind:src="logo" alt="BoardCamp Logo" />
    </div>

    <button @click="$router.push('/rentals')" class="menu-item">
      <font-awesome-icon icon="fa-solid fa-rectangle-list" />
      Aluguéis
    </button>

    <button @click="$router.push('/customers')" class="menu-item">
      <font-awesome-icon icon="fa-solid fa-user-group" />
      Clientes
    </button>

    <button @click="$router.push('/games')" class="menu-item">
      <font-awesome-icon icon="fa-solid fa-chess-board" />
      Jogos
    </button>
  </aside>
</template>

<style scoped>
aside {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  width: var(--sidebar-width);
  background-color: var(--colors-main);
  color: #fff;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  position: sticky;
  top: 0;
  z-index: 2;
}

div.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
}

button.menu-item {
  cursor: pointer;
  border-radius: 4px;
  width: 252px;
  border: none;
  padding: 16px 16px 16px 45px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1.1em;

  word-break: break-all;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  position: relative;
}

button.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

button.menu-item svg {
  position: absolute;
  left: 16px;
}
</style>
