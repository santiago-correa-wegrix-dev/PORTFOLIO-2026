import { AnimatePresence,motion } from "framer-motion";
import { Home, Languages,LayoutGrid, Mail, Moon, MousePointer2, Settings, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import { useUIStore } from "~/store/ui-store";

export function ControlCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        theme, setTheme,
        showCustomCursor, toggleCustomCursor,
    } = useUIStore();
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const cycleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        const langs = ['en', 'es', 'de', 'fr'];
        const currentIndex = langs.indexOf(i18n.language);
        const nextIndex = (currentIndex + 1) % langs.length;
        i18n.changeLanguage(langs[nextIndex]);
    };

    const handleNav = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const goHome = () => {
        if (location.pathname !== '/') navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
            <AnimatePresence mode="popLayout">
                {isOpen && (
                    <motion.div
                        layoutId="control-capsule"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-card/90 backdrop-blur-xl border border-border p-2 rounded-3xl shadow-2xl flex flex-col gap-2 min-w-[200px]"
                    >
                        {/* Navigation Section */}
                        <div className="grid grid-cols-3 gap-1 p-1">
                            <CapsuleMethod onClick={goHome} icon={<Home className="w-4 h-4" />} label="Home" />
                            <CapsuleMethod onClick={() => handleNav('projects')} icon={<LayoutGrid className="w-4 h-4" />} label="Work" />
                            <CapsuleMethod onClick={() => handleNav('contact')} icon={<Mail className="w-4 h-4" />} label="Contact" />
                        </div>

                        <div className="h-[1px] bg-border mx-2" />

                        {/* Settings Section */}
                        <div className="flex flex-col gap-1 p-1">
                            <CapsuleToggle
                                label={theme === 'dark' ? 'Dark' : 'Light'}
                                icon={theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                onClick={cycleTheme}
                                active={true}
                            />
                            <CapsuleToggle
                                label={showCustomCursor ? "Cursor On" : "Cursor Off"}
                                icon={<MousePointer2 className="w-4 h-4" />}
                                onClick={toggleCustomCursor}
                                active={showCustomCursor}
                            />

                            <CapsuleToggle
                                label={{ en: "English", es: "Español", de: "Deutsch", fr: "Français" }[i18n.language] || "Language"}
                                icon={<Languages className="w-4 h-4" />}
                                onClick={toggleLanguage}
                                active={i18n.language !== 'en'} // Highlight if changed from default
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                layoutId="control-trigger"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-4 p-4 rounded-full shadow-lg transition-all duration-300 ${isOpen ? 'bg-foreground text-background rotate-90' : 'bg-card text-foreground border border-border'}`}
            >
                {isOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
            </motion.button>
        </div>
    );
}

function CapsuleMethod({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-2xl hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors group"
        >
            {icon}
            <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-foreground text-background px-2 py-1 rounded-md pointer-events-none">{label}</span>
        </button>
    )
}

function CapsuleToggle({ icon, label, onClick, active }: { icon: React.ReactNode, label: string, onClick: () => void, active: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between p-3 rounded-2xl transition-all ${active ? 'bg-foreground text-background shadow-md' : 'hover:bg-foreground/10 text-muted-foreground'}`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-xs font-medium">{label}</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${active ? 'bg-background' : 'bg-muted-foreground/30'}`} />
        </button>
    )
}
