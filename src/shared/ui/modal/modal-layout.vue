<script setup lang="ts">
const emits = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div
    @click.self="$emit('close')"
    class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center"
  >
    <slot />
  </div>
</template>
