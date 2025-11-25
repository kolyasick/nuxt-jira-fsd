import { formProjectLinkSchema } from "~/entities/project/model";
import { prisma } from "~/shared/lib";

export default defineEventHandler(async (event) => {
  const { link } = await readValidatedBody(event, (data) => formProjectLinkSchema.parse(data));

  const project = await prisma.project.findUnique({
    where: {
      id: link,
    },
  });

  return !!project;
});
