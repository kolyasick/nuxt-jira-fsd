<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <h1 class="text-3xl font-semibold text-secondary-950">{{ title }}</h1>
</template>
