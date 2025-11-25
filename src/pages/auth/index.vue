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
          isLoginForm ? "Log-in, to continue" : "Create account to start working"
        }}</span>
      </div>

      <div class="flex flex-col items-center justify-center">
        <LoginForm v-if="isLoginForm" />
        <RegisterForm v-else />

        <div class="self-start mt-2 text-blue-950 text-sm">
          {{ isLoginForm ? "Dont't have an account yet?" : "Already have an account?" }}
          <button @click="isLoginForm = !isLoginForm" class="underline text-blue-500">
            {{ isLoginForm ? "Create" : "Login" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
