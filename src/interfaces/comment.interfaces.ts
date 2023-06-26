import { z } from "zod";
import { createCommentBody } from "../schemas/comments.schema";

type ICommentBody = z.infer<typeof createCommentBody>

export { ICommentBody }