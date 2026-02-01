import { Mail, SendHorizontal, X } from "lucide-react";

import { Button } from "~/components/ui/button";

interface ChatInputProps {
    value: string;
    onChange: (val: string) => void;
    onSend: (val: string) => void;
    mode: 'chat' | 'form';
    isTyping: boolean;
    onCancelForm?: () => void;
    placeholder: string;
}

export function ChatInput({ value, onChange, onSend, mode, isTyping, onCancelForm, placeholder }: ChatInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') onSend(value);
    };

    return (
        <div className="p-3 border-t border-border/50 bg-background/50">
            <div className="relative flex items-center gap-2">
                {mode === 'form' && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCancelForm}
                        className="h-8 w-8 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                        title="Cancel Form"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                )}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping} // Or specific loading state
                    placeholder={placeholder}
                    className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-muted-foreground/70 disabled:opacity-50"
                />
                <Button
                    size="icon"
                    onClick={() => onSend(value)}
                    disabled={isTyping || !value.trim()}
                    className="absolute right-1 top-1 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform active:scale-90 disabled:opacity-50"
                >
                    {mode === 'form' ? <Mail className="w-3.5 h-3.5" /> : <SendHorizontal className="w-3.5 h-3.5 ml-0.5" />}
                </Button>
            </div>
        </div>
    );
}
