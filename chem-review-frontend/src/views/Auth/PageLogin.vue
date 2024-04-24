<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from 'vue-router';

import { ROUTE_NAMES } from '@/router/meta/route.names';

import BaseInput from "@/components/UI/BaseInput.vue";
import BaseButton from "@/components/UI/BaseButton.vue";

import AuthService from "@/core/User/services/auth.service";
import UserRepo from "@/core/User/repository/user.repository";

interface IFormState {
  username: string;
  password: string;
}

const formState = reactive<IFormState>({
  username: "",
  password: "",
});

const router = useRouter();

const handleLogin = async () => {
  try {
    const authService = new AuthService(new UserRepo());
    await authService.login({ ...formState });
    router.push({ name: ROUTE_NAMES.HOME.ROOT });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section class="credentials">
    <h1 class="credentials__title">Добро пожаловать</h1>
    <span class="credentials__caption"
      >Войдите что бы получить возможность исследовать</span
    >
    <form class="form" @submit.prevent="handleLogin">
      <BaseInput v-model="formState.username" labelText="Электронная почта" />
      <BaseInput
        v-model="formState.password"
        labelText="Пароль"
        type="password"
      />
      <BaseButton class="form__submit-button" type="submit"
        >Войти</BaseButton
      >
    </form>
  </section>
</template>

<style scoped>
.credentials {
  background-color: var(--white);
  padding: 6rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
}
.credentials__title {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.5rem;
  margin: 0 0 1rem 0;
  color: var(--text-primray);
}
.credentials__caption {
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.8rem;
  margin: 0 0 5rem 0;
  max-width: 39.6rem;
  color: #808284;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.form__submit-button {
  border-radius: 6rem;
  padding: 1.5rem 3.6rem;
  align-self: flex-end;
  background-color: var(--primary);
}
</style>
