"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: any) => void) | null;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the BrandPilot assistant. Ask me about our services, pricing, or process 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Tap the mic and speak");
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
      if (label?.textContent?.trim() === "AI Assistant · BrandPilot") setOpen(true);
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
      recognitionRef.current?.abort();
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
    utterance.onstart = () => { setSpeaking(true); setVoiceStatus("Speaking…"); };
    utterance.onend = () => { setSpeaking(false); setVoiceStatus("Tap the mic and speak"); };
    utterance.onerror = () => { setSpeaking(false); setVoiceStatus("Tap the mic and speak"); };
    window.speechSynthesis.speak(utterance);
  }

  async function startVoiceInput() {
    if (listening) {
      recognitionRef.current?.abort();
      setListening(false);
      setVoiceStatus("Tap the mic and speak");
      return;
    }

    if (typeof window === "undefined" || !window.isSecureContext) {
      setVoiceStatus("Voice needs HTTPS. Open the Vercel/HTTPS site.");
      return;
    }

    const browserWindow = window as any;
    const SpeechRecognitionCtor = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setVoiceStatus("Voice recognition is unavailable. Try Chrome or Edge.");
      return;
    }

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setVoiceStatus("Microphone blocked. Allow microphone access for this site.");
      } else if (name === "NotFoundError") {
        setVoiceStatus("No microphone was found.");
      } else {
        setVoiceStatus("Microphone access failed. Check browser permissions.");
      }
      return;
    }

    const recognition = new SpeechRecognitionCtor() as SpeechRecognitionInstance;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    let finalTranscript = "";

    recognition.onstart = () => {
      setListening(true);
      setVoiceStatus("Listening… speak now");
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex || 0; i < event.results.length; i++) {
        const transcript = event.results[i][0]?.transcript || "";
        if (event.results[i].isFinal) finalTranscript += transcript;
        else interim += transcript;
      }
      const combined = `${finalTranscript} ${interim}`.trim();
      if (combined) {
        setInput(combined);
        setVoiceStatus(interim ? `Hearing: ${interim}` : "Got it");
      }
    };

    recognition.onerror = (event: any) => {
      setListening(false);
      recognitionRef.current = null;
      const error = event?.error || "unknown";
      const messagesByError: Record<string, string> = {
        "not-allowed": "Microphone blocked. Allow microphone access and try again.",
        "service-not-allowed": "Speech recognition is blocked by the browser.",
        "audio-capture": "No working microphone was detected.",
        "no-speech": "I didn't hear anything. Try speaking closer to the mic.",
        "network": "Speech recognition needs a working internet connection.",
        "aborted": "Voice input stopped.",
      };
      setVoiceStatus(messagesByError[error] || `Voice error: ${error}`);
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      if (finalTranscript.trim()) {
        setVoiceStatus("Voice captured — press Send");
      } else {
        setVoiceStatus("Tap the mic and speak");
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setVoiceStatus("Couldn't start the microphone. Try again.");
    }
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
              <p className="text-xs text-blue-300 mt-0.5">{voiceStatus}</p>
            </div>
            <button onClick={() => { setOpen(false); recognitionRef.current?.abort(); window.speechSynthesis?.cancel(); setSpeaking(false); setListening(false); }} className="text-gray-400 hover:text-white text-2xl leading-none" aria-label="Close chat">×</button>
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
