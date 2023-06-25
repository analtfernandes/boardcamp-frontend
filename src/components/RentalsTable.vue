<script setup lang="jsx">
import { rentalsService as api } from "@/services";
import Table from "@/components/Table.vue";

const props = defineProps({
  rentals: {
    type: Array,
    default: []
  },
  onAction: {
    type: Function,
    default: () => {}
  }
});

function deleteRental(rentalId) {
  const { onError, onDone } = api.deleteRental(rentalId);

  onError(() => {
    alert("Não foi possível excluir aluguel!");
  });

  onDone((result) => {
    if (result.data.deleteRental) props.onAction();
    if (result.data && !result.data.deleteRental) {
      alert("Não foi possível excluir aluguel!");
    }
  });
}

function returnRental(rentalId) {
  const { onError, onDone } = api.returnRental(rentalId);

  onError(() => {
    alert("Não foi possível devolver aluguel!");
  });

  onDone((result) => {
    if (result.data.returnRental) props.onAction();
    if (result.data && !result.data.returnRental) {
      alert("Não foi possível devolver aluguel!");
    }
  });
}
</script>

<template>
  <Table
    :columns="[
      { title: 'Jogo', accessor: 'game.name' },
      { title: 'Cliente', accessor: 'customer.name' },
      { title: 'Data do Aluguel', accessor: 'rentDate' },
      { title: 'Dias Alugados', accessor: 'daysRented' },
      { title: 'Devolvido em', accessor: 'returnDate' },
      { title: 'Valor', accessor: 'originalPrice' }
    ]"
    :onCellClick="{
      'customer.name': (row) => $router.push(`/customers/${row.customer.id}`)
    }"
    :content="props.rentals"
    :formatCellText="{
      rentDate: (text) => new Date(Number(text)).toLocaleDateString('pt-br'),
      returnDate: (text) =>
        text ? new Date(Number(text)).toLocaleDateString('pt-br') : 'Não devolvido',
      originalPrice: (price, row) =>
        `R$ ${((price + row.delayFee) / 100).toFixed(2).replace('.', ',')}`
    }"
    :actions="[
      { title: 'Excluir', onClick: (rental) => deleteRental(rental._id), component: 'Excluir' },
      { title: 'Devolver', onClick: (rental) => returnRental(rental._id), component: 'Devolver' }
    ]"
  ></Table>
</template>
