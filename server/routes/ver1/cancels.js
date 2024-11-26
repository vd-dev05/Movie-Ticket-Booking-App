import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";
import CancelController from "../../controller/user/cancel/index.js";

const CancelRoutes = Router();


CancelRoutes.get('/:id')
CancelRoutes.put('/create', authMiddleware.authSessionToken, CancelController.create  )


export default CancelRoutes;