import { string, z } from "zod";

 const createCommentBody = z.object({
    description: z.string()
 })

 export {createCommentBody}