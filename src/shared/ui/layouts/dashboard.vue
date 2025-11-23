<script setup lang="ts">
import { Sidebar } from "~/widgets/dashboard/ui";
</script>

<template>
  <UDashboardGroup>
    <Sidebar />

    <main class="flex flex-col p-5 w-full">
      <slot />
    </main>
  </UDashboardGroup>
</template>

<style scoped></style>
