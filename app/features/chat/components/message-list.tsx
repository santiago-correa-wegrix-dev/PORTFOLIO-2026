import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import type { Message } from "../chat-types";

interface MessageListProps {
    messages: Message[];
    isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages.length, isTyping]);

    return (
        <div
            ref={scrollRef}
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 overscroll-contain"
        >
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                    <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-sm'
                            : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground rounded-tl-sm'
                            }`}
                    >
                        {/* Simple Markdown-ish bolding */}
                        <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>') }} />
                    </div>

                    {msg.action && msg.sender === 'bot' && (
                        <motion.button
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/50 transition-colors"
                            onClick={() => {
                                const action = msg.action!;
                                if (action.startsWith('http') || action.endsWith('.pdf')) {
                                    window.open(action, '_blank');
                                } else if (action.startsWith('/#')) {
                                    const id = action.replace('/#', '');
                                    const element = document.getElementById(id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        navigate('/');
                                        setTimeout(() => {
                                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                        }, 500);
                                    }
                                } else {
                                    navigate(action);
                                }
                            }}
                        >
                            <Sparkles className="w-3 h-3" />
                            {msg.action!.endsWith('.pdf') ? "Download PDF" : "View Related"}
                        </motion.button>
                    )}

                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            ))}
            {isTyping && (
                <div className="self-start flex items-center gap-1 pl-4">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                </div>
            )}
        </div>
    );
}
