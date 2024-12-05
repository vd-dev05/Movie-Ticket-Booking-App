import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";
import managerController from "../../controller/manager/index.js";
import postManager from "../../controller/manager/post/index.js";
import MovieMiddleware from "../../middleware/movie.js";
import Ticket from "../../controller/manager/ticket/searchMovie.js";
import ManagerMiddleware from "../../middleware/manager.js";
import { upload } from "../../utils/fileUpLoad.js";
import upLoadLogo from "../../controller/manager/auth/upload/index.js";


const ManagerRouter = Router();
ManagerRouter.post('/create',upload.single('logoSeller'),authMiddleware.auhthorizationCinemaManager,upLoadLogo.createSeller  , managerController.create )
ManagerRouter.post('/signin', authMiddleware.auhthorizationSeller , managerController.loginManager)
ManagerRouter.post('/',authMiddleware.auhthorizationCinemaManager, MovieMiddleware.createMovie ,postManager.createMovie)
ManagerRouter.post('/ticket/:id',ManagerMiddleware.checkSeats,postManager.createTicketMovie)
ManagerRouter.get('/ticket/:id',Ticket.searchTicketId)
ManagerRouter.get('/book', Ticket.getAllTicket)
ManagerRouter.get('/sellerTicket',Ticket.getOneTicket)
ManagerRouter.put('/scanTicket',authMiddleware.authScanSeller, managerController.scanSeller)
// ManagerRouter.get('/:id', MovieController.getByID)

export default ManagerRouter;