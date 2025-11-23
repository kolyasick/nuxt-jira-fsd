<script setup lang="ts">
import { sideBarItems } from "../model";
</script>

<template>
  <UDashboardSidebar
    resizable
    collapsible
    :collapsed-size="4"
    :ui="{
      body: 'p-5 bg-slate-100',
      header: 'h-auto bg-slate-100 px-4 pt-5 overflow-x-hidden',
    }"
  >
    <template #header="{ collapsed }">
      <div class="flex items-center gap-3">
        <div
          class="bg-purple-500 shrink-0 w-11 aspect-square rounded-full"
        ></div>
        <div v-if="!collapsed">
          <h2 class="text-xl font-medium leading-5 truncate">Teams in Space</h2>
          <span class="text-sm">Software project</span>
        </div>
      </div>
    </template>
    <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
      <UDashboardResizeHandle
        class="after:absolute after:bg-slate-100 after:inset-y-0 after:right-0 after:w-px hover:after:bg-slate-400 after:transition"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @dblclick="onDoubleClick"
      />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        :collapsed
        :tooltip="true"
        color="secondary"
        :items="sideBarItems"
        orientation="vertical"
      />
    </template>
  </UDashboardSidebar>
</template>

<style scoped></style>
