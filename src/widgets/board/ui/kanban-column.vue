<script setup lang="ts">
import type { Card } from "../model/use-drag-card";

type Props = {
  column: string;
  items: { id: number; text: string }[];
  isDragging: boolean;
  dragItem: Card | null;
};
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "onDragStart", event: DragEvent, card: Card, source: string): void;
  (e: "onDragOver", event: DragEvent): void;
  (e: "onDragEnd"): void;
  (e: "onDrop", event: DragEvent, column: string): void;
}>();
</script>

<template>
  <div
    @dragover="(e) => emits('onDragOver', e)"
    @drop="(e) => emits('onDrop', e, column)"
    class="bg-neutral-100 px-2 pt-4 pb-2 min-h-screen h-fit"
  >
    <span class="uppercase font-semibold text-gray-600 select-none">
      {{ column }} {{ items.length }}
    </span>

    <div v-if="items.length > 0" class="flex flex-col gap-2 mt-4">
      <div
        draggable="true"
        @dragstart="(e) => emits('onDragStart', e, item, column)"
        @dragend="() => emits('onDragEnd')"
        v-for="(item, index) in items"
        :key="item.id"
        class="w-full min-h-[200px] bg-white text-slate-900 p-5 cursor-pointer shadow-sm border border-gray-200 transition-all duration-200"
        :class="[
          {
            'opacity-50 border-2 border-blue-400 cursor-grabbing':
              dragItem?.id === item.id,
            'hover:shadow-md hover:border-gray-300': dragItem?.id !== item.id,
          },
        ]"
      >
        <p class="select-none">{{ item.text }}</p>
      </div>
    </div>

    <div
      v-else
      class="flex items-center justify-center min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg mt-4"
    >
      <span class="text-gray-400 select-none">Перетащите сюда</span>
    </div>
  </div>
</template>
