import { Router } from "express";
import CommentController from "../../controller/comments/index.js";

const CommentRouter = Router();
CommentRouter.post('/:id',CommentController.createComment)
export default CommentRouter;