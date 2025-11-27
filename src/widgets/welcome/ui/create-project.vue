<script setup lang="ts">
import { useAuthStore } from "~/shared/stores/auth.store";
import { formProjectLinkSchema, type ProjectLinkForm } from "~/entities/project/model";
import type { FormSubmitEvent } from "@nuxt/ui";
import { APP_URL } from "~/app/constants/app.constants";         
import { checkLinkAvialible } from "../model/check-link-avialible";

const emit = defineEmits<{
  next: [data?: { link: string }];
}>();

const { debouncedCheckLink, isLoading, error: serverError } = checkLinkAvialible();
const authStore = useAuthStore();

const form = useTemplateRef<{ errors: Array<unknown> } | null>("form");

const state = reactive({
  link: authStore.user?.email.split("@")[0],
});

function onSubmit(event: FormSubmitEvent<ProjectLinkForm>) {
  if (isSuccess.value && !hasErrors.value) {
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
      emit("next", { link: state.link! });
    }, 1000);
  }
}

const hasValidationErrors = computed<boolean>(() => {
  return !!form.value?.errors.length;
});

const hasErrors = computed<boolean>(() => {
  return hasValidationErrors.value || !!serverError.value;
});

const isSuccess = computed<boolean>(() => {
  return !!state.link && !hasErrors.value;
});

watch(
  () => state.link,
  (newLink) => {
    if (newLink) {
      debouncedCheckLink(newLink);
    }
  },
  { immediate: true }
);
</script>

<template>
    <div
      class="bg-white max-w-[500px] w-full min-h-[400px] rounded-md shadow-md flex items-center flex-col py-10 px-14"
    >
      <div class="mb-4">
        <span class="text-2xl text-slate-900 font-normal">Jira</span>
      </div>
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold text-slate-900" data-allow-mismatch>
          Welcome back, {{ authStore.user?.username }}
        </h1>
        <span>It's free for up to 10 users - no credit card needed.</span>
      </div>

      <UForm
        ref="form"
        :schema="formProjectLinkSchema"
        :validate-on="['input', 'change']"
        :validate-on-input-delay="0"
        :state="state"
        class="space-y-5 w-full mt-5"
        @submit="onSubmit"
      >
        <UFormField
          label="Your site"
          name="link"
          size="xl"
          :error="serverError || undefined"
          :ui="{
            label: 'text-sm font-semibold',
            error: 'mt-1 text-sm',
          }"
        >
          <UInput
            v-model="state.link"
            class="w-full"
            :color="isSuccess ? 'success' : hasErrors ? 'error' : 'secondary'"
            placeholder="Type your site link"
            :trailing-icon="isSuccess ? 'ix:success' : undefined"
            :style="`padding-left: 120px;`"
            :ui="{
              trailingIcon: 'text-green-600',
              base: `${isSuccess ? 'ring-green-600' : ''} rounded-full`,
            }"
          >
            <span class="absolute top-1/2 -translate-y-1/2 left-4 text-sm text-muted select-none"
              >{{ APP_URL.split("//")[1] }}/</span
            ></UInput
          >
        </UFormField>

        <UButton
          type="submit"
          color="secondary"
          size="xl"
          :loading="isLoading"
          :disabled="!isSuccess || hasErrors || isLoading"
          :ui="{
            base: 'rounded-full w-full flex items-center justify-center font-semibold',
          }"
        >
          Continue
        </UButton>
      </UForm>
    </div>
</template>
