import { toast } from 'react-toastify';

/**
 * Hàm hiển thị thông báo toast thành công.
 * @param {string} message - Thông báo cần hiển thị.
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    autoClose: 3000,  // Thời gian tự động đóng toast sau 3 giây
    style :{textWrap : "nowrap"}
  });
};

/**
 * Hàm hiển thị thông báo toast lỗi.
 * @param {string} message - Thông báo lỗi cần hiển thị.
 */
export const showErrorToast = (message) => { 
  toast.error(message, {

      autoClose: message.length > 100 ? 10000 : 3000, // Thời gian tự động đóng toast sau 3 giây
    style :{ 
      width : message.length > 50 ? "500px" :'' ,
      textWrap : "nowrap",
       transform : message.length > 50 ? `translate(-${message.length * 2}px)` :'',
    }
    
  });
};

/**
 * Hàm hiển thị thông báo toast khi đang xử lý.
 * @param {string} message - Thông báo lúc đang xử lý.
 */
export const showLoadingToast = (message) => {
  return toast.loading(message);
};

export const showInfoToast = (message) => {
  toast.info(message, {
      autoClose: 3000, // Thời gian tự động đóng toast sau 3 giây
    style :{textWrap : "nowrap"}
  });
};
