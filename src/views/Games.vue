<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { gamesService as api } from "@/services";
import Loading from "@/components/Loading.vue";
import PageContainer from "@/components/PageContainer.vue";
import Table from "@/components/Table.vue";
import Button from "@/components/form/Button.vue";

const games = ref(null);
const isLoading = ref(true);

onMounted(list);

function list() {
  const { onError, onResult } = api.list();

  onError(() => alert("Não foi possível buscar os jogos!"));

  onResult((result) => {
    games.value = result.data?.games || [];
    isLoading.value = result.loading;
  });
}

function getFormatCellText() {
  return {
    image: (image, row) => <img src={image} alt={`${row.name} board`} />,
    pricePerDay: (price) => `R$ ${(price / 100).toFixed(2).replace(".", ",")}`
  };
}
</script>

<template>
  <Loading v-if="isLoading" />

  <PageContainer v-else title="Jogos">
    <span v-if="games.length === 0">Não há jogos ainda!</span>

    <Table
      v-else
      :columns="[
        { title: 'Imagem', accessor: 'image' },
        { title: 'Nome', accessor: 'name' },
        { title: 'Preço por Dia', accessor: 'pricePerDay' }
      ]"
      :content="games"
      :formatCellText="getFormatCellText()"
    ></Table>

    <Button :props="{ onClick: () => $router.push('/games/new') }">Adicionar Jogo</Button>
  </PageContainer>
</template>
