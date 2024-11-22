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
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
    name: 'file',
    action: '   ',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const UpLoadFile = ({ isFile, setIsFile }) => {
    return (
        <AlertDialog open={isFile} onOpenChange={setIsFile}   >
            <AlertDialogContent className="bg-white max-w-[96vw] right-3 h-[400px]  top-[25%]    rounded-lg border-none ">
                <AlertDialogHeader>
                    <AlertDialogTitle>UpLoad File</AlertDialogTitle>
                    <AlertDialogDescription>
                        File size in bytes is less than 10 mb
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Upload {...props} className="text-center">
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
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