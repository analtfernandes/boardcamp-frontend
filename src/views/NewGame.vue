<script setup>
import { ref, onMounted } from "vue";
import { gamesService as api, categoriesService } from "@/services";
import Loading from "@/components/Loading.vue";
import PageContainer from "@/components/PageContainer.vue";
import Title from "@/components/form/Title.vue";
import Input from "@/components/form/Input.vue";
import Button from "@/components/form/Button.vue";

const newGame = ref({ name: "", image: "", pricePerDay: 0, stockTotal: 0, category: "" });
const categories = ref(null);
const isLoading = ref(false);

onMounted(listCategories);

function listCategories() {
  const { onError, onResult } = categoriesService.list();

  onError(() => alert("Não foi possível buscar as categorias!"));

  onResult((result) => {
    if (result.data) {
      categories.value = result.data.categories;
      newGame.value = { ...newGame.value, category: categories.value[0]._id };
    }
    isLoading.value = result.loading;
  });
}

function handleGame(router) {
  newGame.value = {
    ...newGame.value,
    pricePerDay: Number(newGame.value.pricePerDay),
    stockTotal: Number(newGame.value.stockTotal)
  };

  const { loading, onError, onDone } = api.create(newGame.value);

  isLoading.value = loading;

  onError(() => {
    alert("Não foi possível criar jogo!");
    isLoading.value = false;
  });

  onDone((result) => {
    if (result.data) router.push("/games");
    isLoading.value = result.loading;
  });
}

function updateGame(event) {
  newGame.value = {
    ...newGame.value,
    [event.target.name]: event.target.value
  };
}
</script>

<template>
  <PageContainer :title="`Novo Jogo ${newGame.name.length ? '-' : ''} ${newGame.name}`">
    <form @submit.prevent="() => handleGame($router)">
      <Title>Nome</Title>
      <Input
        :value="newGame.name"
        :props="{
          onChange: (e) => updateGame(e),
          placeholder: 'Nome',
          name: 'name',
          type: 'text'
        }"
      />

      <Title>Imagem</Title>
      <Input
        :value="newGame.image"
        :props="{
          onChange: (e) => updateGame(e),
          placeholder: 'Imagem',
          name: 'image',
          type: 'text'
        }"
      />

      <Title>Preço por Dia</Title>
      <Input
        :value="newGame.pricePerDay"
        :props="{
          onChange: (e) => updateGame(e),
          placeholder: 'Preço por Dia',
          name: 'pricePerDay',
          type: 'number'
        }"
      />

      <Title>Quantidade total do estoque</Title>
      <Input
        :value="newGame.stockTotal"
        :props="{
          onChange: (e) => updateGame(e),
          placeholder: 'Quantidade total do estoque',
          name: 'stockTotal',
          type: 'number'
        }"
      />

      <Title>Categoria</Title>
      <select name="category" @change="updateGame">
        <option v-for="category in categories" :value="category._id" :key="category._id">
          {{ category.name }}
        </option>
      </select>

      <Button :isLoading="isLoading" :props="{ type: 'submit', disabled: isLoading }"
        >Salvar Jogo</Button
      >
    </form>
  </PageContainer>
</template>
