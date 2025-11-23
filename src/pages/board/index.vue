<script setup lang="ts">
import { Title } from "~/shared/ui/board";
import { Kanban } from "~/widgets/board/ui";
</script>

<template>
  <NuxtLayout name="dashboard">
    <template #header>
      <div class="flex items-start justify-between">
        <Title title="Board" />
        <div class="flex items-center gap-2">
          <UButton
            :ui="{
              base: 'bg-neutral-100 hover:bg-neutral-200 px-3 py-2 text-neutral-600 rounded-none',
            }"
            >Release</UButton
          >

          <button>
            <UIcon name="solar:menu-dots-bold" size="30" />
          </button>
        </div>
      </div>
    </template>

    <Kanban />
  </NuxtLayout>
</template>
