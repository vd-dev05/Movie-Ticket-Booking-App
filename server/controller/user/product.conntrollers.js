import { Users } from '../../models/movie/index.js';
// import UserModel from '../../models/user/index.js'
import { hashPass, verifyPass } from '../../utils/hashPassword.js';
import bcrypt from 'bcrypt';
// import { getUserByPhone } from './getUserMongo.js';
const Products = {
    signinUser: async (req, res) => {
      
            const user = await Users.findOne({ phone: req.body.phone })
            try {
                res.status(200).json({
                    message: 'User signed in successfully!',
                    success: true,
                    data: user
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
        try {
            const { password, phone, name } = req.body;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            // thực hiện mã hoá với chuỗi salt
            const hashPassword = bcrypt.hashSync(password, salt);
            // const p = await hashPass(password, saltRounds)
            // if (!hashPassword) {
            //     throw new Error("Error: Couldn't hash password");
            // }
            // if (!phone || !name) {
            //     throw new Error("Error: Phone and name must be provided");
            // }

            const newUser = new Users({
                name: name,
                phone: phone,
                password: hashPassword,
                role: 'User',
                salt: salt
            });
            await newUser.save();
            return res.status(201).send({
                data: newUser,
                message: 'User added successfully!',
                success: true
            })
            // if (!req.body.name ) {
            //     throw new Error("Name must be provided")
            // }
            // await newUser.save();

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