<script setup lang="ts">
import { toRef } from "vue";
import type { Card } from "../model/use-drag-card";
import { KanbanCard } from ".";
import draggableComponent from "vuedraggable";

type Props = {
  column: string;
  items: Card[];
};
const props = defineProps<Props>();
const columnItems = toRef(props, "items");
</script>

<template>
  <div class="bg-neutral-100 px-2 pt-4 pb-2 min-h-[500px] flex flex-col">
    <div class="uppercase font-semibold text-gray-600 select-none flex items-start gap-2">
      <button class="column-handle">
        <UIcon name="mingcute:dots-vertical-fill" size="20" />
      </button>
      <span>{{ column }} {{ columnItems.length }}</span>
    </div>

    <draggableComponent
      :list="columnItems"
      item-key="id"
      group="kanban-cards"
      class="flex flex-col gap-2 mt-4 flex-1"
      :animation="100"
      ghost-class="opacity-50"
    >
      <template #item="{ element }">
        <div :key="element.id">
          <KanbanCard :item="element" />
        </div>
      </template>
    </draggableComponent>
  </div>
</template>
