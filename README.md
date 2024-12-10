# Movie Ticket Booking Web (mobile)
# Hệ Thống Đặt Vé Phim

Dự án **Hệ Thống Đặt Vé Phim** là một ứng dụng web cho phép người dùng đặt vé, tìm kiếm phim, thanh toán trực tuyến và nhiều tính năng khác. Dự án sử dụng công nghệ hiện đại như **React.js**, **Redux Toolkit**, **Tailwind CSS**, **Express.js**, **MongoDB** và nhiều công nghệ khác.

---

## 🚀 Các Tính Năng Chính

### 1. **Giao Diện Đăng Ký**
- Đăng ký tài khoản điện thoại, xác thực dữ liệu.
- Quản lý trạng thái đăng ký bằng **Redux Toolkit**.
- **API**:
  - Đăng ký tài khoản.
  - Hash mật khẩu.
  - Kiểm tra dữ liệu đã có trong hệ thống.
  - Xác thực OTP giả từ server.

### 2. **Giao Diện Tìm Kiếm**
- Tìm kiếm sản phẩm (phim) theo tên.
- Thuật toán tìm kiếm dữ liệu gần nhất.
- **API**:
  - API trả về danh sách sản phẩm phim theo từ khóa tìm kiếm.

### 3. **Giao Diện Danh Sách Vé**
- Xem thông tin vé.
- Quét mã QR để xem chi tiết vé.
- Hủy vé và đánh giá phim.
- **API**:
  - API cung cấp thông tin vé, hủy vé, đánh giá phim.

### 4. **Giao Diện Đặt Vé**
- Đặt vé cho các buổi chiếu phim.
- Kiểm tra thông tin vé từ cơ sở dữ liệu và số lượng vé còn lại.
- **API**:
  - API kiểm tra thông tin vé từ DB và số lượng vé có sẵn.

### 5. **Giao Diện Thanh Toán**
- Thanh toán qua **Momo**, **Mastercard**, **Paypal**.
- Nhập mã voucher khuyến mãi.
- **API**:
  - API xử lý thanh toán trong môi trường dev.
  - Xác thực thanh toán qua token.

### 6. **Giao Diện Trang Cá Nhân**
- Chỉnh sửa thông tin tài khoản và đăng xuất.
- **API**:
  - API tải ảnh lên **Cloudinary**.

### 7. **Giao Diện Admin Web**
- Quản lý nhà bán phim, duyệt phim và người dùng.
- **API**:
  - Thêm, sửa, xóa nhà bán phim.
  - Xóa người dùng khỏi cơ sở dữ liệu.

### 8. **Giao Diện Nhà Bán Phim**
- Thêm, sửa, xóa phim.
- Quét mã QR từ người dùng khi họ mua vé.
- **API**:
  - Quét QR mã (OCR) khi người dùng mua vé thành công.
  - Co quyền sửa trang thái vé user khi đã mua khi chưa hủy

---

## 🛠 Công Nghệ Sử Dụng

### **Frontend**
- **React.js**: Thư viện JavaScript mạnh mẽ để xây dựng giao diện người dùng.
- **Redux Toolkit**: Quản lý trạng thái ứng dụng.
- **Tailwind CSS**: Framework CSS cho phép xây dựng giao diện đẹp mắt và linh hoạt.
- **ShadCN**: Tạo các thành phần giao diện linh hoạt và đẹp mắt.
- **Ant Design**: Thư viện UI với các thành phần giao diện đẹp, dễ sử dụng.
- **Figma**: Công cụ thiết kế giao diện.

### **Backend**
- **Express.js**: Framework Node.js đơn giản, dễ sử dụng.
- **MongoDB**: Cơ sở dữ liệu NoSQL cho phép lưu trữ dữ liệu linh hoạt.

### **Cloud & Storage**
- **Cloudinary**: Quản lý và lưu trữ hình ảnh, video (dùng cho ảnh đại diện, poster phim).

### **Deploy**
- **Render**: Deploy server.
- **Netlify**: Deploy client.

---

## Cấu Trúc Dự Án
![alt text](adminUI/code.png)
### Giải thích các phần:

1. **Mô Tả Dự Án**: Phần này giúp người đọc hiểu về ứng dụng và các tính năng chính của nó.
2. **Công Nghệ Sử Dụng**: Liệt kê các công nghệ sử dụng cho cả frontend và backend, giúp người đọc biết được các công cụ và thư viện mà dự án sử dụng.
4. **Các Tính Năng Dự Kiến Phát Triển**: Đưa ra các tính năng sẽ được phát triển trong tương lai.
5. **Deploy**: Thông tin về các môi trường triển khai của dự án.
6. **Cấu Trúc Dự Án**: Hướng dẫn về cấu trúc thư mục và cách tổ chức mã nguồn của dự án.



<h1>✨ Cảm ơn bạn đã xem dự án này! Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ!</h1>
📞 Liên Hệ
Email: dbui0025@gmail.com
GitHub: github.com/vd-dev05
