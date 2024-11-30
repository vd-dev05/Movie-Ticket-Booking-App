import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VietQr = () => {
    const location = useLocation();
    const parsedTotal = queryString.parse(location.search);  // Dùng parsedTotal thay vì paredTotal
    const [isLoading, setIsLoading] = useState(true);  // Đặt mặc định là true

    const [qrImageUrl, setQrImageUrl] = useState("");  // Khởi tạo URL của ảnh QR

    useEffect(() => {
        if (parsedTotal && parsedTotal.total && parsedTotal.orderId) {
        
            const qrUrl = `https://qr.sepay.vn/img?acc=0582138826&bank=MBBank&amount=${(parsedTotal.total).toString().replace('.', ',')}&des=DH${parsedTotal.orderId}&template=TEMPLATE&download=DOWNLOAD`;
            setQrImageUrl(qrUrl);  // Cập nhật URL ảnh QR
            setIsLoading(false);  
        }
    }, [parsedTotal]); 

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = qrImageUrl;  
        a.download = 'qr_code.png';  
        a.click();
    };
    // console.log(parsedTotal);
    
    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="flex items-center flex-col justify-center px-4 py-10 sm:px-16 sm:py-20 gap-5 min-h-screen">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl sm:text-4xl text-green-500 font-bold mb-4">Đặt hàng Thành Công</h1>
                <p className="text-lg sm:text-xl mb-2">Mã Đơn Hàng: DH<span>{parsedTotal.orderId}</span></p>
                <img
                    src={qrImageUrl}
                    alt="QR Code"
                    className="img-fluid max-w-[250px] sm:max-w-[350px] mb-4"
                />
                <button 
                    className="btn btn-primary bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
                    onClick={handleDownload}>
                    Tải ảnh QR
                </button>
            </div>

            <div className="w-full mt-6">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Thông tin đơn hàng</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Ngân hàng MBBank</th>
                                <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Thuế</th>
                                <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Tên phim</th>
                                <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Chỗ đặt </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-5 border-b text-sm sm:text-base">Movie Ticket App</td>
                                <td className="py-3 px-5 border-b text-sm sm:text-base">10.000 Đ</td>
                                <td className="py-3 px-5 border-b text-sm sm:text-base">{parsedTotal.title}</td>
                                <td className="py-3 px-5 border-b text-sm sm:text-base">{parsedTotal.seats}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="py-3 px-5 border-t text-sm sm:text-base">Tổng tiền </td>
                                <td className="py-3 px-5 border-t text-sm sm:text-base text-nowrap">{parsedTotal.total} Đ</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VietQr;
