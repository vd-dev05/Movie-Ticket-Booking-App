import { Users } from "../models/movie/index.js";

const authMiddleware = {
    authentication: (req, res, next) => {
        const isAuthenticated = true; // Kiểm tra xem người dùng đã được xác thực hay chưa
        if (isAuthenticated) {
        // Người dùng đã được xác thực, cho phép truy cập
        next();
      } else {
        res.status(401).send('Unauthorized'); // Trả về lỗi 401 nếu không được xác thực
      }
    },
    auhthorizationAdmin: async (req, res, next) => {
      try {        
        const textAdmin = await Users.findOne({phone : req.body.phone})
    
        if (textAdmin.role === 'Admin') {
        next(); // Cho phép truy cập vào route
      } else if ( !textAdmin.role ) {
        throw new Error('Please Enter a role')
      } 
      else {
        throw new Error('Error Forbiden') // Trả về lỗi 403 nếu không có quyền truy cập
      }
      } catch (error) {
        return res.status(403).json({
          message: error.message,
          success: false,
          data: null
        })
      }
    
    },
    auhthorizationCinemaManager : async (req, res, next) => {
      try {
        const textAdmin = await Users.findOne({phone : req.body.phone})
      
        if (textAdmin === undefined || textAdmin === null || !textAdmin) {
          throw new Error(' Role not found' )
        }
        if (!textAdmin.role  ) {
          throw new Error('Please Enter a role') 
        }
        else if ( textAdmin.role === 'Manager') {
          next();
        }
      } catch (error) {
        res.status(403).send({error : error.message})
      }
     
  },

};
export default authMiddleware;