<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import type { NuxtError } from "#app";
import { useAuthStore } from "~/shared/stores/auth.store";
import type { FormSubmitEvent } from "@nuxt/ui";
import { ROUTES } from "~/app/routes/app.routes";
import { formLoginSchema, type LoginForm } from "../model";
import { signIn } from "~/shared/api";

const authStore = useAuthStore();
const serverError = ref<string | null>(null);
const toast = useToast();

const state = reactive<Partial<LoginForm>>({
  email: "asd@mail.ru",
  password: "123123",
});

const showPassword = ref(false);

const { mutate, isPending } = useMutation({
  mutationKey: ["register"],
  mutationFn: (data: LoginForm) => signIn(data),
  onError: (e: NuxtError) => (serverError.value = e.statusMessage || e.message),
  onSuccess: async ({ data }) => {
    authStore.login(data.user, data.accessToken);
    await navigateTo(ROUTES.HOME);
    toast.add({
      title: "You're succesfully logged-in!",
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
  <UForm :schema="formLoginSchema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
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

    <UButton
      type="submit"
      color="secondary"
      size="xl"
      class="w-full flex items-center justify-center rounded-sm"
      :loading="isPending"
    >
      Login
    </UButton>
  </UForm>
</template>
