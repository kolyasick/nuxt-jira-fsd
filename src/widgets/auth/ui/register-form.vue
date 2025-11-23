<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import type { NuxtError } from "#app";
import { ACCESS_TOKEN_NAME } from "@app/constants/app.constants";
import { useAuthStore } from "~/shared/stores/auth.store";
import { formRegisterSchema, signUp, type RegisterForm } from "~/shared/api";
import type { FormSubmitEvent } from "@nuxt/ui";
import { ROUTES } from "~/app/routes/app.routes";

const cookie = useCookie(ACCESS_TOKEN_NAME);
const authStore = useAuthStore();
const toast = useToast();

const serverError = ref<string | null>(null);

const state = reactive<Partial<RegisterForm>>({
  username: "",
  email: "",
  password: "",
  passwordRepeat: "",
});

const showPassword = ref(false);

const { mutate, isPending, data } = useMutation({
  mutationKey: ["register"],
  mutationFn: (data: RegisterForm) => signUp(data),
  onError: (e: NuxtError) => (serverError.value = e.statusMessage || e.message),
  onSuccess: ({ data }) => {
    cookie.value = data.accessToken;
    authStore.setUser(data.user);
    navigateTo(ROUTES.HOME);
    toast.add({
      title: "Вы успешно создали аккаунт!",
      icon: "carbon:two-factor-authentication",
      color: "success",
    });
  },
});

function onSubmit(event: FormSubmitEvent<RegisterForm>) {
  serverError.value = null;
  mutate(event.data);
}
</script>

<template>
  <UForm
    :schema="formRegisterSchema"
    :state="state"
    class="space-y-2 w-full"
    @submit="onSubmit"
  >
    <UFormField label="Имя" name="username" size="xl">
      <UInput
        v-model="state.username"
        class="w-full rounded-xl"
        color="secondary"
        placeholder="Введите ваше имя"
        :ui="{
          base: 'rounded-sm',
        }"
      />
    </UFormField>
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

    <UFormField label="Повтор пароля" name="passwordRepeat" size="xl">
      <UInput
        v-model="state.passwordRepeat"
        class="w-full"
        color="secondary"
        placeholder="Повторите ваш пароль"
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
