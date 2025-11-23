<script setup lang="ts">
import { KanbanColumn } from ".";
import { useDragCard } from "../model/use-drag-card";

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
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "in progress",
    items: [
      {
        id: 2,
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "code review",
    items: [
      {
        id: 3,
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "done",
    items: [
      {
        id: 4,
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
  {
    title: "test",
    items: [
      {
        id: 5,
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, dicta enim? Necessitatibus animi commodi, cum magnam sequi quaerat eum cupiditate",
      },
    ],
  },
]);

const {
  dragItem,
  isDragging,
  onDragEnd,
  onDragOver,
  onDragStart,
  onDrop,
  sourceColumn,
} = useDragCard();

const onDragDrop = (e: DragEvent, column: string) => {
  if (column === sourceColumn.value) {
    console.log("same");
    return;
  }

  columns.value = columns.value.map((c) => {
    return c.items.some((i) => i.id === dragItem.value?.id)
      ? { ...c, items: c.items.filter((i) => i.id !== dragItem.value?.id) }
      : c.title === column
      ? { ...c, items: [...c.items, dragItem.value!] }
      : c;
  });
  onDrop(e);
};
</script>

<template>
  <div class="flex items-start gap-3 overflow-x-scroll w-full h-full">
    <KanbanColumn
      @on-drag-start="onDragStart"
      @on-drag-over="onDragOver"
      @on-drag-end="onDragEnd"
      @on-drop="onDragDrop"
      :is-dragging="isDragging"
      :drag-item="dragItem"
      v-for="column in columns"
      :key="column.title"
      :column="column.title"
      :items="column.items"
      class="w-[calc((100%-2.5rem)/4)] shrink-0"
    />
  </div>
</template>
