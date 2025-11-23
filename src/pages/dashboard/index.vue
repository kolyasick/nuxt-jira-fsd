<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";
import { signOut } from "~/shared/api";
import { useAuthStore } from "~/shared/stores/auth.store";

const authStore = useAuthStore();
const cookie = useCookie(ACCESS_TOKEN_NAME);
const toast = useToast();

const { mutate, isPending } = useMutation({
  mutationKey: ["logout"],
  mutationFn: () => signOut(),
  onSuccess: async () => {
    cookie.value = null;
    await navigateTo("/auth");
    toast.add({
      title: "Вы вышли из аккаунта",
      color: "info",
      icon: "si:sign-out-fill",
    });
    authStore.setUser(null);
  },
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <h1>HOME PAGE</h1>
    <pre data-allow-mismatch>{{ authStore.user }}</pre>
    <div class="w-52 mt-2">
      <UButton :loading="isPending" @click="() => mutate()" color="error"
        >Выйти</UButton
      >
      <UButton
        class="mt-2"
        :loading="isPending"
        @click="() => mutate()"
        color="secondary"
        >Получить новый токен</UButton
      >
    </div>
  </NuxtLayout>
</template>
