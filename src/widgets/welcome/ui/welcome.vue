<script setup lang="ts">
import type { CreateProjectForm } from "~/entities/project/model";
import { BoardSettings, CreateProject, NameProject } from ".";
import { useAuthStore } from "~/shared/stores/auth.store";

const authStore = useAuthStore();

const steps = ["create", "name", "board"] as const;

const result = reactive<Partial<CreateProjectForm>>({
  link: "",
  title: "",
  userId: authStore.user?.id,
});

const currentStepIndex = ref<number>(0);

const currentStep = computed(() => {
  return steps[currentStepIndex.value];
});

function goToNextStep(data?: Partial<CreateProjectForm>) {
  if (data) {
    Object.assign(result, data);
  }
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++;
  }
}

const isCreateProjectShow = computed(() => currentStep.value === "create");
const isNameProjectShow = computed(() => currentStep.value === "name");
const isBoardShow = computed(() => currentStep.value === "board");
</script>

<template>
  <Transition name="form-transition" mode="out-in">
    <CreateProject v-if="isCreateProjectShow" key="create" @next="goToNextStep" />
    <NameProject v-else-if="isNameProjectShow" key="name" @next="goToNextStep" />
    <BoardSettings v-else-if="isBoardShow" key="board" @next="goToNextStep" />
  </Transition>
</template>

<style scoped>
.form-transition-enter-active,
.form-transition-leave-active {
  transition: all 0.3s ease-in-out;
}

.form-transition-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.form-transition-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.form-transition-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.form-transition-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
