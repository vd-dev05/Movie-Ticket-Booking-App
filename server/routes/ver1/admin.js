import { Router } from "express";
import adminController from '../../controller/admin/index.js'
import authMiddleware from "../../middleware/auth.js";
import MovieMiddleware from "../../middleware/movie.js";
import { upload } from "../../utils/fileUpLoad.js";

const AdminRouter = Router();

AdminRouter.get('/', authMiddleware.auhthorizationAdmin ,adminController.loginAdmin)
AdminRouter.post('/create',  MovieMiddleware.createMovie, authMiddleware.auhthorizationAdmin ,adminController.createMovie)
AdminRouter.post('/upload-poster',upload.single('poster'),authMiddleware.auhthorizationAdmin,adminController.uploadMovie )
AdminRouter.post('/video',upload.single('trailer'),authMiddleware.auhthorizationAdmin,adminController.uploadTrailer)
AdminRouter.post('/get-users',authMiddleware.auhthorizationAdmin,adminController.getAllUsers)
AdminRouter.put('/update-movie/:id' , authMiddleware.auhthorizationAdmin, adminController.updateMovie)
export default AdminRouter;