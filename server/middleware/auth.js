import { Users } from "../models/movie/index.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ManagerSeller } from "../models/manager/account.js";
import { verifyPass } from "../utils/hashPassword.js";
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

      const textAdmin = await Users.findOne({ phone: req.body.phone })
      if (textAdmin === undefined || textAdmin === null || !textAdmin) {
        throw new Error(' Role not found')
      }
      if (textAdmin.role === 'Admin') {

        return next();
      } else if (!textAdmin.role) {
        throw new Error('Please Enter a role')
      }
      else {
        throw new Error('Error Forbiden')
      }
    } catch (error) {
      return res.status(403).json({
        message: error.message,
        success: false,
        data: null
      })
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
        throw new Error(' Role not found')
      }
      if (!textAdmin.role) {
        throw new Error('Please Enter a role')
      }
      else if (textAdmin.role === 'Manager' || textAdmin.role === 'Admin' ||  textAdmin.role === 'Seller') {
        req.data = textAdmin
        next();
      }
    } catch (error) {
      res.status(403).send({ error: error.message })
    }

  },
  authSessionToken: (req, res, next) => {
    try {
      const token = req.headers['authorization'];
      const split = token.split(' ')[1]


      jwt.verify(split, process.env.SECRET_KEY, (err, user) => {
        if (err) throw new Error("Invalid or expired token")
        // req.userId = user.userId   
        //  console.log(user);

        // console.log(req.body);
        // console.log(user);

        req.userId = user.userId
        next()


      });


    } catch (error) {
      return res.status(403).json("Please Enter a token")

    }
  },
  authApiKey: (req, res, next) => {

  },
  authToken: async (req, res, next) => {
    try {
      const token = req.headers['Authorization']?.split(' ')[1]; // Expect "Bearer <token>"
      // console.log(req.body);
      const a = jwt.decode(token)
      // console.log(a);

      // console.log(token);


      const r = jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) throw new Error("Invalid or expired token")
        // const userId = user.userId
        // req.userId = userId
        // console.log(user);

        // return res.json(userId);
        // console.log(req.userId);

      });

      if (!token) throw new Error("Authentication required")
      // console.log( req.userId);

      return next()
    } catch (error) {
      return res.status(403).json({ error: error.message })
    }
  },
  authOtp: (req, res, next) => {
    try {
      // console.log(req.body);
      // console.log(req.headers[`authorization`]);

      const token = req.headers[`authorization`]
      const tokenParts = token.split(" ");
      const actualToken = tokenParts[1];
      if (!actualToken) throw new Error("Invalid token");
      if (!token) {
        throw new Error("Invalid token");
      }

      jwt.verify(actualToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid or expired token' });
        }
        // console.log(user + "done");

        // req.user = user;  // Attach user info to the request object
        next();
      });
    } catch (error) {
      res.status(403).send({ error: error.message })
    }
  }

};
export default authMiddleware;