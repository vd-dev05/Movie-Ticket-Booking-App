import SendOtp from "@/components/common/auth/otp/SendOtp";
import Susses from "@/components/common/auth/otp/Susses";
import { useTheme } from "@/context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { Regex } from "@/validations/Regex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userSchemaChangePassword } from "@/validations/Yup/useYupForm";
import { ref, update } from "firebase/database";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { getNumber } from "@/lib/splitCode";

const ChangePassWord = () => {
    const themeCtx = useTheme();
    const { themeBackGround, themeFocus } = useThemeClasses();
    const { reNumber1to10, reNameSpace } = Regex();

    const nav = useNavigate()

    const [isPass,setIsPass] = useState(false)

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: userSchemaChangePassword,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
        
            
            // setIsPass(true)
            // // window.alert("Form submitted");
            // // console.log(values);

            // const userRef = ref(database, 'users/auth');
            // update(userRef, {
            //     password: values.confirmPassword,
            //     // newPassword: values.newPassword,
            //     // confirmPassword: values.confirmPassword
            // }).then(() => {
            //     notify(themeCtx.theme);
            //     setTimeout(() => {
            //         nav('/profile')
            //     }, 3000);
            // }).catch((error) => {
            //     notifyW(themeCtx.theme, "An error occurred: " + error.message);
            // });
          },
    })

    return (
        <div>
            <h1 className="text-center font-bold text-xl">Password Recovery</h1>
            <div className="flex justify-center items-center mt-10">
                <img
                    src="https://github.com/shadcn.png"
                    width={100}
                    alt="Profile"
                    className="rounded-lg"
                />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.password ? 'border-primary-textMovie' : ''}  `}>
                    <Input
                        className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                        id='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {/* text-gray-500 */}
                    <Label
                        htmlFor="password"
                        className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.password ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.password ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.password ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                    >
                        Password
                    </Label>
                </div>
                <div className="text-left p-0 m-0">
                    {formik.errors.password && (
                        <p className="text-red-600"> {formik.errors.password}
                        </p>
                    )}
                </div>
                <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.newPassword ? 'border-primary-textMovie' : ''}  `}>
                <Input
                        className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                        id='newPassword'
                        name='newPassword'
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                    />
                   <Label
                        htmlFor="newPassword"
                        className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.newPassword ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.newPassword ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.newPassword ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                    >
                        New Password
                    </Label>
                </div>
                <div className="text-left p-0 m-0">
                    {formik.errors.newPassword && (
                        <p className="text-red-600"> {formik.errors.newPassword}
                        </p>
                    )}
                </div>
                <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.confirmPassword ? 'border-primary-textMovie' : ''}  `}>
                    <Input
                        className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                        id='confirmPassword'
                        name='confirmPassword'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    {/* text-gray-500 */}
                    <Label
                        htmlFor="confirmPassword"
                        className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.confirmPassword ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.confirmPassword ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.confirmPassword ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                    >
                       Confirm Password 
                    </Label>
                    
                </div>
                <div className="text-left p-0 m-0">
                    {formik.errors.confirmPassword && (
                        <p className="text-red-600"> {formik.errors.confirmPassword}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="bg-primary-textMovie w-full mt-10 p-6 hover:-translate-y-1 delay-150 hover:scale-105 transition duration-700 ease-in-out focus:bg-chairMovie-chairSelected hover:bg-primary-textMovie"
                >
                    <span className="text-white ">Update</span>
                </Button>
            </form>
            <SendOtp 
            isOpen={isPass} 
            setIsOpen={setIsPass} 
            titlePass={'Account password changed successfully'}
            paraPass1={'Your account password has been changed.'}
            paraPass2={'Watch your favorite movies'}
            />
        </div>
    );
}
 
export default ChangePassWord;