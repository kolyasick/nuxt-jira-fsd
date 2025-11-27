import api from "~/app/config/axios";
import type { BoardWithStatuses } from "~/entities/board/model";
import type { CreateProjectForm } from "~/entities/project/model";
import type { Board, Project } from "~~/prisma/generated/prisma/client";

export const checkProjectLink = (link: string) => {
  return api.post<boolean>("/project/check-link", {
    link,
  });
};

export const createProject = (project: CreateProjectForm) => {
  return api.post<Project>("/project/create", project);
};

export const findProject = (id: string) => {
  return api.get<Project & { manager: { username: string; email: string } }>(
    `/project/${id}`
  );
};

export const getBoard = (projectId: string) => {
  return api.get<BoardWithStatuses>(`/project/${projectId}/board`);
};

export const updateStatusesOrder = (projectId: string, statusIds: number[]) => {
  return api.put<BoardWithStatuses>(
    `/project/${projectId}/board/statuses/order`,
    { statusIds }
  );
};