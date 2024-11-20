import { Router } from "express";
import Products from '../../controller/user/product.conntrollers.js';
import UserMiddleware from "../../middleware/user.js";
import UserLoveMovie from "../../controller/user/love/index.js";
import UserUpdateMovie from "../../controller/user/updateProfile/index.js";
import BookTicket from "../../controller/user/ticket/index.js";
import AuthValidations from "../../validations/auth.js";
import {createAsscessTokenGlobal, ResetCodeOtp, SendOtp, TokenSend, verifyOtp } from "../../controller/user/auth/userOtp.js";
import authMiddleware from "../../middleware/auth.js";
import UserHistory from "../../controller/user/history/index.js";
// import middlewares from "../../middlewares/index.js";

const UserRouter = Router();
// UserRouter.get('/signin',Products.getUserMovie);
UserRouter.post('/signup',UserMiddleware.createUser);
UserRouter.post('/signin',UserMiddleware.loginUser,Products.signinUser)
UserRouter.post('/ticket/:id', BookTicket.bookticket)
UserRouter.delete('/deleteTicket/:id',BookTicket.removeAllTicket)
UserRouter.delete('/deleteOneTicket/:id',BookTicket.removeOneTicket)

UserRouter.get('/:id' ,Products.getUserOneMovie)
UserRouter.get('/love-movie/all',authMiddleware.authSessionToken,UserLoveMovie.getLoveMovie )
UserRouter.put('/love-movie/add' ,authMiddleware.authSessionToken,UserLoveMovie.loveMovie)
UserRouter.get('/last-movie/all',authMiddleware.authSessionToken ,UserHistory.getHistory)
UserRouter.put('/last-movie/add',authMiddleware.authSessionToken ,UserHistory.addHistory )
UserRouter.put('/update/:id', UserUpdateMovie.updateUser)

UserRouter.post('/token',TokenSend)
UserRouter.post('/send-code',SendOtp)
UserRouter.post('/reset-code',ResetCodeOtp)
UserRouter.post('/verify-code', authMiddleware.authOtp,verifyOtp)
UserRouter.post('/create-token',UserMiddleware.authTokenCreate,createAsscessTokenGlobal,Products.addUser)




export default UserRouter;