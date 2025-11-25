import api from "~/app/config/axios";
import type { CreateProjectForm } from "~/entities/project/model";
import type { Project } from "~~/prisma/generated/prisma/client";

export const checkProjectLink = (link: string) => {
  return api.post<boolean>("/project/check-link", {
    link,
  });
};

export const createProject = (project: CreateProjectForm) => {
  return api.post<Project>("/project/create", project);
};
