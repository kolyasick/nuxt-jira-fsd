import * as zod from "zod";

export const formProjectLinkSchema = zod.object({
  link: zod.string().min(3, { error: "Type at least 3 letters" }),
});

export const formProjectTitleSchema = zod.object({
  title: zod.string().min(3, { error: "Type at least 3 letters" }),
});

export const formCreateProjectSchema = formProjectLinkSchema.merge(formProjectTitleSchema).merge(
  zod.object({
    userId: zod.cuid({ error: "Invalid user id" }),
  })
);

export type ProjectLinkForm = zod.infer<typeof formProjectLinkSchema>;
export type ProjectTitleForm = zod.infer<typeof formProjectTitleSchema>;
export type CreateProjectForm = zod.infer<typeof formCreateProjectSchema>;
