# Lessons Learned & Project Memory (Bộ Nhớ & Bài Học AI)

> 🧠 **File này là bộ nhớ tích lũy của AI qua từng task.**
> Mọi AI Tool (Gemini, Claude, Cursor, Copilot, Antigravity) **BẮT BUỘC** phải đọc file này khi bắt đầu session và tự động cập nhật khi học được bài học mới hoặc được User sửa lưng.

## ⚠️ Maintenance Rules (Chống Bloat)

- **Tổng file KHÔNG được vượt quá 100 dòng.** Nếu gần đạt → consolidate entries cũ.
- **Xóa entries đã outdated** (thư viện đã upgrade fix lỗi, pattern đã đổi).
- **Gộp entries liên quan** thành 1 entry rõ ràng hơn.
- Nếu một gotcha **đã được fix trong config** (jest.config, middleware, etc.) → xóa khỏi đây (code là source of truth).
- **KHÔNG ghi log task đã làm** — đó là việc của `CHANGELOG.md` và `git log`.

---

## 1. Bẫy Kỹ Thuật (Pitfalls & Gotchas)

> *Chỉ ghi lại các bẫy mà AI **không thể biết** từ code. Nếu đã fix bằng config → xóa.*

- **[Windows PowerShell + npm/npx]**: Scripts `.ps1` bị chặn bởi ExecutionPolicy mặc định. Luôn dùng `npx.cmd` hoặc `npm.cmd` thay vì `npx`/`npm` khi chạy lệnh terminal.
- **[Static Site Favicon 404]**: Trình duyệt mặc định fetch `/favicon.ico` nếu không khai báo `link rel="icon"`, gây ra 404 console error. Cần gắn SVG emoji data URI trực tiếp trong `<head>`.
- **[Vercel CLI Deploy]**: Vercel CLI yêu cầu login qua Device Code (`https://vercel.com/oauth/device?user_code=...`) hoặc auth token (`VERCEL_TOKEN`) trên môi trường terminal lần đầu.

---

## 2. Quy Tắc User Đã Chốt (User Corrections & Decisions)

> *Những quyết định kiến trúc hoặc phong cách code mà User đã chốt riêng cho dự án này.*

- Giữ nguyên cấu trúc Vanilla HTML/CSS/JS thuần, không đưa vào framework nặng để giữ tính offline và load tức thì.

- **[iPhone Responsive & Dynamic Island]**: Cần iewport-fit=cover, padding sử dụng env(safe-area-inset-top) và env(safe-area-inset-bottom), chiều cao dùng 100dvh để không bị nhảy khung khi thanh địa chỉ Safari thu phóng.