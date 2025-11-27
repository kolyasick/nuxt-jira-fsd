<script setup lang="ts">
import draggableComponent from "vuedraggable";
import { KanbanColumn } from ".";
import { useDragColumn } from "../model";
import type { IBoardStatus } from "~/entities/board/model";

const statuses = defineModel<IBoardStatus[]>("statuses");

const { onColumnChange, isPending } = useDragColumn(statuses);
</script>

<template>
  <draggableComponent
    v-model="statuses"
    item-key="id"
    group="kanban-columns"
    :animation="200"
    handle=".column-handle"
    class="flex items-stretch gap-3 overflow-x-scroll w-full h-full"
    ghost-class="opacity-40"
    @change="onColumnChange"
  >
    <template #item="{ element }">
      <div class="w-[calc((100%-2.5rem)/4)] shrink-0">
        <KanbanColumn
          :column="element.status.title"
          :items="[]"
          :class="{ 'opacity-60 pointer-events-none': isPending }"
        />
      </div>
    </template>
  </draggableComponent>
</template>
