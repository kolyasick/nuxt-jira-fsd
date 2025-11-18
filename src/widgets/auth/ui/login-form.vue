<script setup lang="ts">
import { formLoginSchema, signIn, type LoginForm } from "~/shared/api";
import { useMutation } from "@tanstack/vue-query";
import type { NuxtError } from "#app";
import { ACCESS_TOKEN_NAME } from "~/app/constants/app.constants";
import { useAuthStore } from "~/shared/stores/auth.store";
import type { FormSubmitEvent } from "@nuxt/ui";

const cookie = useCookie(ACCESS_TOKEN_NAME);
const authStore = useAuthStore();
const serverError = ref<string | null>(null);
const toast = useToast();

const state = reactive<Partial<LoginForm>>({
  email: "",
  password: "",
});

const showPassword = ref(false);

const { mutate, isPending } = useMutation({
  mutationKey: ["register"],
  mutationFn: (data: LoginForm) => signIn(data),
  onError: (e: NuxtError) => (serverError.value = e.statusMessage || e.message),
  onSuccess: async ({ data }) => {
    cookie.value = data.accessToken;
    authStore.setUser(data.user);
    await navigateTo("/");
    toast.add({
      title: "Вы успешно вошли в аккаунт",
      icon: "carbon:two-factor-authentication",
      color: "success",
    });
  },
});

function onSubmit(event: FormSubmitEvent<LoginForm>) {
  serverError.value = null;
  mutate(event.data);
}
</script>

<template>
  <UForm
    :schema="formLoginSchema"
    :state="state"
    class="space-y-4 w-full"
    @submit="onSubmit"
  >
    <UFormField label="Почта" name="email" size="xl">
      <UInput
        v-model="state.email"
        class="w-full rounded-xl"
        color="secondary"
        placeholder="Введите вашу электронную почту"
        :ui="{
          base: 'rounded-sm',
        }"
      />
    </UFormField>

    <UFormField label="Пароль" name="password" size="xl">
      <UInput
        v-model="state.password"
        class="w-full"
        color="secondary"
        placeholder="Введите ваш пароль"
        :type="showPassword ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1', base: 'rounded-sm' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            aria-controls="password"
            @click="showPassword = !showPassword"
          />
        </template>
      </UInput>
    </UFormField>

    <UButton
      type="submit"
      color="secondary"
      size="xl"
      class="w-full flex items-center justify-center rounded-sm"
      :loading="isPending"
    >
      Войти
    </UButton>
  </UForm>
</template>
