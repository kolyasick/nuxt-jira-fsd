<script setup lang="ts">
import type { Card } from "../model/use-drag-card";

defineProps<{
  item: Card;
}>();
</script>

<template>
  <div
    class="w-full min-h-[200px] bg-white text-slate-900 p-5 cursor-pointer shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300"
  >
    <p class="select-none">{{ item.text }}</p>
  </div>
</template>
