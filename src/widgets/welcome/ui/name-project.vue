<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  formProjectTitleSchema,
  type ProjectTitleForm,
} from "~/entities/project/model";
import scrumImage from "@app/assets/images/scrum.png";

const emit = defineEmits<{
  next: [data?: { title: string }];
}>();

const isLoading = ref(false);

const state = reactive<Partial<ProjectTitleForm>>({
  title: "My Scrum Project",
});

function onSubmit(event: FormSubmitEvent<ProjectTitleForm>) {
  if (event.data.title) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      emit("next", { title: event.data.title });
    }, 1000);
  }
}
</script>

<template>
  <div
    class="bg-white max-w-[1200px] w-full h-[600px] rounded-md shadow-md flex items-center flex-col py-10 px-20"
  >
    <div class="mb-4">
      <span class="text-2xl text-slate-900 font-normal">Jira</span>
    </div>

    <div class="h-full grid grid-cols-2 gap-5">
      <div class="flex flex-col gap-8">
        <div class="space-y-3">
          <h1 class="text-2xl font-medium text-slate-900">
            Name your first project
          </h1>
          <span
            >Projects bring your work to life, helping your team track progress,
            stay organized, and manage tasks.</span
          >
        </div>

        <UForm
          ref="form"
          :schema="formProjectTitleSchema"
          :validate-on="['input', 'change']"
          :validate-on-input-delay="0"
          :state="state"
          class="h-full flex flex-col justify-between"
          @submit="onSubmit"
        >
          <div>
            <UFormField
              label="Name your project"
              name="title"
              size="xl"
              :ui="{
                label: 'text-sm font-semibold',
                error: 'mt-1 text-sm',
              }"
            >
              <UInput
                v-model="state.title"
                class="w-full"
                :ui="{ base: 'rounded-sm' }"
                color="neutral"
                placeholder="Name your project"
              />
            </UFormField>

            <div class="mt-8">
              <span class="text-sm font-semibold">Example project names:</span>
              <div class="text-sm font-light mt-2">
                Team Astro, Visual upgrade, Bug tracking, Product launch
              </div>
            </div>
          </div>

          <UButton
            type="submit"
            color="secondary"
            size="xl"
            :loading="isLoading"
            :ui="{
              base: 'rounded-sm flex items-center justify-center font-semibold self-end',
            }"
          >
            Get started
          </UButton>
        </UForm>
      </div>

      <img class="self-center" :src="scrumImage" alt="" />
    </div>
  </div>
</template>
