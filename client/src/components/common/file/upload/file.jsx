import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { showSuccessToast } from "@/lib/toastUtils";
import UserController from "@/services/users/User.controller";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useState } from "react";

const UpLoadFile = ({ isFile, setIsFile }) => {
    const [isLoading ,setIsLoading] = useState(false)
    const handleUpLoad  = async (file) => {
        try {
            const response = await UserController.upLoadAvatar(file)
            if (response.status === 200) {
                setIsLoading(true) 
                showSuccessToast('Avatar uploaded successfully !')
            } 
            
        } catch (error) {
            console.log(error);
            
        }
    }

    
    return (
        <AlertDialog open={isFile} onOpenChange={setIsFile}   >
            <AlertDialogContent className="bg-white max-w-[96vw] right-3 h-[400px]  top-[25%]    rounded-lg border-none ">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">UpLoad File</AlertDialogTitle>
                    <AlertDialogDescription  className="text-center">
                        File size in bytes is less than 10 mb
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Upload className="text-center" 
                customRequest={({file,onSucess,onError}) => {
                    handleUpLoad(file).then(() => {
                        onSucess('ok')
                    }).catch(() => {
                        onError("Upload failed")
                    })
                }}
                showUploadList ={false}
                >
                    <Button icon={<UploadOutlined />} loading={isLoading}>Click to Upload Avatar</Button>
                </Upload>
                    <AlertDialogFooter className="contents ">
                        <AlertDialogCancel  className={`bg-primary-textMovie text-white `}>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default UpLoadFile;