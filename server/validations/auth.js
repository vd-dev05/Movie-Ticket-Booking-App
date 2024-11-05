import * as Yup from "yup"
const AuthValidations = {
    CreateUserValidation : async (req,res,next) => {
        try {
            const {name,email,password} = req.body
            const Yupschema = Yup.object().shape({
                name: Yup.string()
                .required('Name is required')
                .min(4, "Name must be 4 characters or more"), 

                email: Yup.string()
                .email("Invalid email format @example.com ")
                .matches(/^\S+@\S+\.\S+$/, "Email can not space characters")
                .required("Required email"),

                password: Yup.string()
                .required("Required password")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                  )})

            await Yupschema.validate({name , email ,password})
            return next()
        } catch (error) {
            res.status(401).json({
                message : error.message,
                success : false
            })
        }
    }
}
export default AuthValidations