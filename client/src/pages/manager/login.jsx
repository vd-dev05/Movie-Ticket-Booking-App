import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ManagerController from '@/services/manager/Manager.controller';
import { showErrorToast, showLoadingToast, showSuccessToast } from '@/lib/toastUtils';
import { toast } from 'react-toastify';
const SignIn = () => {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      });
      const nav = useNavigate()
      const handleSubmit = async (values) => {
        const toastId = showLoadingToast("Please Loading ...")
        try {
           
            const response  = await ManagerController.loginManager(values)
            if (response.success === true) {

              toast.update(toastId, {
                render: response.message,
                type:'success',
                isLoading: false,
                autoClose : 3000,
               
              });
                setTimeout(() => {
                    toast.dismiss(toastId);
                    localStorage.setItem('seller' , JSON.stringify(response.data))
                    nav('/manager')
                }, 3000);
            }
        
        } catch (error) {
            toast.update(toastId, {
                render: error.message,
                autoClose : 3000,
                type:'error',
                isLoading: false,
              });
            
        }
      };
    return (  
        <div className="min-w-full min-h-screen bg-[#4880FF] flex items-center justify-center font-movie">
        <div className="rounded-xl m-0 p-0 w-[500px] h-[620px]  bg-white shadow-lg">
          <h1 className="text-center text-2xl font-bold py-6">Trang quản lí rạp phim</h1>
          <p className='text-center'>
          <Link to='/auth/signup/manager' className=" hover:text-black">
          Sign up
          </Link>
          </p>
     
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="px-6 py-4">

                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="email" component="p" className="text-xs text-red-500" />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage name="password" component="p" className="text-xs text-red-500" />
                </div>  
                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#4880FF] text-white font-semibold rounded-md hover:bg-[#3b70cc] transition duration-300"
                  >
                    {isSubmitting ? 'Login...':'Login'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
    </div>
    );
}
 
export default SignIn;