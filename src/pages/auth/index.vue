<script setup lang="ts">
import { LoginForm, RegisterForm } from "~/widgets/auth/ui";

const isLoginForm = ref(true);
</script>

<template>
  <div class="min-h-screen w-full bg-gray-100 flex items-center justify-center">
    <div class="p-10 rounded-md bg-white shadow-lg max-w-[400px] w-full">
      <div class="text-center text-blue-950 mb-4">
        <h1 class="text-4xl font-medium mb-4">Jira</h1>
        <span class="font-bold text-sm">{{
          isLoginForm
            ? "Войдите, чтобы продолжить"
            : "Создайте аккаунт чтобы начать работать"
        }}</span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <template v-if="isLoginForm">
          <LoginForm />
        </template>
        <template v-else>
          <RegisterForm />
        </template>
        <div class="self-start mt-2 text-blue-950">
          {{ isLoginForm ? "Еще нет аккаунта?" : "Уже есть аккаунт?" }}
          <button
            @click="isLoginForm = !isLoginForm"
            class="underline text-blue-500"
          >
            {{ isLoginForm ? "Создать" : "Войти" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
