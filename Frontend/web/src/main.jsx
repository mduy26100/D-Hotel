import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Import plugin PWA runtime
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
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
