<script setup>
import { ref, onMounted } from "vue";
import { customersService as api } from "@/services";
import Loading from "@/components/Loading.vue";
import PageContainer from "@/components/PageContainer.vue";
import Editable from "@/components/form/Editable.vue";

const { id } = defineProps({ id: { type: String, required: true } });

const customer = ref(null);
const isLoading = ref(true);

onMounted(fetchCustomer);

function fetchCustomer() {
  isLoading.value = true;

  const { onError, onResult } = api.getById(id);

  onError(() => alert("Não foi possível buscar dados do cliente!"));

  onResult((result) => {
    customer.value = result.data?.customer || null;
    isLoading.value = result.loading;
  });
}

function updateBirthday(birthday) {
  birthday = birthday.split("/").reverse().join("-");
  update({ birthday });
}

function updatePhone(phone) {
  phone = phone.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "");
  update({ phone });
}

function updateName(name) {
  update({ name });
}

function updateCPF(cpf) {
  cpf = cpf.replaceAll(".", "").replaceAll("-", "");
  update({ cpf });
}

function update({
  _id = customer.value._id,
  name = customer.value.name,
  phone = customer.value.phone,
  cpf = customer.value.cpf,
  birthday = customer.value.birthday
}) {
  const { onError, onDone } = api.update(_id, { name, phone, cpf, birthday });

  onError(() => alert("Não foi possível editar o cliente!"));

  onDone(fetchCustomer);
}
</script>

<template>
  <Loading v-if="isLoading" />

  <PageContainer v-else :title="`Cliente - ${customer.name}`">
    <div class="section-title">Informações de {{ customer.name }}</div>

    <div class="info">Clique num dado para editá-lo</div>

    <div class="info-container">
      <div class="customer-info">
        <div class="info-title">Nome:</div>
        <Editable :value="customer.name" :onChange="updateName" />
      </div>

      <div class="customer-info">
        <div class="info-title">Telefone:</div>
        <Editable
          :value="
            customer.phone.length === 11
              ? customer.phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
              : customer.phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
          "
          :onChange="updatePhone"
        />
      </div>

      <div class="customer-info">
        <div class="info-title">Aniversário:</div>
        <Editable
          :value="new Date(Number(customer.birthday)).toLocaleDateString('pt-br')"
          :onChange="updateBirthday"
        />
      </div>

      <div class="customer-info">
        <div class="info-title">CPF:</div>
        <Editable
          :value="customer.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')"
          :onChange="updateCPF"
        />
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
div.info-container {
  display: flex;
  flex-direction: column;
}

div.customer-info {
  display: flex;
  align-items: flex-end;
  padding: 20px 0;
}

div.customer-info:not(:last-child) {
  border-bottom: 1px solid #eee;
}

div.customer-info:nth-child(odd) {
  background-color: #f7f7f7;
}

div.info-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-right: 4px;
  width: 100px;
  flex-shrink: 0;
}

div.section-title {
  font-size: 1.6em;
  font-weight: bold;
  margin: 20px 0;
  padding-bottom: 16px;
  border-bottom: 3px solid #111;
  color: #111;
  letter-spacing: 1px;
}

div.info {
  font-size: 12px;
  color: #bbb;
  margin-bottom: 10px;
}
</style>
