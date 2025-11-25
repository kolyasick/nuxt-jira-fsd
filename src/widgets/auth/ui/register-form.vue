<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import type { NuxtError } from "#app";
import { useAuthStore } from "~/shared/stores/auth.store";

import type { FormSubmitEvent } from "@nuxt/ui";
import { ROUTES } from "~/app/routes/app.routes";
import { signUp } from "~/shared/api";
import { formRegisterSchema, type RegisterForm } from "../model";

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
    authStore.login(data.user, data.accessToken);
    navigateTo(ROUTES.HOME);
    toast.add({
      title: "You're succesfully created an account!",
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
  <UForm :schema="formRegisterSchema" :state="state" class="space-y-2 w-full" @submit="onSubmit">
    <UFormField
      label="Name"
      name="username"
      size="xl"
      :ui="{
        label: 'text-sm font-semibold',
        error: 'text-sm font-medium mt-0',
      }"
    >
      <UInput
        v-model="state.username"
        class="w-full rounded-xl"
        color="secondary"
        placeholder="Type your name"
        :ui="{
          base: 'rounded-sm',
        }"
      />
    </UFormField>
    <UFormField
      label="Email"
      name="email"
      size="xl"
      :ui="{
        label: 'text-sm font-semibold',
        error: 'text-sm font-medium mt-0',
      }"
    >
      <UInput
        v-model="state.email"
        class="w-full rounded-xl"
        color="secondary"
        placeholder="Type your email"
        :ui="{
          base: 'rounded-sm',
        }"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
      size="xl"
      :ui="{
        label: 'text-sm font-semibold',
        error: 'text-sm font-medium mt-0',
      }"
    >
      <UInput
        v-model="state.password"
        class="w-full"
        color="secondary"
        placeholder="Type your password"
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

    <UFormField
      label="Repeat password"
      name="passwordRepeat"
      size="xl"
      :ui="{
        label: 'text-sm font-semibold',
        error: 'text-sm font-medium mt-0',
      }"
    >
      <UInput
        v-model="state.passwordRepeat"
        class="w-full"
        color="secondary"
        placeholder="Repeat your password"
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
      Create
    </UButton>
  </UForm>
</template>
