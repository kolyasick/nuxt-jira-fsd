<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
interface Props {
  name: string;
  type: string;
  placeholder?: string;
  hasError: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <Field
      v-bind="props"
      class="border p-2 rounded-sm w-full"
      :class="hasError ? 'border-red-500' : 'border-gray-200'"
    />
    <ErrorMessage
      class="block text-red-500 text-sm font-semibold"
      :name="props.name"
    />
  </div>
</template>
