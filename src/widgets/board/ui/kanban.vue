<script setup lang="ts">
import draggableComponent from "vuedraggable";
import { KanbanColumn } from ".";

type Column = {
  title: string;
  items: { id: number; text: string }[];
};

const columns = ref<Column[]>([
  {
    title: "to do",
    items: [
      {
        id: 1,
        text: "1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "in progress",
    items: [
      {
        id: 2,
        text: "2Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "code review",
    items: [
      {
        id: 3,
        text: "3Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "done",
    items: [
      {
        id: 4,
        text: "4Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "test",
    items: [
      {
        id: 5,
        text: "5Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
]);
</script>

<template>
  <draggableComponent
    v-model="columns"
    item-key="title"
    group="kanban-columns"
    :animation="200"
    handle=".column-handle"
    class="flex items-stretch gap-3 overflow-x-scroll w-full h-full"
    ghost-class="opacity-40"
  >
    <template #item="{ element }">
      <div class="w-[calc((100%-2.5rem)/4)] shrink-0">
        <KanbanColumn :column="element.title" :items="element.items" />
      </div>
    </template>
  </draggableComponent>
</template>
