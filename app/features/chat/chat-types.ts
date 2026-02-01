export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
    action?: string;
}

export interface ChatResponse {
    text: string;
    action?: string;
}

export type FormStep = 'idle' | 'name' | 'email' | 'message' | 'sending';

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}
