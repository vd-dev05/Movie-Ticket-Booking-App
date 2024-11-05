import { Router } from "express";
import MovieController from '../../controller/movie/movie.controller.js'
// import middlewares from "../../middlewares/index.js";

const MovieRouter = Router();

MovieRouter.get('', MovieController.getAllMovie)
MovieRouter.get('/search', MovieController.searchMovie)
MovieRouter.get('/:id', MovieController.getByID)
MovieRouter.get('/topmovies/:id', MovieController.getTopMovie)
MovieRouter.get('/products/company', MovieController.getProductionMovie)
MovieRouter.get('/oscar/win', MovieController.getTopHoolyWord)

export default MovieRouter;