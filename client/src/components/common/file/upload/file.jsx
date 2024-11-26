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
import UserController from "@/services/users/User.controller";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useState } from "react";

const props = {
    name: 'file',
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
    //   if (info.file.status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    },
  };
const UpLoadFile = ({ isFile, setIsFile }) => {
    const [isLoading ,setIsLoading] = useState(false)
    const handleUpLoad  = async (file) => {
        try {
            setIsLoading(true) 
       
            
            const response = await UserController.upLoadAvatar(filem)
            // console.log(formData);
            
        } catch (error) {
            message.error(`${error.message}`)
        }finally {
            setIsLoading(false)
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
                    {/* <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter> */}
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default UpLoadFile;