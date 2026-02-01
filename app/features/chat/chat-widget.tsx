import { AnimatePresence } from "framer-motion";

import { ChatHeader } from "./components/chat-header";
import { ChatInput } from "./components/chat-input";
import { ChatTrigger } from "./components/chat-trigger";
import { ChatWindow } from "./components/chat-window";
import { MessageList } from "./components/message-list";
import { useChat } from "./hooks/use-chat";

export function ChatWidget() {
    const {
        isOpen,
        messages,
        input,
        setInput,
        isTyping,
        formStep,
        actions
    } = useChat();

    // Determine placeholder text based on form step
    const getPlaceholder = () => {
        switch (formStep) {
            case 'name': return 'Enter your name...';
            case 'email': return 'Enter your email...';
            case 'message': return 'Type your message...';
            default: return "Ask about my skills...";
        }
    };

    const handleInputSend = (val: string) => {
        // If we want to support the "Cancel" command from the UI button, 
        // we can add a specific handler, but the hook handles text commands like "cancel".
        actions.sendMessage(val);
    };

    const handleCancelForm = () => {
        actions.sendMessage("cancel");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <ChatWindow>
                        <ChatHeader
                            isTyping={isTyping}
                            onClear={actions.clearChat}
                            onClose={actions.toggleOpen}
                        />
                        <MessageList
                            messages={messages}
                            isTyping={isTyping}
                        />
                        <ChatInput
                            value={input}
                            onChange={setInput}
                            onSend={handleInputSend}
                            mode={formStep === 'idle' ? 'chat' : 'form'}
                            isTyping={isTyping}
                            onCancelForm={handleCancelForm}
                            placeholder={getPlaceholder()}
                        />
                    </ChatWindow>
                )}
            </AnimatePresence>
            <ChatTrigger onClick={actions.toggleOpen} isOpen={isOpen} />
        </div>
    );
}
