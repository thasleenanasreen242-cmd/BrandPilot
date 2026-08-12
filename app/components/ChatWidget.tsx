"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the BrandPilot assistant. Ask me about our services, pricing, or process 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const handleAssistantLabelClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const label = target.closest("p");
      if (label?.textContent?.trim() === "AI Assistant · BrandPilot") {
        setOpen(true);
      }
    };

    document.addEventListener("click", handleAssistantLabelClick);
    return () => document.removeEventListener("click", handleAssistantLabelClick);
  }, []);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again or use the contact form." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again or use the contact form." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[28rem] bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 bg-white/5">
            <div>
              <p className="font-bold text-white">BrandPilot Assistant</p>
              <p className="text-xs text-gray-400">Ask about services & pricing</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-2xl leading-none" aria-label="Close chat">×</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-200"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><div className="bg-white/10 text-gray-400 px-4 py-2 rounded-2xl text-sm">Typing...</div></div>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t border-white/10">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-blue-400/50" />
            <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 rounded-xl font-semibold text-sm">Send</button>
          </form>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-24 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 transition text-xl" aria-label="Open chat assistant">
        {open ? "×" : "🤖"}
      </button>
    </>
  );
}
