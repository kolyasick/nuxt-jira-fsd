<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";
import { signOut } from "~/shared/api";
import { Button } from "~/shared/components";
import { useAuthStore } from "~/shared/stores/auth.store";

const authStore = useAuthStore();
const cookie = useCookie(ACCESS_TOKEN_NAME);
const toast = useToast();

const { mutate, isPending } = useMutation({
  mutationKey: ["logout"],
  mutationFn: () => signOut(),
  onSuccess: async () => {
    cookie.value = null;
    authStore.setUser(null);
    await navigateTo("/auth");
    toast.add({
      title: "Вы вышли из аккаунта",
      color: "info",
    });
  },
});
</script>

<template>
  <h1>HOME PAGE</h1>
  <pre>{{ authStore.user }}</pre>
  <div class="w-52 mt-2">
    <UButton :loading="isPending" @click="() => mutate()" color="neutral"
      >Выйти</UButton
    >
  </div>
</template>
