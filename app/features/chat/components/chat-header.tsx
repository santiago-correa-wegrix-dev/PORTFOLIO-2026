import { Bot, RotateCcw, X } from "lucide-react";

import { Button } from "~/components/ui/button";

interface ChatHeaderProps {
    isTyping: boolean;
    onClear: () => void;
    onClose: () => void;
}

export function ChatHeader({ isTyping, onClear, onClose }: ChatHeaderProps) {
    return (
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-zinc-100/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                    <Bot className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Santi-Bot</h3>
                    <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                            {isTyping ? 'Typing...' : 'Online'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    onClick={onClear}
                    title="Clear Chat"
                >
                    <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose}>
                    <X className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
