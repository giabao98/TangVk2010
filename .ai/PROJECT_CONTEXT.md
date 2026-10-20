# Project Context

> 📌 **Dành cho AI:** Đọc file này đầu tiên trước khi bắt đầu bất kỳ task nào. File này mô tả domain, cấu trúc, tech stack và state hiện tại của project để mày không cần "khám phá" lại codebase từ đầu mỗi lần.

---

## 1. Thông Tin Project

```
Tên project   : flowers-20-10 (Một bó hoa dành tặng bạn · 20/10)
Mô tả ngắn   : Trang tặng hoa, vườn hoa nở hoạt ảnh, album ảnh kỷ niệm và thiệp chúc mừng ngày Phụ nữ Việt Nam 20/10.
Target users  : Người nhận thiệp chúc mừng 20/10, bạn bè, người thân.
Tech stage    : Production / Ready to deploy
Source gốc    : https://github.com/IdeaToCodee/flowers-20-10
```

---

## 2. Tech Stack

```
Nền tảng đích (Platform): Web (Static, Responsive, Mobile & Desktop)
Ngôn ngữ                : HTML5, CSS3, JavaScript (Vanilla ES6+)
Hiệu ứng & Đồ họa       : HTML5 Canvas 2D (Ambient petals, Rose blooming, Botanical garden physics)
Lưu trữ Local           : Web Storage (localStorage) lưu trữ thiệp tùy biến và album ảnh Base64
Hosting & Deploy        : Vercel (Production URL: https://tangvkyeu.baolab.io.vn & https://flowers-20-10-flax.vercel.app)
Fonts                   : Noto Serif, Noto Sans (woff2 offline trong assets/fonts/)
Testing & Automation    : Playwright (playwright-cli, tests/*.cjs)
Âm thanh & Hiệu ứng     : Background Music (assets/audio/background.mp3), Đĩa than quay Vinyl Player tương tác
```

---

## 3. Cấu Trúc File & Module

```
├── index.html            # Trang chủ mặc định (/): Sắc nắng hồng Sakura, tia nắng ban mai, cầu vồng đôi, đàn bướm 3D, bong bóng trái tim, hoa thì thầm, popup thiệp chuẩn stable
├── v1.html               # Trang /v1: Bản stable vườn hoa truyền thống trước đó
├── garden.html           # Trang /garden tương đương index.html
├── beta.html             # Trang /beta tương đương index.html
├── script.js             # Logic vẽ bó hoa, cánh hoa nở, canvas animation
├── card.js               # Logic điều khiển thiệp, lật mở, lưu lời chúc vào localStorage
├── album.js              # Logic album ảnh kỷ niệm 3 khung ảnh, upload/resize ảnh tự động
├── garden-botany.js      # Logic sinh học thực vật và render canvas cho vườn hoa
├── garden-card.js        # Logic thiệp riêng cho trang garden
├── style.css             # Toàn bộ CSS phong cách thiệp hoa, responsive, animation
├── vercel.json           # Cấu hình routing cho Vercel (cleanUrls, trailingSlash)
├── package.json          # Metadata và scripts
├── assets/               # Hình ảnh mẫu và font Noto Serif / Sans offline
└── tests/                # Test layout và album với Playwright
```

---

## 4. Business Logic & Đặc tả Trải nghiệm

1. **Hiệu ứng hoa nở:** Sử dụng thuật toán vẽ vector trên Canvas, tính toán độ uốn lượn cánh hoa, giọt sương và bóng đổ.
2. **Thiệp & Lời chúc:** Hỗ trợ người dùng nhấn "Viết lời chúc riêng" để sửa người nhận, lời chúc, người gửi. Dữ liệu lưu vào `localStorage`.
3. **Album kỷ niệm:** 3 khung ảnh chân dung, hỗ trợ tải ảnh từ thiết bị (tối đa 20MB), tự động resize về kích thước tối ưu và lưu vào `localStorage`.
4. **Vườn hoa (`garden.html`):** Khu vườn hoa mở rộng với 20 nụ hoa và nhiều loài hoa nở liên tục, có gió lay động.
