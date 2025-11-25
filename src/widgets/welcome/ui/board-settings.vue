<script setup lang="ts">
import { ModalLayout } from "~/shared/ui/modal";

const emit = defineEmits<{
  next: [];
}>();
</script>

<template>
  <ModalLayout>
    <div class="bg-white max-w-[1200px] w-full h-[600px] rounded-md shadow-md flex items-center flex-col py-10 px-20">
      <div class="mb-4">
        <span class="text-2xl text-slate-900 font-normal">Jira</span>
      </div>
    </div>
  </ModalLayout>
</template>
