import { Router } from "express";
import MovieController from '../../controller/movie/movie.controller.js'
// import middlewares from "../../middlewares/index.js";

const MovieRouter = Router();

MovieRouter.get('/', MovieController.getMovie)
MovieRouter.get('/:id', MovieController.getByID)

export default MovieRouter;