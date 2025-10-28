import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare } from "lucide-react";
import { useAskAssistant } from "../../hooks/assistants/useAskAssistant";

// ✅ Remove <think>...</think> tags from text
const cleanResponse = (text) => {
  if (!text) return "";
  return text.replace(/<think>.*?<\/think>/gs, "").trim();
};

// ✅ Normalize URLs & remove surrounding brackets
const normalizeUrl = (url) => {
  if (!url) return "";
  url = url.trim();

  // Remove surrounding brackets if any
  url = url.replace(/^[\(\[\{<]+|[\)\]\}>]+$/g, "");

  // Add https if missing
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  return url;
};

// ✅ Automatically detect links in text & clean brackets
const renderTextWithLinks = (text) => {
  if (!text) return null;

  // Regex to detect links (with or without brackets)
  const urlRegex = /(\(?https?:\/\/[^\s)>\]]+\)?)/g;

  const parts = text.split(urlRegex);

  return parts.map((part, idx) => {
    if (part.match(urlRegex)) {
      const cleanUrl = normalizeUrl(part);
      return (
        <a
          key={idx}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-words"
        >
          {cleanUrl}
        </a>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { response, loading, error, ask } = useAskAssistant();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { type: "user", text: message };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      const aiResponse = await ask(message);
      const cleanedText = cleanResponse(aiResponse?.reply);
      const aiMsg = {
        type: "ai",
        text: cleanedText || "The assistant could not provide a response.",
      };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { type: "ai", text: "An error occurred. Please try again." },
      ]);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#1b2f6e] to-[#233E8F] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform focus:outline-none z-[9999] flex items-center justify-center"
      >
        <MessageSquare size={22} />
      </button>

      {/* Chat box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[90vw] h-[460px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in z-[9999]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1b2f6e] to-[#233E8F] text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold tracking-wide text-sm">
              💬 Your Virtual Assistant
            </span>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-3 bg-gray-50">
            {chatHistory.length === 0 && (
              <div className="bg-white shadow-sm border border-gray-200 p-3 rounded-xl text-gray-700 w-fit max-w-[80%]">
                👋 Hello there!
                <br />
                How can I help you today?
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl max-w-[80%] leading-relaxed shadow-sm ${
                  msg.type === "user"
                    ? "bg-[#233E8F] text-white ml-auto"
                    : "bg-white border border-gray-100 text-gray-800"
                }`}
              >
                {renderTextWithLinks(msg.text)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="border-t bg-white p-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#233E8F]/50 transition"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className={`p-2 rounded-full transition shadow-md ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#233E8F] hover:bg-[#1b2f6e] text-white"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
