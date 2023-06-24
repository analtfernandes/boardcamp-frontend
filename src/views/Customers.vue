<script setup>
import { ref, onMounted } from "vue";
import { customersService as api } from "@/services";
import Loading from "@/components/Loading.vue";
import PageContainer from "@/components/PageContainer.vue";
import Table from "@/components/Table.vue";
import Button from "@/components/form/Button.vue";

const customers = ref(null);
const isLoading = ref(true);

onMounted(list);

function list() {
  const { onError, onResult } = api.list();

  onError(() => alert("Não foi possível buscar clientes!"));

  onResult((result) => {
    customers.value = result.data?.customers || [];
    isLoading.value = result.loading;
  });
}
</script>

<template>
  <Loading v-if="isLoading" />

  <PageContainer v-else title="Clientes">
    <span v-if="customers.length === 0">Não há clientes ainda!</span>

    <Table
      v-else
      :columns="[
        { title: 'Nome', accessor: 'name' },
        { title: 'Telefone', accessor: 'phone' },
        { title: 'Aniversário', accessor: 'birthday' },
        { title: 'CPF', accessor: 'cpf' }
      ]"
      :onCellClick="{
        name: (row) => $router.push(`/customers/${row._id}`)
      }"
      :content="customers"
      :formatCellText="{
        birthday: (birthday) => new Date(Number(birthday)).toLocaleDateString('pt-br'),
        phone: (phone) =>
          phone.length === 11
            ? phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
            : phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3'),
        cpf: (cpf) => cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
      }"
    ></Table>

    <Button :props="{ onClick: () => $router.push('/customers/new') }">Adicionar Cliente</Button>
  </PageContainer>
</template>
