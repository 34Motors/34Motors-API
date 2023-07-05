import { prismaClient } from "../../database";

const getCommentsService = async (carId: number) => {
  const comments = await prismaClient.comment.findMany({
    where: {
      carId: carId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          userColor:true
        },
      },
    },
  });

  return comments;
};

export { getCommentsService };
