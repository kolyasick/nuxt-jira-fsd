<script setup lang="ts">
import { Sidebar } from "~/widgets/sidebar/ui";

const slots = defineSlots<{
  default(): any;
  header(): any;
}>();
</script>

<template>
  <UDashboardGroup>
    <Sidebar />

    <main class="flex flex-col p-10 w-full">
      <div v-if="$slots.header" class="mb-10">
        <slot name="header" />
      </div>
      <slot />
    </main>
  </UDashboardGroup>
</template>

<style scoped></style>
