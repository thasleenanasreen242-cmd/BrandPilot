"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the BrandPilot assistant. Ask me about our services, pricing, or process 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const handleAssistantOpen = () => setOpen(true);

    const handleAssistantLabelClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const label = target.closest("button, p");
      if (label?.textContent?.trim() === "AI Assistant · BrandPilot") {
        setOpen(true);
      }
    };

    document.addEventListener("brandpilot:open-chat", handleAssistantOpen);
    document.addEventListener("click", handleAssistantLabelClick);

    return () => {
      document.removeEventListener("brandpilot:open-chat", handleAssistantOpen);
      document.removeEventListener("click", handleAssistantLabelClick);
    };
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.96;
    utterance.pitch = 1.03;
    utterance.volume = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function startVoiceInput() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition as SpeechRecognitionConstructor | undefined;
    if (!SpeechRecognition) {
      setInput("Voice input isn't supported in this browser. Try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) setInput(transcript);
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognition.onerror = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const text = input.trim();
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
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
        speak(data.reply);
      } else {
        const fallback = "Sorry, something went wrong. Please try again or use the contact form.";
        setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
        speak(fallback);
      }
    } catch {
      const fallback = "Sorry, I couldn't connect. Please try again or use the contact form.";
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
      speak(fallback);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[30rem] bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 bg-white/5">
            <div>
              <p className="font-bold text-white">BrandPilot Assistant</p>
              <p className="text-xs text-gray-400">{listening ? "Listening…" : speaking ? "Speaking…" : "Ask by voice or text"}</p>
            </div>
            <button onClick={() => { setOpen(false); window.speechSynthesis?.cancel(); setSpeaking(false); }} className="text-gray-400 hover:text-white text-2xl leading-none" aria-label="Close chat">×</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-200"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><div className="bg-white/10 text-gray-400 px-4 py-2 rounded-2xl text-sm">Thinking…</div></div>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t border-white/10 items-center">
            <button type="button" onClick={startVoiceInput} className={`shrink-0 w-11 h-11 rounded-xl font-semibold transition ${listening ? "bg-red-500 text-white animate-pulse" : "bg-white/10 text-blue-300 hover:bg-blue-500/20"}`} aria-label={listening ? "Stop listening" : "Start voice input"} title={listening ? "Stop listening" : "Talk to BrandPilot"}>
              {listening ? "■" : "🎙️"}
            </button>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={listening ? "Speak now…" : "Type or tap the mic…"} className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-blue-400/50" />
            <button type="submit" disabled={loading || !input.trim()} className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 h-11 rounded-xl font-semibold text-sm">Send</button>
          </form>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className={`fixed bottom-6 right-24 text-white p-4 rounded-full shadow-lg z-50 transition text-xl ${speaking ? "bg-purple-500 animate-pulse" : "bg-blue-500 hover:bg-blue-600"}`} aria-label="Open chat assistant">
        {open ? "×" : "🤖"}
      </button>
    </>
  );
}
