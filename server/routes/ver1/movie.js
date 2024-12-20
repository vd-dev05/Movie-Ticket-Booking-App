import { Router } from "express";
import MovieController from '../../controller/movie/movie.controller.js'
import authMiddleware from "../../middleware/auth.js";
// import middlewares from "../../middlewares/index.js";

const MovieRouter = Router();

MovieRouter.get('', MovieController.getAllMovie)
MovieRouter.post('/search', MovieController.searchMovie)
MovieRouter.get('/:id', MovieController.getByID)
MovieRouter.get('/topmovies/:id', MovieController.getTopMovie)
MovieRouter.get('/products/company', MovieController.getProductionMovie)
MovieRouter.get('/oscar/win', MovieController.getTopHoolyWord)
MovieRouter.get('/genres/all', MovieController.getMovieGenres)
MovieRouter.get('/seats/seller',MovieController.getSeats)
MovieRouter.put('/:id/review',authMiddleware.authSessionToken, MovieController.updateRevies)
MovieRouter.get('/video/trailers',MovieController.getTrailers)

export default MovieRouter;