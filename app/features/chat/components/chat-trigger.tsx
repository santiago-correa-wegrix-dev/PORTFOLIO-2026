import { motion } from "framer-motion";
import { MessageCircleCode } from "lucide-react";

interface ChatTriggerProps {
    onClick: () => void;
    isOpen: boolean;
}

export function ChatTrigger({ onClick, isOpen }: ChatTriggerProps) {
    if (isOpen) return null;

    return (
        <motion.button
            layoutId="chat-trigger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl shadow-black/20 z-50 hover:shadow-black/40 transition-shadow relative group"
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            <MessageCircleCode className="w-6 h-6" />

            <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-red-500 border-2 border-background rounded-full" />
        </motion.button>
    );
}
