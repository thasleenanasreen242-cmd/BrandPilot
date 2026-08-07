"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! I'm the BrandPilot AI assistant. Ask me anything about our services." },
  ]);
  const [sending, setSending] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    // NOTE: This is a placeholder response. The original Gemini-connected
    // logic for this component was not present in the repo, so this needs
    // to be wired to a real API route (e.g. POST /api/chat calling the
    // Gemini API) before this goes live. See the note below the component.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Thanks for your message! (This is a placeholder reply — the AI backend for this widget still needs to be connected.)",
        },
      ]);
      setSending(false);
    }, 600);
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 w-80 max-h-[28rem] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-500/10 z-50 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="font-semibold text-sm">BrandPilot AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-5 max-w-[85%] px-3 py-2 rounded-xl ${
                  m.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-white/10 text-gray-200"
                }`}
              >
                {m.text}
              </div>
            ))}
            {sending && (
              <div className="text-xs text-gray-500">Typing...</div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400/50"
            />
            <button
              type="submit"
              disabled={sending}
              className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-sm font-semibold disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-24 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center text-xl"
      >
        {open ? "✕" : "🤖"}
      </button>
    </>
  );
}
