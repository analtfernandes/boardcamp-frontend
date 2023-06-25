<script setup>
import { ref, onMounted } from "vue";
import { rentalsService as api, gamesService, customersService } from "@/services";
import Loading from "@/components/Loading.vue";
import PageContainer from "@/components/PageContainer.vue";
import Title from "@/components/form/Title.vue";
import Input from "@/components/form/Input.vue";
import Button from "@/components/form/Button.vue";

const newRental = ref({ customer: "", game: "", daysRented: 0 });
const customers = ref(null);
const games = ref(null);
const isLoading = ref(false);

onMounted(listData);

function listData() {
  listCustomers();
  listGames();
}

function listCustomers() {
  const { onError, onResult } = customersService.list();

  onError(() => alert("Não foi possível obter lista de clientes!"));

  onResult((result) => {
    if (result.data) {
      customers.value = result.data.customers.map((c) => ({
        value: c._id,
        label: `${c.name} - ${c.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")}`
      }));
      newRental.value = { ...newRental.value, customer: customers.value[0].value };
    }
    isLoading.value = result.loading;
  });
}

function listGames() {
  const { onError, onResult } = gamesService.list();

  onError(() => alert("Não foi possível obter lista de jogos!"));

  onResult((result) => {
    if (result.data) {
      games.value = result.data.games.map((g) => ({ value: g._id, label: g.name }));
      newRental.value = { ...newRental.value, game: games.value[0].value };
    }
    isLoading.value = result.loading;
  });
}

function handleRental(router) {
  newRental.value = {
    ...newRental.value,
    daysRented: Number(newRental.value.daysRented)
  };

  const { loading, onError, onDone } = api.create(newRental.value);

  isLoading.value = loading;

  onError(() => {
    alert("Não foi possível alugar jogo!");
    isLoading.value = false;
  });

  onDone((result) => {
    if (result.data) router.push("/rentals");
    isLoading.value = result.loading;
  });
}

function updateRental(event) {
  newRental.value = {
    ...newRental.value,
    [event.target.name]: event.target.value
  };
}
</script>

<template>
  <PageContainer title="Novo Aluguel">
    <Loading v-if="isLoading" />

    <form v-else @submit.prevent="() => handleRental($router)">
      <Title>Cliente</Title>
      <select name="customer" @change="updateRental" placeholder="Selecione um cliente...">
        <option v-for="customer in customers" :value="customer.value" :key="customer.value">
          {{ customer.label }}
        </option>
      </select>

      <Title>Jogo</Title>
      <select name="game" @change="updateRental" placeholder="Selecione um jogo...">
        <option v-for="game in games" :value="game.value" :key="game.value">
          {{ game.label }}
        </option>
      </select>

      <Title>Quantidade de Dias</Title>
      <Input
        :value="newRental.daysRented"
        :props="{
          onChange: updateRental,
          placeholder: 'Digite a quantidade de dias...',
          name: 'daysRented',
          type: 'number'
        }"
      />

      <Button :isLoading="isLoading" :props="{ type: 'submit', disabled: isLoading }"
        >Alugar</Button
      >
    </form>
  </PageContainer>
</template>
