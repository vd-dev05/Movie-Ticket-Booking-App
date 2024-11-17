import * as Yup from "yup"
import YupValid from "../utils/yupValid.js"
const AuthValidations = {
    CreateUserValidation : async (req,res,next) => {
        try {
            const {name,phone,password,confirmPassword} = req.body
            // const Yupschema = Yup.object().shape({
            //     name: YupValid.nameValidation,
            //     // email: Yup.string()
            //     // .email("Invalid email format @example.com ")
            //     // .matches(/^\S+@\S+\.\S+$/, "Email can not space characters")
            //     // .required("Required email"),

            //     phone: YupValid.phoneValidation,
            //     password: YupValid.passwordValidation,
            //     confirmPassword: YupValid.confirmPasswordValidation
            // })
            const data  = {
                name , phone ,password,confirmPassword
            }
            try {
                await Yupschema.validate(data)
                next()
            } catch (error) {
                throw new Error(error)
            }
        } catch (error) {
            res.status(401).json({
                message : error.message,
                success : false
            })
        }
    },
    LoginUserValidation : async (req,res,next) => {
        try {
            const {phone,password} = req.body
            console.log("fix");
            
            console.log(req.body);
            
            const Yupschema = Yup.object().shape({
                phone: YupValid.phoneValidation,
                password: YupValid.passwordValidation
            })
            try {
                await Yupschema.validate({phone,password}) 
                next()
            } catch (error) {
                throw new Error(error.message)
            }
           
        } catch (error) {
            res.status(401).json({
                message : error.message,
                success : false
            })
        }
    }
}
export default AuthValidations