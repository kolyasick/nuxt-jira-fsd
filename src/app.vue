<script setup lang="ts">
import { getProfile } from "./widgets/auth/model";

await getProfile();

const Welcome = defineAsyncComponent({
  loader: () => import("@widgets/welcome/ui/welcome.vue"),
  delay: 300,
});
</script>
<template>
  <UApp
    :toaster="{
      position: 'top-right',
    }"
  >
    <NuxtPage />
    <Welcome v-if="false" />
  </UApp>
</template>
