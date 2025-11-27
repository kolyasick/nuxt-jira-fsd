<script setup lang="ts">
import { useAuthStore } from "~/shared/stores/auth.store";
import { sideBarItems } from "../model";
import type { NavigationMenuItem } from "@nuxt/ui";
import { useProjectStore } from "~/shared/stores/project.store";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const route = useRoute();

const menuItems = computed<NavigationMenuItem[]>(() => {
  const slug = route.params.projectId as string;

  return sideBarItems.map((item) => {
    if (item.label === "Board" && slug) {
      return {
        ...item,
        href: `/${slug}/board`,
      };
    }
    return item;
  });
});
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
          data-allow-mismatch
          class="bg-purple-500 shrink-0 w-11 aspect-square rounded-full flex items-center justify-center text-white uppercase text-xl"
        >
          {{ authStore.user?.username.charAt(0) }}
        </div>
        <div v-if="!collapsed">
          <h2 class="text-xl font-medium leading-5 truncate">Teams in Space</h2>
          <span class="text-sm">{{
            projectStore.project?.title || "Software project"
          }}</span>
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
        :items="menuItems"
        orientation="vertical"
      />
    </template>
  </UDashboardSidebar>
</template>

<style scoped></style>
