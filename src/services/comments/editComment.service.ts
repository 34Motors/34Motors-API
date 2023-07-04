import { prismaClient } from "../../database/index";
import { AppError } from "../../errors";
import { ICommentBody } from "../../interfaces/comment.interfaces";

const editCommentService = async (data:ICommentBody, id: number) => {

    const comment = await prismaClient.comment.findUnique({
        where: {
          id: id,
        },
      });

      
      if(!comment) throw new AppError("comentário não encontrado!", 404)
    
    const editedComment = await prismaClient.comment.update({
        where: {
          id: id,
        },
        data: data ,
      });

    
      return editedComment;

    
};

export { editCommentService };
