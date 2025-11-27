<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { IBoardStatus } from "~/entities/board/model";
import { findProject, getBoard } from "~/shared/api";
import { useProjectStore } from "~/shared/stores/project.store";
import { Title } from "~/shared/ui/board";
import { Kanban } from "~/widgets/board/ui";

const projectStore = useProjectStore();
const route = useRoute();
const projectId = route.params.projectId as string;
const statuses = ref<IBoardStatus[]>([]);

const { data: project, suspense } = useQuery({
  queryKey: ["project", projectId],
  queryFn: async () => {
    const { data } = await findProject(projectId);

    return data;
  },
  staleTime: 5 * 60 * 1000,
});

const { data: board, isLoading } = useQuery({
  queryKey: ["board", projectId],
  queryFn: async () => {
    const { data } = await getBoard(projectId);
    return data;
  },
});

await suspense();

watch(project, () => {
  if (project.value) {
    projectStore.setProject(project.value);
  }
});

watch(board, () => {
  if (board.value) {
    statuses.value = board.value.statuses;
  }
});
</script>

<template>
  <NuxtLayout data-allow-mismatch name="dashboard">
    <div class="flex items-start justify-between mb-10">
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

    <ClientOnly v-if="isLoading">
      <div class="w-full h-full flex items-center justify-center asd">
        <UIcon name="bx:loader-alt" size="120" class="animate-spin text-slate-400" />
      </div>
    </ClientOnly>

    <Kanban v-else-if="!isLoading && statuses.length > 0" v-model:statuses="statuses" />
  </NuxtLayout>
</template>
