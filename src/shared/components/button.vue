<script setup lang="ts">
type Props = {
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
};

const { type = "button" } = defineProps<Props>();
</script>
<template>
  <button
    :type
    :disabled="disabled || isLoading"
    class="w-full text-white p-2 rounded-sm bg-blue-600 hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none inline-flex justify-center items-center"
  >
    <LucideLoaderCircle v-if="isLoading" class="w-5 h-5 animate-spin" />
    <slot v-else />
  </button>
</template>
