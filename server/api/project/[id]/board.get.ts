import { prisma } from "~/shared/lib";

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, "id");

  const board = await prisma.board.findUnique({
    where: {
      projectId,
    },
    include: {
      statuses: {
        include: {
          status: true,
        },
        orderBy: {
          status: {
            order: "asc",
          },
        },
      },
    },
  });

  return board;
});
