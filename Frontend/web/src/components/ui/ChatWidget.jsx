import { useState } from "react"
import { Send, X } from "lucide-react"  // icon hiện đại

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim() !== "") {
      console.log("Tin nhắn gửi:", message)
      setMessage("")
    }
  }

  return (
    <>
      {/* 🟦 Nút bong bóng chat */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-[#233E8F] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none"
      >
        💬
      </button>

      {/* 💬 Hộp chat */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-fade-in z-[9999]">
          {/* Header */}
          <div className="bg-[#233E8F] text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold tracking-wide">Hỗ trợ trực tuyến</span>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3 bg-gray-50">
            <div className="bg-white shadow-sm border border-gray-100 p-2 rounded-xl w-fit max-w-[80%]">
              Xin chào 👋<br />Tôi có thể giúp gì cho bạn?
            </div>
          </div>

          {/* Nhập tin nhắn */}
          <div className="border-t p-2 bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#233E8F]/50 transition"
            />
            <button
              onClick={handleSend}
              className="bg-[#233E8F] hover:bg-[#1b2f6e] text-white p-2 rounded-full transition shadow-md"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
