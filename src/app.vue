<script setup lang="ts">
import { getProfile } from "./widgets/auth/model";

await getProfile();

const route = useRoute();
</script>
<template>
  <UApp
    :toaster="{
      position: 'top-right',
    }"
  >
    <NuxtPage />
  </UApp>
</template>
