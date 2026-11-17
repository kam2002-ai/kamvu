# FITNESS OS PWA — hướng dẫn miễn phí

## 1. Chạy thử trên Windows
- Giải nén ZIP, mở thư mục `fitness-os-starter` trong VS Code.
- Mở `index.html` bằng Live Server. Chạy trên `localhost` hỗ trợ service worker để kiểm tra offline trên máy tính.
- Nếu bản cũ đang mở, đóng tab rồi tải lại.

## 2. Đưa lên GitHub Pages (HTTPS miễn phí)
- Đăng nhập GitHub và tạo repository mới (ví dụ `fitness-os`), chọn Public.
- Trong repo chọn **Add file → Upload files**. Upload **toàn bộ nội dung bên trong** thư mục `fitness-os-starter` vào thư mục gốc repo (không upload file ZIP).
- Vào **Settings → Pages**, chọn **Deploy from a branch**, Branch **main**, Folder **/(root)** rồi Save.
- Chờ GitHub Pages triển khai và mở URL mà GitHub cung cấp (thường là `https://TEN-USER.github.io/fitness-os/`).

## 3. Cài trên iPhone
- Mở URL HTTPS bằng Safari.
- Nhấn Chia sẻ → Thêm vào Màn hình chính → Thêm.
- Mở FITNESS OS từ biểu tượng mới, truy cập lần đầu khi có mạng để tải tài nguyên.
- Sau đó thử bật chế độ máy bay và mở lại app. Một số phần cần internet sẽ không hoạt động.

## Lưu ý dữ liệu
- Các màn hình hiện vẫn là prototype, chưa kết nối Strava hay Apple Health thật.
- LocalStorage lưu riêng cho từng nguồn gốc website/trình duyệt, dữ liệu trên localhost không tự chuyển sang GitHub Pages.
- Đừng xóa dữ liệu Safari/website nếu chưa có bản sao lưu. Chưa có cơ chế sao lưu/đồng bộ dữ liệu đáng tin cậy.
- GitHub Pages repo Public nghĩa là mã nguồn public; không đưa token, mật khẩu hoặc thông tin sức khỏe riêng tư vào source code.
- Service worker cần HTTPS hoặc localhost; truy cập qua IP LAN http thường không kích hoạt offline.
