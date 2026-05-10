import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  LayoutGrid,
  Mail,
  Monitor,
  Moon,
  MousePointer2,
  Settings,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useUIStore } from "~/store/ui-store";

export function ControlCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, showCustomCursor, toggleCustomCursor } = useUIStore();
  const navigate = useNavigate();

  const cycleTheme = () => {
    const order = ["light", "dark", "system"] as const;
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  const themeIcons = {
    dark: <Moon className="h-4 w-4" />,
    light: <Sun className="h-4 w-4" />,
    system: <Monitor className="h-4 w-4" />,
  };
  const themeIcon = themeIcons[theme];

  const themeLabels = { dark: "Dark", light: "Light", system: "System" };
  const themeLabel = themeLabels[theme];

  const handleNav = (id: string) => {
    navigate(`/#${id}`);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            layoutId="control-capsule"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ damping: 25, stiffness: 300, type: "spring" }}
            className="flex min-w-50 flex-col gap-2 rounded-3xl border border-border bg-card/90 p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-3 gap-1 p-1">
              <CapsuleAction onClick={goHome} icon={<Home className="h-4 w-4" />} label="Home" />
              <CapsuleAction
                onClick={() => handleNav("projects")}
                icon={<LayoutGrid className="h-4 w-4" />}
                label="Work"
              />
              <CapsuleAction
                onClick={() => handleNav("contact")}
                icon={<Mail className="h-4 w-4" />}
                label="Contact"
              />
            </div>

            <div className="mx-2 h-px bg-border" />

            <div className="flex flex-col gap-1 p-1">
              <CapsuleToggle
                label={themeLabel}
                icon={themeIcon}
                onClick={cycleTheme}
                active={theme !== "light"}
              />
              <CapsuleToggle
                label={showCustomCursor ? "Cursor On" : "Cursor Off"}
                icon={<MousePointer2 className="h-4 w-4" />}
                onClick={toggleCustomCursor}
                active={showCustomCursor}
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
        className={`mt-4 rounded-full p-4 shadow-lg transition-all duration-300 ${isOpen ? "rotate-90 bg-foreground text-background" : "border border-border bg-card text-foreground"}`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}

function CapsuleAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center gap-1 rounded-2xl p-2 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
    >
      {icon}
      <span className="pointer-events-none absolute -top-8 rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}

function CapsuleToggle({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl p-3 transition-all ${active ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:bg-foreground/10"}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div
        className={`h-2 w-2 rounded-full ${active ? "bg-background" : "bg-muted-foreground/30"}`}
      />
    </button>
  );
}
