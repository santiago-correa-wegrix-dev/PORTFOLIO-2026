import { useCallback, useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";

import type { ChatResponse, ContactFormData, FormStep, Message } from "../chat-types";
import { BLOCKED_DOMAINS, BLOCKED_NAMES, INITIAL_MESSAGE, PATTERNS, TIMEOUTS, WELCOME_MESSAGE } from "../utils/constants";

export function useChat() {
    const [isOpen, setIsOpen] = useState(false);

    // Lazy init for messages to avoid useEffect state update on mount
    const [messages, setMessages] = useState<Message[]>(() => {
        if (typeof window === 'undefined') return [INITIAL_MESSAGE];
        try {
            const saved = localStorage.getItem("chat_messages");
            const parsed = saved ? JSON.parse(saved) : null;
            return Array.isArray(parsed) ? parsed : [INITIAL_MESSAGE];
        } catch {
            return [INITIAL_MESSAGE];
        }
    });

    const [input, setInput] = useState("");
    const [formStep, setFormStep] = useState<FormStep>('idle');
    const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" });

    // Track processed IDs to prevent infinite loops/duplicate messages
    const lastProcessedChatId = useRef<string | null>(null);
    const lastProcessedContactId = useRef<string | null>(null);

    const chatFetcher = useFetcher<ChatResponse>();
    const contactFetcher = useFetcher<{ error?: boolean; details?: Record<string, string[]> }>();

    const isTyping = chatFetcher.state === "loading" || contactFetcher.state === "submitting";

    // --- Actions ---

    const addBotMessage = useCallback((text: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text,
            sender: 'bot',
            timestamp: Date.now()
        }]);
    }, []);

    const handleClearChat = useCallback(() => {
        setMessages([WELCOME_MESSAGE]);
        setFormStep('idle');
        setFormData({ name: "", email: "", message: "" });
        localStorage.removeItem("chat_messages");
    }, []);

    // --- Logic ---

    const processWizardStep = useCallback((text: string, currentStep: FormStep, currentData: ContactFormData) => {
        // Name Step
        if (currentStep === 'name') {
            const nameCheck = text.toLowerCase().replace(/[^a-z]/g, '');
            if (text.length < 2) {
                setTimeout(() => addBotMessage("That seems a bit short. Full name please?"), TIMEOUTS.BOT_TYPING);
                return;
            }
            if (BLOCKED_NAMES.includes(nameCheck) || BLOCKED_NAMES.some(n => nameCheck.includes(n) && nameCheck.length < n.length + 3)) {
                setTimeout(() => addBotMessage(`"${text}" sounds more like a command than a name! 😅 What should I actually call you?`), TIMEOUTS.BOT_TYPING);
                return;
            }
            setFormData(prev => ({ ...prev, name: text }));
            setTimeout(() => addBotMessage(`Nice to meet you, ${text}. What's your **Email**?`), TIMEOUTS.BOT_TYPING);
            setFormStep('email');
            return;
        }

        // Email Step
        if (currentStep === 'email') {
            const emailInput = text.toLowerCase();
            if (!PATTERNS.EMAIL.test(emailInput) || BLOCKED_DOMAINS.some(d => emailInput.includes(d))) {
                setTimeout(() => addBotMessage("That doesn't look like a valid professional email. Try again?"), TIMEOUTS.BOT_TYPING);
                return;
            }
            setFormData(prev => ({ ...prev, email: text }));
            setTimeout(() => addBotMessage("Got it. How can we help? (Type your **Message**)"), TIMEOUTS.BOT_TYPING);
            setFormStep('message');
            return;
        }

        // Message Step
        if (currentStep === 'message') {
            if (text.length < 10) {
                setTimeout(() => addBotMessage("Could you give me a little more detail? (min 10 chars)"), TIMEOUTS.BOT_TYPING);
                return;
            }
            const finalData = { ...currentData, message: text };
            setFormData(finalData);
            setTimeout(() => addBotMessage("Perfect. Sending your details securely..."), TIMEOUTS.BOT_TYPING);
            setFormStep('sending');

            contactFetcher.submit(
                { ...finalData, message: text },
                { method: "post", action: "/api/contact" }
            );
            return;
        }
    }, [addBotMessage, contactFetcher]);

    const sendMessage = useCallback((text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: 'user',
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Cancellation Check
        if (PATTERNS.CANCEL.test(text)) {
            if (formStep !== 'idle') {
                addBotMessage("No problem! We can do this later. What else would you like to explore?");
                setFormData({ name: "", email: "", message: "" });
                setFormStep('idle');
            }
            return; // Exit early if cancelled
        }

        if (formStep !== 'idle') {
            processWizardStep(text.trim(), formStep, formData);
        } else {
            // Normal Chat
            chatFetcher.load(`/api/chat?q=${encodeURIComponent(text.trim())}`);
        }
    }, [addBotMessage, formStep, formData, processWizardStep, chatFetcher]);

    // --- Effects ---

    // Save History
    useEffect(() => {
        if (messages.length > 1) {
            localStorage.setItem("chat_messages", JSON.stringify(messages));
        }
    }, [messages]);

    // Global Shortcut
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isOpen]);

    // Chat Response Handling
    useEffect(() => {
        if (chatFetcher.state === 'idle' && chatFetcher.data) {
            const dataText = chatFetcher.data.text;
            const uniqueKey = dataText + (chatFetcher.data.action || '');

            if (lastProcessedChatId.current === uniqueKey) return;
            lastProcessedChatId.current = uniqueKey;

            const botMsg: Message = {
                id: Date.now().toString(),
                text: dataText,
                sender: 'bot',
                timestamp: Date.now(),
                action: chatFetcher.data.action
            };
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMessages(prev => [...prev, botMsg]);

            if (chatFetcher.data.action === "/#contact") {
                setTimeout(() => {
                    setFormStep((prev) => {
                        if (prev === 'idle') {
                            addBotMessage("Want to get in touch right now? I can send a message for you. What's your **Name**?");
                            return 'name';
                        }
                        return prev;
                    });
                }, TIMEOUTS.BOT_TYPING);
            }
        }
    }, [chatFetcher.state, chatFetcher.data, addBotMessage]);

    // Contact Response Handling
    useEffect(() => {
        if (contactFetcher.state === 'idle' && contactFetcher.data) {
            const uniqueKey = JSON.stringify(contactFetcher.data);
            if (lastProcessedContactId.current === uniqueKey) return;
            lastProcessedContactId.current = uniqueKey;

            if (contactFetcher.data.error) {
                const details = contactFetcher.data.details as Record<string, string[]> | undefined;
                let errorMsg = "Something went wrong. Please try again.";
                let nextStep: FormStep | null = null;

                if (details) {
                    if (details.name) {
                        errorMsg = `Name issue: ${details.name[0]}. What is your **Name**?`;
                        nextStep = 'name';
                    } else if (details.email) {
                        errorMsg = `Email issue: ${details.email[0]}. What is your **Email**?`;
                        nextStep = 'email';
                    } else if (details.message) {
                        errorMsg = `Message issue: ${details.message[0]}. What is your **Message**?`;
                        nextStep = 'message';
                    }
                }
                // eslint-disable-next-line react-hooks/set-state-in-effect
                addBotMessage(errorMsg);
                if (nextStep) setFormStep(nextStep);
            } else {
                addBotMessage("Message sent! 📨 Santiago will get back to you as soon as possible.");
                setFormStep('idle');
                setFormData({ name: "", email: "", message: "" });
            }
        }
    }, [contactFetcher.state, contactFetcher.data, addBotMessage]);

    return {
        isOpen,
        setIsOpen,
        messages,
        input,
        setInput,
        isTyping,
        formStep,
        actions: {
            sendMessage,
            clearChat: handleClearChat,
            toggleOpen: () => setIsOpen(p => !p)
        }
    };
}
