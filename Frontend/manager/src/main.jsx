import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Import plugin PWA runtime từ vite-plugin-pwa
import { registerSW } from "virtual:pwa-register";

// ✅ Kích hoạt Service Worker (PWA)
registerSW({
  onNeedRefresh() {
    console.log("🔁 Có bản cập nhật mới! Vui lòng tải lại trang.");
  },
  onOfflineReady() {
    console.log("✅ Ứng dụng đã sẵn sàng để sử dụng offline!");
  },
});

// ✅ Render ứng dụng React
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
