import { prismaClient } from "../../database/index";
import { AppError } from "../../errors";

const deleteCommentService = async (id: number) => {

    const deletedComment = await prismaClient.comment.findUnique({
        where: { id },
    });

    if(!deletedComment) throw new AppError("comentário não encontrado!", 404)


    await prismaClient.comment.delete({
        where: { id },
    });

    
};

export { deleteCommentService };
