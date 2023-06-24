<script setup>
import { ref } from "vue";
import { customersService as api } from "@/services";
import Loading from "@/components/Loading.vue";
import PageContainer from "@/components/PageContainer.vue";
import Title from "@/components/form/Title.vue";
import Input from "@/components/form/Input.vue";
import Button from "@/components/form/Button.vue";

const newCustomer = ref({ name: "", phone: "", birthday: "", cpf: "" });
const isLoading = ref(false);

function handleCustomer(router) {
  const { name, phone, birthday, cpf } = newCustomer.value;

  const customer = {
    name: name.trim(),
    phone: phone
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(" ", "")
      .replaceAll("-", "")
      .trim(),
    cpf: cpf.replaceAll(".", "").replaceAll("-", "").trim(),
    birthday: birthday.split("/").reverse().join("-").trim()
  };

  const { loading, onError, onDone } = api.create(customer);

  isLoading.value = loading;

  onError((e) => {
    alert("Não foi possível criar cliente!");
    isLoading.value = false;
  });

  onDone((result) => {
    if (result.data) router.push("/customers");
    isLoading.value = result.loading;
  });
}

function updateCustomer(event) {
  newCustomer.value = {
    ...newCustomer.value,
    [event.target.name]: event.target.value
  };
}
</script>

<template>
  <PageContainer :title="`Novo Cliente ${newCustomer.name.length ? '-' : ''} ${newCustomer.name}`">
    <form @submit.prevent="() => handleCustomer($router)">
      <Title>Nome</Title>
      <Input
        :value="newCustomer.name"
        :props="{
          onChange: (e) => updateCustomer(e),
          placeholder: 'Nome',
          name: 'name',
          type: 'text'
        }"
      />

      <Title>Telefone</Title>
      <Input
        :value="newCustomer.phone"
        :props="{
          onChange: (e) => updateCustomer(e),
          placeholder: '(XX) XXXXX-XXXX',
          name: 'phone',
          type: 'text'
        }"
      />

      <Title>Aniversário</Title>
      <Input
        :value="newCustomer.birthday"
        :props="{
          onChange: (e) => updateCustomer(e),
          placeholder: 'DD/MM/AAAA',
          name: 'birthday',
          type: 'text'
        }"
      />

      <Title>CPF</Title>
      <Input
        :value="newCustomer.cpf"
        :props="{
          onChange: (e) => updateCustomer(e),
          placeholder: 'XXX.XXX.XXX-XX',
          name: 'cpf',
          type: 'text'
        }"
      />

      <Button :isLoading="isLoading" :props="{ type: 'submit', disabled: isLoading }"
        >Salvar Cliente</Button
      >
    </form>
  </PageContainer>
</template>
