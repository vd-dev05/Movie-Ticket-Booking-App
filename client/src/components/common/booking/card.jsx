import React, { memo, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { truncateText } from '@/hooks/GetApi/GetApi';
import { useThemeClasses } from "@/context/Theme/themeStyles";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationPayCard } from '@/validations/Yup/useYupForm'
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from '@/context/Theme';


const AddCard = ({ text, onChange, formValues, isOpen, setItem, setIsOpen, setData ,selectedValue}) => {
    // console.log(isOpen);
    const themeCtx = useTheme()
    const { buttonClasses, backGround, textClasses,themeUniver } = useThemeClasses();

    const handleSubmit = async (values, actions) => {
        // console.log(values.numberCard);
        // console.log(actions);
  
        try {
            // Thực hiện submit form và hiển thị thông báo thành công
            // await onSubmit(values);
            setData(prevData => prevData.map(i =>
                i.name === selectedValue ? { ...i, number: values.numberCard , select:!i.select } : i
            ));
            toast.success('Card added successfully!');
            // setItem(prev => ({ ...prev, userCard: values }))
            setIsOpen(false)
        } catch (error) {
            console.log(error);

            // toast.error('Failed to add card. Please try again.');
            // setIsOpen(false)
        }
    }
    // useEffect(() => {

    //     setData(prevData => prevData.map(i => 
    //         i.name === selectedValue ? { ...i, number: item.userCard.numberCard ? item.userCard.numberCard :null } : i
    //     ));
    // }, [item, selectedValue]);

    return (
        <div>
            <AlertDialog open={isOpen} >
                {/* <AlertDialogTrigger >
                    {text}
                </AlertDialogTrigger> */}
                <AlertDialogContent className={`${themeUniver}  max-w-full`}>

                    <AlertDialogHeader>
                        <AlertDialogTitle><p>Add New Card</p></AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="text-gray-500 mb-5">Add your card details here</p>
                        </AlertDialogDescription>
                        <Formik
                            initialValues={formValues}
                            validationSchema={validationPayCard}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => {

                                return (
                                    <Form>
                                        <div className="flex w-full flex-col gap-5">
                                            <div className=''>
                                                <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3">
                                                    <label htmlFor="numberCard" className="text-left text-primary-textMovie">Card Number</label>
                                                    <Field
                                                        className={`${themeCtx.theme == 'travel' ? 'bg-[#2E1371] ':backGround} outline-none w-full`}
                                                        type="text"
                                                        name="numberCard"
                                                        id="numberCard"

                                                    />

                                                </div>
                                                <ErrorMessage name="numberCard" component="div" className="text-red-600 text-sm text-left" />
                                            </div>
                                            <div>

                                                <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3">
                                                    <label htmlFor="nameCard" className="text-left text-primary-textMovie">Card Holder Name</label>
                                                    <Field
                                                        className={`${themeCtx.theme == 'travel' ? 'bg-[#2E1371] ':backGround} ${textClasses} outline-none w-full`}
                                                        type="text"
                                                        name="nameCard"
                                                        id="nameCard"
                                                    />
                                                </div>
                                                <ErrorMessage name="nameCard" component="div" className="text-red-600 text-sm  text-left" />
                                            </div>

                                            <div className="flex w-full justify-between gap-x-5 ">
                                                <div className='w-full'>

                                                    <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3 ">
                                                        <label htmlFor="date" className="text-left text-primary-textMovie">Expiry Date</label>
                                                        <Field
                                                            className={`${themeCtx.theme == 'travel' ? 'bg-[#2E1371] ':backGround} ${textClasses} outline-none w-full`}
                                                            type="text"
                                                            name="date"
                                                            id="date"
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    <ErrorMessage name="date" component="div" className="text-red-600 text-sm  text-left" />
                                                </div>
                                                <div className='w-full'>

                                                    <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3 ">
                                                        <label htmlFor="numberCVV" className="text-left text-primary-textMovie">CVV</label>
                                                        <Field
                                                            className={`${themeCtx.theme == 'travel' ? 'bg-[#2E1371] ':backGround} ${textClasses} outline-none w-full`}
                                                            type="password"
                                                            name="numberCVV"
                                                            id="numberCVV"
                                                        />
                                                    </div>
                                                    <ErrorMessage name="numberCVV" component="div" className="text-red-600 text-sm  text-left" />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full bg-primary-textMovie text-white mt-2 text-xl">Add Card</button>
                                    </Form>
                                )
                            }
                            }
                        </Formik>
                    </AlertDialogHeader>
                        {/* < AlertDialogTrigger>Click</AlertDialogTrigger> */}
                    {/* <  AlertDialogCancel>Click</ AlertDialogCancel> */}
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default memo(AddCard);
