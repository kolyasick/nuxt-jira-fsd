import type { BoardWithStatuses } from "~/entities/board/model";
import type { Project } from "~~/prisma/generated/prisma/client";

export const useProjectStore = defineStore("project", () => {
  const project = ref<Project | null>(null);
  const board = ref<BoardWithStatuses | null>(null);

  function setProject(data: Project | null) {
    project.value = data;
  }

  function setBoard(data: BoardWithStatuses | null) {
    board.value = data;
  }

  return {
    project,
    setProject,
    board,
    setBoard,
  };
});
