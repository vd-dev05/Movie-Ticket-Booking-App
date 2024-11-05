import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";
import managerController from "../../controller/manager/index.js";
import postManager from "../../controller/manager/post/index.js";
import MovieMiddleware from "../../middleware/movie.js";



const ManagerRouter = Router();

ManagerRouter.get('/', authMiddleware.auhthorizationCinemaManager , managerController.loginManager)
ManagerRouter.post('/',authMiddleware.auhthorizationCinemaManager, MovieMiddleware.createMovie ,postManager.createMovie)
ManagerRouter.post('/ticket/:id',postManager.createTicketMovie)
// ManagerRouter.get('/:id', MovieController.getByID)

export default ManagerRouter;