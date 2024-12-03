import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
const SignupManager = () => {
      // Validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Submit function to handle form submission
  const handleSubmit = (values) => {
    // You can send the values to the server here
    console.log('Form Submitted:', values);
  };
    return (
        <div className="min-w-full h-[50vw] bg-[#4880FF] flex items-center justify-center font-movie">
          <div className="rounded-xl m-0 p-0 w-[500px] h-[620px]  bg-white shadow-lg">
            <h1 className="text-center text-2xl font-bold py-6">Trang quản lí rạp phim</h1>
            <p className='text-center '> <Link to='/auth/signin/manager' className=" hover:text-black">
          Sign in
          </Link></p>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="px-6 py-4">
                  {/* Name */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="name" component="p" className="text-xs text-red-500" />
                  </div>
  
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
                      {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      </div>
    );
}

export default SignupManager;