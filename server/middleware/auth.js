import { Users } from "../models/movie/index.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ManagerSeller } from "../models/manager/account.js";
import { verifyPass } from "../utils/hashPassword.js";
import { UnauthorizedError } from "../error/index.js";
import { authorizationError, rollerError } from "../error/ErrorResponse.js";
dotenv.config()
const authMiddleware = {
  authentication: (req, res, next) => {
    const isAuthenticated = true;
    if (isAuthenticated) {

      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  },
  auhthorizationAdmin: async (req, res, next) => {
    try {
      const phone = req.body.phone;
      const query = { phone: { $regex: new RegExp(`^${phone}$`, 'i') } };
      
      const textAdmin = await Users.findOne(query)    
      if (textAdmin === undefined || textAdmin === null || !textAdmin) {
        throw new UnauthorizedError(' Role not found')
      }
      if (textAdmin.role === 'Admin') {

        return next();
      } else if (!textAdmin.role) {
        throw new UnauthorizedError('Please Enter a role')
      }
      else {
        throw new UnauthorizedError('Error Forbiden')
      }
    } catch (error) {
      return authorizationError(res,error,401)
    }

  },

  auhthorizationSeller : async (req,res,next) => {
    try {
      const seller = await ManagerSeller.findOne({email : req.body.email})
      // check password
      const hassPassword = verifyPass(req.body.password,seller.password)
      
      if (seller === undefined || seller === null ||!seller) {
        throw new Error('Role not found')
      } else if (!hassPassword) {
        throw new Error('Passwords do not match!')
      }
  
      if (seller.role === 'Seller' ) {
        req.data = seller
        return next();
      } else if (!seller.role) {
        throw new Error('Please Enter a role')
      }
      else {
        throw new Error('Error Forbiden')
      }
    } catch (error) {
      res.status(403).json({
        error : error.message
      })
    }
 
  },
  auhthorizationCinemaManager: async (req, res, next) => {
    try {

      const textAdmin = await Users.findOne({ phone: req.body.phone })
      
      if (textAdmin === undefined || textAdmin === null || !textAdmin) {
        throw new UnauthorizedError(' Role not found')
      }
      if (!textAdmin.role) {
        throw new UnauthorizedError('Please Enter a role')
      }
      else if (textAdmin.role === 'Manager' || textAdmin.role === 'Admin' ||  textAdmin.role === 'Seller') {
        req.data = textAdmin
        next();
      }
    } catch (error) {
      return  rollerError(res,error,401)
    }

  },
  authSessionToken: (req, res, next) => {
    try {      
      if (req.headers['authorization'] === undefined) throw new UnauthorizedError('Authentication required')
      const token = req.headers['authorization'];
      const split = token.split(' ')[1]
      jwt.verify(split, process.env.SECRET_KEY, (err, user) => {
        if (err) throw new UnauthorizedError('Invalid or expired token')
        req.userId = user.userId
        next()


      });


    } catch (error) {
      return authorizationError(res, error)
      
    }
  },
  authScanSeller: async (req, res, next) => {
    try {
      const response = await ManagerSeller.findOne({_id : req.body.sellerId})
      if (!response) throw new NotfoundError('Seller not found')
        req.sellerId = response._id
      next()
    } catch (error) {
      return  authorizationError(res, error,401)
    }
  },
  authToken: async (req, res, next) => {
    try {
      const token = req.headers['Authorization']?.split(' ')[1]; 
      const a = jwt.decode(token)
 

      const r = jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) throw new Error("Invalid or expired token")
      });

      if (!token) throw new Error("Authentication required")

      return next()
    } catch (error) {
      return res.status(403).json({ error: error.message })
    }
  },
  authOtp: (req, res, next) => {
    try {

      const token = req.headers[`authorization`]
      const tokenParts = token.split(" ");
      const actualToken = tokenParts[1];
      if (!actualToken) throw new UnauthorizedError("Invalid token");
      if (!token) {
        throw new UnauthorizedError("Invalid token");
      }

      jwt.verify(actualToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
        throw new UnauthorizedError('Invalid or expired token')
        }

        next();
      });
    } catch (error) {
      return authorizationError(res,error,401)
    }
  }

};
export default authMiddleware;