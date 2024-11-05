import { Router } from "express";
import UserRouter from "./user.js";
import MovieRouter from "./movie.js";
import AdminRouter from "./admin.js";
import ManagerRouter from "./manager.js";
import { DB_CONFIG } from "../../config/db.config.js"
import CommentRouter from "./comments.js";
// import PostRouter from "./post.js";
// import CommentRouter from "./comment.js";
// import RouterAuthentication from "./authentication.js";
const RouterV1 = Router();


RouterV1.use(DB_CONFIG.resources.users.contextPath, UserRouter);
RouterV1.use(DB_CONFIG.resources.movie.contextPath, MovieRouter);
RouterV1.use(DB_CONFIG.resources.admin.contextPath,AdminRouter)
RouterV1.use(DB_CONFIG.resources.manager.contextPath, ManagerRouter)
RouterV1.use(DB_CONFIG.resources.comments.contextPath, CommentRouter)
// RouterV1.use('/comments', CommentRouter);
// RouterV1.use('/authentication', RouterAuthentication);

export default RouterV1;