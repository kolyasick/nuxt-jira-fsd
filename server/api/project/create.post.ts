import { formCreateProjectSchema } from "~/entities/project/model";
import { prisma } from "~/shared/lib";

export default defineEventHandler(async (event) => {
  const { title, userId, link, boardItems } = await readValidatedBody(
    event,
    (data) => formCreateProjectSchema.parse(data)
  );

  const project = await prisma.project.create({
    data: {
      id: link,
      title,
      userId,
      board: {
        create: {
          statuses: {
            create: boardItems.map((item, index) => ({
              status: {
                create: {
                  title: item.status,
                  order: index,
                },
              },
            })),
          },
        },
      },
    },
  });

  return project;
});
