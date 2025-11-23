<script setup lang="ts">
import { getProfile } from "./widgets/auth/model";

const { isLoading } = await getProfile();
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
