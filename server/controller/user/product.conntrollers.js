import { GolbalData } from '../../cache/data.js';
import { Sessions } from '../../models/auth/sessions.js';
import { Users } from '../../models/movie/index.js';
// import UserModel from '../../models/user/index.js'
import { hashPass, verifyPass } from '../../utils/hashPassword.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import UserUpdateMovie from './updateProfile/index.js';

// import { getUserByPhone } from './getUserMongo.js';
const Products = {
    signinUser: async (req, res) => {
      
            const user = await Users.findOne({ phone: req.body.phone })
            const asscess = await Sessions.findOne({user_id : user._id})
            // console.log(req.body);
            try {
                res.status(200).json({
                    message: 'User signed in successfully!',
                    success: true,
                    data: user,
                    // asscesstoken 
                    asscessToken : asscess.jwt,
                    // refreshToken
                    refreshToken : req.refreshToken
                })
            }
            catch (error) {
                console.log(error.message);

                res.status(400).json({
                    message: error.message,
                    success: false,
                    data: null
                })}

    },
    getUserOneMovie: async (req, res) => {
        const { id } = req.params;
        // console.log(id)
        // console.log(name);

        try {
            const product = await Users.find({ _id: id });
            // console.log(product);
            return res.status(200).json({
                data: product,
                message: 'User movie fetched successfully!',
                success: true
            })
            // res.send({
            //     data: {
            //         _id: product._id,
            //         name: product.name,
            //         password: product.password,
            //         phone: product.phone,
            //         role: product.role,
            //         movieLove: product.movieLove || [],
            //         ticket: product.ticket || [],
            //         history: product.history || [],
            //         card: product.card || [],
            //     },
            //     message:'Products fetched successfully!',
            //     success: true
            // })
        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false,
                data: null
            })
        }
    },
    addUser: async (req, res) => {
        try {
            const { password, phone_number, name } = req.body;
           
            
            // const saltRounds = 10;
            // const salt = bcrypt.genSaltSync(saltRounds);
            // // thực hiện mã hoá với chuỗi salt
            // const hashPassword = bcrypt.hashSync(password, salt);
            // const p = await hashPass(password, saltRounds)
            // if (!hashPassword) {
            //     throw new Error("Error: Couldn't hash password");
            // }
            // if (!phone || !name) {
            //     throw new Error("Error: Phone and name must be provided");
            // }

            // const data = {
            //     phone : phone,
            //      name : name, 
            //     role : "User"
            // }
            const hashPassword = hashPass(password)
            const newUser = await Users.create({
                phone : phone_number,
                name : name, 
                role : "User",
                password: hashPassword.hash,
        
            });
            const token = jwt.sign(
                { userId: newUser._id }, 
                process.env.SECRET_KEY,
            );
            const sessions =  await Sessions.create({
                role  :"User",
                user_id : newUser._id,
                jwt : token
            })
            if (sessions) {
                GolbalData.users[token] = {
                    name: name,
                    phone: phone_number,
                    // email: email ?  email :  ''
                };
              
            }
            // console.log(GolbalData.users);
            
            return res.status(201).json({
                // data: newUser,
                name : name,
                token  : token,
                message: 'Create account Successfully',
                success: true
            })
            // await newUser.save();
            
            // if (!req.body.name ) {
            //     throw new Error("Name must be provided")
            // }
            // await newUser.save();

        } catch (error) {
            // console.log(error);
            return res.status(404).json({error: error.message});
            // console.log(error.message);

            // res.status(400).json({
            //     message: error.message,
            //     success: false,
            //     data: null
            // })
        }
    },
    postRenameAvatar : async (req , res , next) => {
        try {
            console.log(req.file);
            
            const file = req.file
            if (!file ) {
                throw new Error('UploadAvatar requires')
            }
            const response =  await UserUpdateMovie.upLoadAvatar(file)
            console.log(response);
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

}
export default Products;