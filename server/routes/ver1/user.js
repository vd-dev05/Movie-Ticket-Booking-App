import { Router } from "express";
import Products from '../../controller/user/product.conntrollers.js';
import UserMiddleware from "../../middleware/user.js";
import UserLoveMovie from "../../controller/user/love/index.js";
import UserUpdateMovie from "../../controller/user/updateProfile/index.js";
import BookTicket from "../../controller/user/ticket/index.js";
import AuthValidations from "../../validations/auth.js";
// import middlewares from "../../middlewares/index.js";

const UserRouter = Router();
// UserRouter.get('/signin',Products.getUserMovie);
UserRouter.post('/signup',AuthValidations.CreateUserValidation,UserMiddleware.createUser,Products.addUser);
UserRouter.post('/signin',UserMiddleware.loginUser,Products.signinUser)
UserRouter.post('/ticket/:id', BookTicket.bookticket)
UserRouter.delete('/deleteTicket/:id',BookTicket.removeAllTicket)
UserRouter.delete('/deleteOneTicket/:id',BookTicket.removeOneTicket)
UserRouter.get('/:id' ,Products.getUserOneMovie)
UserRouter.put('/:id' ,UserLoveMovie.loveMovie)
UserRouter.put('/update/:id', UserUpdateMovie.updateUser)





export default UserRouter;