<script setup lang="ts">
import type { CreateProjectForm } from "~/entities/project/model";
import { BoardSettings, CreateProject, NameProject } from "@widgets/welcome/ui";
import { useAuthStore } from "~/shared/stores/auth.store";
import { ModalLayout } from "~/shared/ui/modal";
import { useMutation } from "@tanstack/vue-query";
import { createProject } from "~/shared/api";

const emit = defineEmits<{
  close: [];
}>();

const authStore = useAuthStore();

const steps = ["create", "name", "board"] as const;
const result = reactive<CreateProjectForm>({
  link: "",
  title: "",
  userId: authStore.user?.id || "",
  boardItems: [],
});

const currentStepIndex = ref<number>(0);
const currentStep = computed(() => {
  return steps[currentStepIndex.value];
});

const { mutateAsync, isPending } = useMutation({
  mutationKey: ["create-project"],
  mutationFn: () => createProject(result),
  onSuccess: ({ data }) => {
    console.log(data);
  },
});

const goToNextStep = (data?: Partial<CreateProjectForm>) => {
  if (data) {
    Object.assign(result, data);
  }
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++;
  } else {
    mutateAsync().then(() => emit("close"));
  }
};

const isCreateProjectShow = computed(() => currentStep.value === "create");
const isNameProjectShow = computed(() => currentStep.value === "name");
const isBoardShow = computed(() => currentStep.value === "board");
</script>

<template>
  <NuxtLayout name="dashboard">
    <ModalLayout>
      <Transition name="form-transition" mode="out-in">
        <CreateProject
          v-if="isCreateProjectShow"
          key="create"
          @next="goToNextStep"
        />
        <NameProject
          v-else-if="isNameProjectShow"
          key="name"
          @next="goToNextStep"
        />
        <BoardSettings
          v-else-if="isBoardShow"
          key="board"
          @next="goToNextStep"
        />
      </Transition>
    </ModalLayout>

    <div class="w-full h-full flex flex-col items-center justify-center gap-5">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Create or join project to start!</h1>
        <p>It's totally free. Try it yourself!</p>
      </div>

      <div class="flex items-center gap-2">
        <UButton color="secondary" variant="subtle" size="lg">CREATE</UButton>
        <UButton size="lg">JOIN</UButton>
      </div>
    </div>
  </NuxtLayout>
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
