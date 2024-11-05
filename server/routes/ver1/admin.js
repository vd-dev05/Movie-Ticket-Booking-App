import { Router } from "express";
import adminController from '../../controller/admin/index.js'
import authMiddleware from "../../middleware/auth.js";

const AdminRouter = Router();

AdminRouter.get('/', authMiddleware.auhthorizationAdmin ,adminController.loginAdmin)
// AdminRouter.get('/:id', MovieController.getByID)

export default AdminRouter;