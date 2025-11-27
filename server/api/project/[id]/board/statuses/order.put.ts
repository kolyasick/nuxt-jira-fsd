import { prisma } from "~/shared/lib";

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, "id");
  const { statusIds } = await readBody(event);

  if (!Array.isArray(statusIds)) {
    throw createError({
      statusCode: 400,
      message: "statusIds must be an array",
    });
  }

  await prisma.$transaction(
    statusIds.map((statusId: number, index: number) =>
      prisma.boardStatus.update({
        where: { id: statusId },
        data: { order: index },
      })
    )
  );

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
