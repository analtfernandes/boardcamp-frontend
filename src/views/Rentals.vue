<script setup>
import { ref, onMounted } from "vue";
import { rentalsService as api } from "@/services";
import Loading from "@/components/Loading.vue";
import PageContainer from "@/components/PageContainer.vue";
import RentalsTable from "@/components/RentalsTable.vue";

const rentals = ref(null);
const isLoading = ref(true);

onMounted(list);

function list() {
  const { onError, onResult } = api.list();

  onError(() => alert("Não foi possível buscar aluguéis!"));

  onResult((result) => {
    rentals.value = result.data?.rentals || [];
    isLoading.value = result.loading;
  });
}
</script>

<template>
  <Loading v-if="isLoading" />

  <PageContainer v-else title="Aluguéis">
    <RentalsTable :rentals="rentals" :onAction="list" />
  </PageContainer>
</template>
