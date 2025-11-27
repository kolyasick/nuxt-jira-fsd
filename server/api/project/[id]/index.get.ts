import { prisma } from "~/shared/lib";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      manager: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page not found",
      fatal: true,
    });
  }

  return project;
});
