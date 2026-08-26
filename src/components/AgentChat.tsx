import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { askAgent } from "@/lib/agent.functions";
import aiChat from "../assets/chat ai.jpg";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm Azka's Agent. Ask me anything about Azka, her skills or her projects.",
};

// Floating chat widget powered by Lovable AI (key stays server-side).
export default function AgentChat() {
  const [open, setOpen] = useState(false);
  const [showHintBox, setShowHintBox] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ask = useServerFn(askAgent);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await ask({
        data: { messages: next.slice(-12).map(({ role, content }) => ({ role, content })) },
      });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {showHintBox && !open && (
        <div 
          className={`fixed bottom-24 right-5 z-[80] flex items-center gap-3 rounded-xl border border-primary/20 bg-background/95 backdrop-blur-md p-3 shadow-glow w-[280px] cursor-pointer transition-all duration-500 ${isHiding ? 'opacity-0 translate-y-4 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100 animate-float-robo animate-in fade-in slide-in-from-bottom-5'}`} 
          onClick={() => { 
            setIsHiding(true);
            setTimeout(() => {
              setOpen(true); 
              setShowHintBox(false);
            }, 300);
          }}
        >
           {/* robot image */}
           <div className="shrink-0">
             <img src="/assets/robot-avatar.jpg" alt="Agent" className="h-12 w-12 rounded-full object-cover shadow-sm" />
           </div>
           
           {/* text */}
           <div className="flex-1 pr-4">
             <p className="font-display tracking-wide text-primary text-sm">AZKA'S AGENT</p>
             <p className="text-muted-foreground text-xs leading-tight mt-0.5">Click here to ask anything about Azka, her skills or projects.</p>
           </div>
           
           {/* close button */}
           <button 
             onClick={(e) => {
               e.stopPropagation();
               setIsHiding(true);
               setTimeout(() => setShowHintBox(false), 300);
             }}
             className="absolute top-2 right-2 text-muted-foreground hover:text-primary transition-colors"
             aria-label="Close hint box"
           >
             <X className="h-4 w-4" />
           </button>
           
           {/* pointing arrow to the button */}
           <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-primary/20 bg-background/95 backdrop-blur-md"></div>
        </div>
      )}

      {/* 3. Yahan import nahi likhna, direct button start karein */}
      <button 
        style={{ backgroundImage: `url(${aiChat})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        onClick={() => { 
          setIsHiding(true);
          setTimeout(() => {
            setOpen((v) => !v); 
            setShowHintBox(false);
          }, 150);
        }}
        aria-label={open ? "Close chat" : "Chat with Azka's Agent"}
        className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6 bg-primary/80 rounded-full p-1" /> : null}
      </button>

      {open && (
        <div className="surface-card fixed bottom-24 right-5 z-[80] flex h-[26rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden shadow-glow">
          <div className="border-b border-border px-4 py-3">
            <p className="font-display text-lg tracking-wide">AZKA&apos;S AGENT</p>
            <p className="text-xs text-muted-foreground">Ask about Azka, her skills and projects</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="shrink-0 pt-0.5">
                  {m.role === "user" ? (
                    <img 
                      src="/assets/user-avatar.jpg" 
                      alt="User" 
                      className="h-7 w-7 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <img 
                      src="/assets/robot-avatar.jpg" 
                      alt="Agent" 
                      className="h-8 w-8 rounded-full object-cover animate-float-robo"
                    />
                  )}
                </div>
                {/* Message Bubble */}
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-lg rounded-tr-none bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "max-w-[80%] rounded-lg rounded-tl-none bg-secondary border border-border/50 px-3 py-2 text-sm text-secondary-foreground shadow-sm"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex gap-2 flex-row">
                <div className="shrink-0 pt-0.5">
                  <img src="/assets/robot-avatar.jpg" alt="Agent typing" className="h-8 w-8 rounded-full object-cover animate-float-robo" />
                </div>
                <div className="max-w-[80%] rounded-lg rounded-tl-none bg-secondary border border-border/50 px-3 py-2 text-sm text-muted-foreground shadow-sm flex items-center">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              maxLength={2000}
              className="flex-1 rounded-md bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
