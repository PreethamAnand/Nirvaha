import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Mic,
  Smile,
  Plus,
  MessageSquare,
  Settings,
  User,
  Trash2,
  ChevronLeft,
  BrainCircuit
} from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";

type Message = { type: "ai" | "user"; content: string; timestamp: string };
type Session = { id: string; title: string; messages: Message[]; createdAt: number; updatedAt: number };

export function ChatbotPage() {
  const initialMessage: Message = useMemo(
    () => ({
      type: "ai",
      content:
        "Namaste 🙏 I'm your NIRVAHA AI spiritual guide. I can help you with meditation techniques, mindfulness practices, or simply provide a space for reflection. How are you feeling in this moment?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }),
    []
  );

  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isMouseInTopHalf, setIsMouseInTopHalf] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsMouseInTopHalf(e.clientY <= 80);
    };
    const handleMenuToggle = (e: any) => {
      if (e.detail?.isOpen !== undefined) {
        setIsNavMenuOpen(e.detail.isOpen);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("nirvaha-menu-open", handleMenuToggle);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("nirvaha-menu-open", handleMenuToggle);
    };
  }, []);

  const currentSession = useMemo(
    () => sessions.find((s) => s.id === currentSessionId) || null,
    [sessions, currentSessionId]
  );

  const messages = currentSession?.messages ?? [];

  // Persistent Storage
  const saveSessions = (next: Session[]) => {
    setSessions(next);
    localStorage.setItem("nirvaha_chat_v2", JSON.stringify(next));
  };

  const startNewChat = () => {
    const id = crypto.randomUUID?.() || `${Date.now()}`;
    const newSession: Session = {
      id,
      title: "New Reflection",
      messages: [initialMessage],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    saveSessions([newSession, ...sessions]);
    setCurrentSessionId(id);
  };

  useEffect(() => {
    const saved = localStorage.getItem("nirvaha_chat_v2");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length) {
        setSessions(parsed);
        setCurrentSessionId(parsed[0].id);
        return;
      }
    }
    startNewChat();
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || !currentSessionId) return;

    const userMsg: Message = {
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedSessions = sessions.map(s => {
      if (s.id === currentSessionId) {
        const isDefaultTitle = s.title === "New Reflection";
        return {
          ...s,
          title: isDefaultTitle ? inputValue.slice(0, 30) : s.title,
          messages: [...s.messages, userMsg],
          updatedAt: Date.now()
        };
      }
      return s;
    });

    saveSessions(updatedSessions);
    setInputValue("");
    setIsTyping(true);

    // AI Response Simulation
    setTimeout(() => {
      const aiResponse: Message = {
        type: "ai",
        content: "I hear you. Taking a moment to acknowledge those feelings is a powerful step in mindfulness. Let's explore this further—would you like to try a brief grounding exercise, or should we continue talking?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const withAi = updatedSessions.map(s =>
        s.id === currentSessionId ? { ...s, messages: [...s.messages, aiResponse], updatedAt: Date.now() } : s
      );

      saveSessions(withAi);
      setIsTyping(false);
    }, 1500);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = sessions.filter(s => s.id !== id);
    saveSessions(next);
    if (currentSessionId === id && next.length > 0) {
      setCurrentSessionId(next[0].id);
    } else if (next.length === 0) {
      startNewChat();
    }
  };

  return (
    <div className={`flex h-screen bg-[#F8FAF9] text-[#0F131A] overflow-hidden transition-all duration-500 ease-in-out ${isInputFocused && !isMouseInTopHalf && !isNavMenuOpen ? 'pt-0' : 'pt-20'}`}>
      {/* ChatGPT Style Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[#0B2E24] h-full flex flex-col border-r border-[#1a5d47]/20"
          >
            <div className="p-4 flex flex-col h-full">
              <button
                onClick={startNewChat}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/30 text-white hover:bg-emerald-500/10 transition-all mb-6 group"
              >
                <Plus className="w-4 h-4 text-emerald-400 group-hover:rotate-90 transition-transform" />
                <span className="text-sm font-medium">New Reflection</span>
              </button>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                <p className="text-[10px] font-bold tracking-widest text-emerald-500/50 uppercase px-4 mb-2">History</p>
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSessionId(s.id)}
                    className={`w-full flex items-center justify-between group px-4 py-3 rounded-xl transition-all ${s.id === currentSessionId
                      ? 'bg-emerald-500/20 text-emerald-100'
                      : 'text-emerald-100/60 hover:bg-emerald-500/10'
                      }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span className="text-sm truncate">{s.title}</span>
                    </div>
                    <Trash2
                      onClick={(e) => deleteSession(s.id, e)}
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 hover:text-rose-400 transition-opacity"
                    />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100/60 hover:bg-emerald-500/10 transition-all">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Personal Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100/60 hover:bg-emerald-500/10 transition-all">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Preferences</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-4 top-4 z-20 p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-500 hover:text-[#1a5d47] transition-colors"
        >
          <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Chat Header */}
        <header className="h-16 flex items-center justify-center border-b border-gray-100 bg-white/50 backdrop-blur-md px-6 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-[#1a5d47]">NIRVAHA AI GUIDE</h2>
          </div>
        </header>

        {/* Message List */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-10 custom-scrollbar"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-6 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${msg.type === 'ai'
                  ? 'bg-gradient-to-br from-[#1a5d47] to-[#0B2E24] text-white'
                  : 'bg-emerald-100 text-[#1a5d47]'
                  }`}>
                  {msg.type === 'ai' ? <BrainCircuit className="w-6 h-6" /> : <User className="w-5 h-5" />}
                </div>

                <div className={`flex flex-col gap-2 max-w-[85%] ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`text-[15px] leading-relaxed p-4 rounded-2xl ${msg.type === 'user'
                    ? 'bg-[#1a5d47] text-white rounded-tr-none'
                    : 'bg-white border border-gray-100 shadow-sm rounded-tl-none'
                    }`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium px-2">{msg.timestamp}</span>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a5d47] to-[#0B2E24] text-white flex items-center justify-center shadow-sm animate-bounce">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none p-4 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="p-6 bg-gradient-to-t from-[#F8FAF9] via-[#F8FAF9] to-transparent">
          {/* Suggestions - Visible when conversation is new */}
          {messages.length <= 1 && !inputValue && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { label: "🧘 Grounding Exercise", prompt: "I'm feeling a bit overwhelmed. Can you lead me through a quick grounding exercise?" },
                  { label: "🌿 Stress Relief", prompt: "I've had a long day. What's a good way to release stress right now?" },
                  { label: "📜 Ancient Wisdom", prompt: "Give me a piece of ancient wisdom to carry through my day." },
                  { label: "✨ Meditation Path", prompt: "I'm new to meditation. Where should I begin my journey today?" }
                ].map((suggestion, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                    onClick={() => setInputValue(suggestion.prompt)}
                    className="px-4 py-2.5 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl text-[13px] text-[#1a5d47] font-semibold hover:border-[#1a5d47] hover:shadow-md transition-all flex items-center gap-2"
                  >
                    {suggestion.label}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          <div className="max-w-3xl mx-auto relative">
            <div className="relative flex items-end bg-white border border-gray-200 rounded-[28px] p-2 shadow-xl focus-within:border-emerald-500/50 transition-all group">
              <button className="p-3 text-gray-400 hover:text-emerald-500 transition-colors">
                <Smile className="w-6 h-6" />
              </button>

              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => {
                  setIsInputFocused(true);
                  window.dispatchEvent(new CustomEvent('nirvaha-toggle-nav', { detail: { hide: true } }));
                }}
                onBlur={() => {
                  setIsInputFocused(false);
                  window.dispatchEvent(new CustomEvent('nirvaha-toggle-nav', { detail: { hide: false } }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Message NIRVAHA AI..."
                className="flex-1 bg-transparent py-3 px-2 outline-none resize-none text-[15px] max-h-48 custom-scrollbar"
                rows={1}
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />

              <div className="flex items-center gap-1 pr-2 pb-1">
                <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-2xl transition-all ${inputValue.trim()
                    ? 'bg-[#1a5d47] text-white shadow-lg shadow-emerald-900/20'
                    : 'bg-gray-100 text-gray-400'
                    }`}
                >
                  <Send className="w-5 h-5 transition-transform group-focus-within:translate-x-0.5 group-focus-within:-translate-y-0.5" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-center text-gray-400 font-medium tracking-wide">
              NIRVAHA AI may provide medical context. Always consult a professional for serious health concerns.
            </p>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(26, 93, 71, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(26, 93, 71, 0.2);
        }
      `}</style>
    </div>
  );
}
