
import { Double } from 'bson';
import { Users } from '../../models/movie/index.js';
// import UserModel from '../../models/user/index.js'
import { hashPass,verifyPass } from '../../utils/hashPassword.js';
import { getUserByPhone } from './getUserMongo.js';
const Products = {
    signinUser: async (req, res) => {

        const { password, phone } = req.body;

        const r = await getUserByPhone(phone)

         
        const storedHash = r.password;
        const isPasswordValid = verifyPass(password, storedHash);
        try {    
            if (r) {
                if (isPasswordValid) {
                    return res.status(200).json({
                        data: r,
                        message: 'User Login successfully!',
                        success: true
                    })
                }else {
                    throw new Error('Password already stored')
                }
              
            }else {
                return res.status(404).json({
                    message: 'User not found!',
                    success: false,
                    data: null
                })
            }
           
        } catch (error) {
            console.log(error.message);
            
            res.status(400).json({
                message: error.message,
                success: false,
                data: null
            })
        }

    },
    getUserOneMovie: async (req, res) => {
        const { id } = req.params;
        // console.log(id)
        // console.log(name);
        
        try {
            const product = await Users.find({ _id: id });
            console.log(product);
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
        const password = hashPass(req.body.password)
        // console.log(password.hash);
        
        const newUser = await Users.create({
            name: req.body.name,
            phone:  req.body.phone,
            password: password.hash,
            role: 'User',
            hash : password.salt
        });

        try {

            // if (!req.body.name ) {
            //     throw new Error("Name must be provided")
            // }
            // await newUser.save();
            return res.status(201).send({
                data: newUser,
                message: 'User added successfully!',
                success: true
            })
        } catch (error) {
            console.log(error);

            // console.log(error.message);

            res.status(400).json({
                message: error.message,
                success: false,
                data: null
            })
        }
    }

}
export default Products;