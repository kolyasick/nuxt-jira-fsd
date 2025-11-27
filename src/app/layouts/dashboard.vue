<script setup lang="ts">
import { Sidebar } from "~/widgets/sidebar/ui";

const slots = defineSlots<{
  default(): any;
  header(): any;
}>();
</script>

<template>
  <UDashboardGroup :persistent="false">
    <Sidebar />

    <main class="flex flex-col p-10 w-full">
      
      <slot />
    </main>
  </UDashboardGroup>
</template>

<style scoped></style>
