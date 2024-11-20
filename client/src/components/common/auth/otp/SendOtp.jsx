import React, { memo, useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { customFormatPhoneNumber } from '@/lib/phone';
import { useThemeClasses } from "../../../../context/Theme/themeStyles";
import { useUser } from "@/context/User";
import { GetOtp, VerifyCodeOtp, accessToken } from "@/controller/CreateUser.controller";
import { showErrorToast, showSuccessToast } from '@/lib/toastUtils';
import Susses from "./Susses";
import { Flex, Input } from "antd";
import { InputOTP } from "@/components/ui/input-otp";  // Ensure you have this component
import UserController from "@/services/users/User.controller";

const SendOTp = ({ phoneN, setOpen, isOpen, titlePass, paraPass1, paraPass2 }) => {
    const { dataUser } = useUser();
    const { buttonClasses, textClasses, themeUniver } = useThemeClasses();

    const [count, setCount] = useState();
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [send, setSend] = useState(false);
    const [isTrue, setIsTrue] = useState({ loading: false, openSussces: false });
    const [codeOtp, setCodeOtp] = useState("");
    const [veryCode, setVeryCode] = useState("");

    // Handle OTP resend timer
    useEffect(() => {
        if (count > 0 ) {
            const intervalId = setInterval(() => {
                setCount(prev => prev - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (count === 0) {
            setIsResendDisabled(false);
        }
    }, [count, send]);

    // Fetch OTP when the modal opens and user is not already sending
    useEffect(() => {
        if (!send && isOpen) {
            const fetchOtp = async () => {
                try {
                    const response = await UserController.getOtp(phoneN, dataUser.token);
                    if (response.status === 200) {
                        setCodeOtp(response.data.otp);
                        setSend(true);
                    } else {
                        showErrorToast("Failed to send OTP.");
                    }
                } catch (error) {
                    showErrorToast("An error occurred while sending OTP.");
                }
            };
            fetchOtp();
        }
    }, [send, isOpen, dataUser.token, phoneN]);

    const handleResendOtp = () => {
        setCount(30);
        setIsResendDisabled(true);
        setSend(false); // Reset send state to fetch a new OTP
    };

    const handleCodeChange = (text) => {
        setVeryCode(text);
    };

    const handleSubmit = async () => {
        setIsTrue(prev => ({ ...prev, loading: true }));
        try {
            const response = await UserController.verifyCodeOtp(phoneN, dataUser.token, veryCode);
            setIsTrue(prev => ({ ...prev, loading: false }));

            if (response.status === 200) {
                showSuccessToast(response.data.message);
                const userToken = await UserController.accessToken(dataUser);
                
                
                localStorage.setItem('account-info', JSON.stringify({ name: userToken.data.name, id  : userToken.data.id }));
                setIsTrue(prev => ({ ...prev, openSussces: true }));
            } else {
                showErrorToast("Invalid OTP code.");
            }
        } catch (error) {
            setIsTrue(prev => ({ ...prev, loading: false }));
            showErrorToast("An error occurred while verifying OTP.");
        }
    };

    const sharedProps = {
        length: 4,
        size: "large",
        onChange: handleCodeChange,
        value: veryCode,
        disabled: isTrue.loading,
    };

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setOpen}>
                <AlertDialogContent className={`${themeUniver} ${textClasses} border-none top-[30%] left-10 h-[400px] rounded-2xl iphone-12:w-full max-w-[90%] sm:max-w-[80%] iphone-12:left-5 min-[400px]:left-7 lg:max-w-[60%]`}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Enter OTP</AlertDialogTitle>
                        <AlertDialogDescription className="flex justify-center items-center text-xl">
                            <span className="w-[300px]">
                                A verification code has been sent to {phoneN ? customFormatPhoneNumber(phoneN) : null}
                            </span>
                        </AlertDialogDescription>
                        <div className="flex items-center justify-center px-10 py-5">
                            {/* OTP Input Component */}
                            <Flex gap="large" className="w-full h-[50px] justify-center" vertical>
                                <Input.OTP {...sharedProps} />
                            </Flex>
                        </div>

                        <Button onClick={handleSubmit} className="bg-primary-textMovie hover:bg-primary-textMovie hover:scale-105 w-full flex items-center justify-center rounded-lg py-6 text-white">
                            <span className="flex">
                                {isTrue.loading ? <AiOutlineLoading3Quarters size={20} color="white" className="animate-spin mr-2" /> : null}
                                Verify
                            </span>
                        </Button>

                        <Susses isTrue={isTrue.openSussces} titlePass={titlePass} paraPass1={paraPass1} paraPass2={paraPass2} />

                        <p>
                            Didn't receive the code?{" "}
                            <span className="text-primary-textMovie cursor-pointer" onClick={handleResendOtp}>
                                Resend {count === 0 ? "code" : count}
                            </span>
                        </p>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

            {/* <ToastContainer /> */}
        </div>
    );
};

export default memo(SendOTp);
