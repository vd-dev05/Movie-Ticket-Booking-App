import { Router } from "express";
import Products from '../../controller/movie/product.conntrollers.js';
// import middlewares from "../../middlewares/index.js";

const UserRouter = Router();
// UserRouter.get('/signin',Products.getUserMovie);
UserRouter.post('/signup',Products.addUser);
UserRouter.post('/signin',Products.signinUser)
UserRouter.get('/:id' ,Products.getUserOneMovie)


export default UserRouter;