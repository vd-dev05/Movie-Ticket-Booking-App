import React, { memo } from 'react';
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
import { truncateText } from "../../GetApi/GetApi";
import { useThemeClasses } from "@/components/Layout/Theme/themeStyles";

const AddCard = ({ text, onSubmit, onChange, formValues }) => {
    const { buttonClasses, backGround, textClasses } = useThemeClasses();

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className={`border-primary-textMovie border-[1px] min-w-full flex items-center justify-center rounded-lg py-4 text-primary-textMovie ${backGround}`}>
                    {text}
                </AlertDialogTrigger>
                <AlertDialogContent className={`${backGround} ${textClasses}  max-w-full`}>
                 
                        <AlertDialogHeader>
                            <AlertDialogTitle>Add New Card</AlertDialogTitle>
                            <AlertDialogDescription>
                                <p className="text-gray-500 mb-5">Add your card details here</p>
                            </AlertDialogDescription>
                            <form onSubmit={onSubmit}>
                            <div className="flex w-full flex-col gap-5">
                                <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3">
                                    <label htmlFor="numberCard" className="text-left text-primary-textMovie">Card Number</label>
                                    <input
                                        className={`${backGround} ${textClasses} outline-none w-full`}
                                        type="number"
                                        name="numberCard"
                                        id="numberCard"
                                        onChange={onChange}
                                        value={formValues.numberCard}
                                    />
                                </div>
                                <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3">
                                    <label htmlFor="name" className="text-left text-primary-textMovie">Card Holder Name</label>
                                    <input
                                        className={`${backGround} ${textClasses} outline-none w-full`}
                                        type="text"
                                        name="nameCard"
                                        id="name"
                                        onChange={onChange}
                                        value={formValues.nameCard}
                                    />
                                </div>
                                <div className="flex w-full justify-between gap-x-5">
                                    <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3 w-full">
                                        <label htmlFor="date" className="text-left text-primary-textMovie">Expiry Date</label>
                                        <input
                                            className={`${backGround} ${textClasses} outline-none w-full`}
                                            type="text"
                                            name="date"
                                            id="date"
                                            onChange={onChange}
                                            value={formValues.date}
                                        />
                                    </div>
                                    <div className="border-[1px] rounded-lg border-primary-textMovie p-3 flex flex-col gap-3 w-full">
                                        <label htmlFor="numberCVV" className="text-left text-primary-textMovie">CVV</label>
                                        <input
                                            className={`${backGround} ${textClasses} outline-none w-full`}
                                            type="number"
                                            name="numberCVV"
                                            id="numberCVV"
                                            onChange={onChange}
                                            value={formValues.numberCVV}
                                        />
                                    </div>
                                </div>
                            </div>  
                            <AlertDialogAction className="flex gap-2 p-2 w-full mt-10">

                            <button type="submit" className="w-full bg-primary-textMovie text-white mt-2 text-xl"> Add Card</button>
                            </AlertDialogAction>
                            </form>
                        </AlertDialogHeader>
                     
                  
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default memo(AddCard);
