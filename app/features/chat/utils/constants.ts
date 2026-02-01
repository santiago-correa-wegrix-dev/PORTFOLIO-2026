// --- Configuration ---
export const TIMEOUTS = {
    BOT_TYPING: 500,
    SCROLL_DELAY: 100,
};

// --- regex patterns ---
export const PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CANCEL: /^(no|cancel|stop|exit|later|not now|nevermind)/i,
    GREETING: /^(hi|hello|hey|hola|hallo|bonjour)\b/i,
    HIRE: /(hire|hrie|contact|contratar|job|employ)/i,
    SMALL_TALK: /\b(cool|great|awesome|nice|ok|okay|thanks|thank you|gracias|danke|schon|dankeschon|dankeschön|merci|arigato|nice one|thx|ty|top|lol|xd|haha)\b/i,
    SECURITY: /(<script>|drop table|alert\(|sudo|rm -rf|window\.|document\.)/i,
    JIBBERISH: /^(blah|asdf|qwerty|test|lorem)/i,
    HELP: /\b(help|menu|options|start|restart)\b/i,
    CREATOR: /(who made you|who built you|creator|developer|author)/i,
    WHO_AM_I: /(who are you|quien eres|what are you|que eres|bot|system)/i,
    FUN: /(love|hate|date|marry|kiss|age|old|birthday|favourite color|food|pizza)/i,
    WORK_LOC: /where.*(work|worked)|donde.*(trabajad|trabajo)/i,
};

export const INITIAL_MESSAGE = {
    id: 'init',
    text: "Start chat...",
    sender: 'bot' as const,
    timestamp: Date.now()
};

export const WELCOME_MESSAGE = {
    id: 'welcome',
    text: "Hi! I'm Santi-Bot. Ask me about my work, stack, or experience.",
    sender: 'bot' as const,
    timestamp: Date.now()
};

export const BLOCKED_NAMES = ['hire', 'santiago', 'admin', 'bot', 'test', 'user', 'hello', 'hi', 'name', 'email', 'help', 'contact', 'me'];
export const BLOCKED_DOMAINS = ['test.com', 'example.com', 'email.com', 'tempmail.com', 'mailinator.com', '10minutemail.com', 'nowhere.com'];
