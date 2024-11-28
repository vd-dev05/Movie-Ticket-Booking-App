import { useTheme } from "@/context/Theme";
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { Regex } from "@/validations/Regex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userSchemaRename } from "@/validations/Yup/useYupForm";
import { ref, update } from "firebase/database";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import UserServices from "@/services/users/User.controller";
import { showSuccessToast } from "@/lib/toastUtils";

const notify = (theme) => toast.success('Rename done', {
    autoClose: 3000,
    theme
});

const notifyW = (theme, msg) => toast.warning(msg, {
    autoClose: 3000,
    theme
});


const UserRename = () => {
    const themeCtx = useTheme();
    const { themeBackGround, themeFocus } = useThemeClasses();
    const { reNumber1to10, reNameSpace } = Regex();
    const nav = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            address: "",
        },

        onSubmit: async (values) => {
            // window.alert("Form submitted");
            console.log(values);

            const response = await UserServices.postRenameUser(values)


            if (response.statusText === "OK") {
                showSuccessToast(response.data)
            }

            // console.log(a);

            // const userRef = ref(database, 'users/auth');
            // update(userRef, {
            //     name: values.name,
            //     phone: values.phone,
            //     address: values.address
            // }).then(() => {
            //     notify(themeCtx.theme);
            //     setTimeout(() => {
            //         nav('/profile')
            //     }, 3000);
            // }).catch((error) => {
            //     notifyW(themeCtx.theme, "An error occurred: " + error.message);
            // });
        },
        validationSchema: userSchemaRename,
        validateOnChange: true,
        validateOnBlur: true,
    })

    return (
        <div>
            <h1 className="text-center font-bold text-xl">Edit Profile</h1>
            <div className="flex justify-center items-center mt-10">
                <div className=" relative">
                    <img
                        src="https://github.com/shadcn.png"
                        width={100}
                        alt="Profile"
                        className="rounded-lg "
                    />
                    <FaRegEdit className="absolute text-red-500 bottom-0 right-0" />
                </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.name && formik.touched.name ? 'border-primary-textMovie' : ''}  `}>
                    <Input
                        className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                        id='name'
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* text-gray-500 */}
                    <Label
                        htmlFor="name"
                        className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.name && formik.touched.name ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.name && formik.touched.name ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.name ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                    >
                        Name
                    </Label>
                </div>
                <div className="text-left p-0 m-0">
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-600"> {formik.errors.name}
                        </p>
                    )}
                </div>
                <div className={`relative border border-gray-300 rounded-lg my-5  p-4 ${formik.errors.phone && formik.touched.phone ? 'border-primary-textMovie' : ''}  `}>
                    <PhoneInput

                        id='phone'
                        name='phone'
                        value={formik.values.phone}
                        onChange={(value) => formik.setFieldValue('phone', value)}
                        placeholder=""
                        // containerClass="border-2 outline-none rounded-lg border-[1px]"
                        buttonStyle={{ border: 'none' }}
                        inputStyle={{ width: '100%', color: themeBackGround, paddingRight: '10px', border: 'none', backgroundColor: themeCtx.theme == 'dark' ? '#1a1a1a' : 'white' }}
                        country={'us'}
                        onlyCountries={['us', 'vn']}
                        onBlur={formik.handleBlur}
                    />
                    <Label
                        htmlFor="phone"
                        className={`absolute left-[82px] top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.phone && formik.touched.phone ? 'text-primary-textMovie' : 'text-gray-400'} transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:text-gray-500 peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.phone ? 'top-0 px-2 left-3 text-xs ' + { themeFocus } : ''}`}
                    >
                        Phone
                    </Label>
                </div>
                <div className="text-left p-0 m-0">
                    {formik.errors.phone && formik.touched.phone && (
                        <p className="text-red-600"> {formik.errors.phone}
                        </p>
                    )}
                </div>
                <div className={`relative border border-gray-300 rounded-lg my-5  p-2 ${formik.errors.address && formik.touched.address ? 'border-primary-textMovie' : ''}  `}>
                    <Input
                        className={`peer py-5 px-3 w-full outline-none border-none ${themeBackGround}   placeholder-transparent`}
                        id='address'
                        name='address'
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* text-gray-500 */}
                    <Label
                        htmlFor="name"
                        className={`absolute left-3 top-1/2 transform ${themeFocus} -translate-y-1/2 ${formik.errors.address && formik.touched.address ? 'text-primary-textMovie' : 'text-gray-400'}  transition-all 
                                    duration-300 peer-focus:-top-0  peer-focus:left-3 peer-focus:${formik.errors.address ? 'text-primary-textMovie' : 'text-gray-500'} peer-focus:text-xs
                                    peer-focus:${themeFocus} peer-focus:px-2 ${formik.values.address ? 'top-0 px-2 left-3 text-xs text-primary-textMovie' + { themeFocus } : ''}`}
                    >
                        Address
                    </Label>

                </div>
                <div className="text-left p-0 m-0">
                    {formik.errors.address && formik.touched.address && (
                        <p className="text-red-600"> {formik.errors.address}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="bg-primary-textMovie w-full mt-10 p-6 hover:-translate-y-1 delay-150  transition duration-700 ease-in-out focus:bg-chairMovie-chairSelected hover:bg-primary-textMovie"
                >
                    <span className="text-white ">Update</span>
                </Button>

            </form>
            <div className="mt-10 delay-150   w-fit flex justify-center items-center rounded-full hover:-translate-y-1 transition duration-700 ease-in-out  bg-primary-textMovie  focus:bg-chairMovie-chairSelected hover:bg-primary-textMovie p-5">
                <Link
                to={'/profile'}
                >
                    <span className="text-white ">Back To Profile</span>
                </Link>
            </div>

        </div>
    );
};

export default UserRename;
