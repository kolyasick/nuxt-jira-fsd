<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  boardFormSchema,
  type BoardFormSchema,
  type BoardItemSchema,
} from "~/entities/board/model";

const emit = defineEmits<{
  next: [data: { boardItems: BoardItemSchema[] }];
}>();

const isLoading = ref<boolean>(false);

const state = reactive<BoardFormSchema>({
  boardItems: [
    {
      status: "To Do",
    },
    {
      status: "In Progress",
    },
    {
      status: "In Review",
    },
    {
      status: "Done",
    },
  ],
});

function addItem() {
  state.boardItems.push({ status: "" });
}

function removeItem(index: number) {
  if (state.boardItems.length > 1) {
    state.boardItems.splice(index, 1);
  } else {
    console.warn("Cannot remove the last status");
  }
}

async function onSubmit(event: FormSubmitEvent<BoardFormSchema>) {
  // console.log(event.data);
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    emit("next", { boardItems: event.data.boardItems });
  }, 1000);
}
</script>

<template>
  <div
    class="bg-white max-w-[1200px] w-full h-[600px] rounded-md shadow-md flex items-center flex-col py-10 px-20"
  >
    <div class="mb-4">
      <span class="text-2xl text-slate-900 font-normal">Jira</span>
    </div>

    <div class="h-full w-full grid grid-cols-2 gap-5">
      <div class="flex flex-col gap-8">
        <div class="space-y-3">
          <h1 class="text-2xl font-medium text-slate-900">
            How do you track work?
          </h1>
          <span>As you complete work, it moves through these statuses.</span>
        </div>

        <UForm :schema="boardFormSchema" :state="state" @submit="onSubmit">
          <div class="flex flex-col gap-2">
            <div
              v-for="(item, index) in state.boardItems"
              :key="index"
              class="flex items-center gap-6 w-full"
            >
              <UFormField :name="`items.${index}.status`" class="w-full">
                <UInput
                  v-model="state.boardItems[index]!.status"
                  color="neutral"
                  size="lg"
                  class="w-full"
                  :ui="{
                    base: 'rounded-sm ring-2',
                  }"
                />
              </UFormField>

              <div class="flex gap-2">
                <button
                  type="button"
                  @click="removeItem(index)"
                  :disabled="state.boardItems.length <= 1"
                >
                  <UIcon
                    name="material-symbols:add"
                    size="25"
                    class="rotate-45"
                    :class="{ 'opacity-50': state.boardItems.length <= 1 }"
                  />
                </button>
              </div>
            </div>

            <button
              type="button"
              @click="addItem"
              class="flex items-center gap-1 mt-2 ml-2"
            >
              <UIcon name="material-symbols:add" size="20" />
              Add status
            </button>
          </div>

          <div class="mt-4 justify-self-end">
            <UButton
              type="submit"
              color="secondary"
              size="xl"
              :loading="isLoading"
              :ui="{
                base: 'rounded-sm flex items-center justify-center font-semibold self-end',
              }"
              >Submit</UButton
            >
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>
