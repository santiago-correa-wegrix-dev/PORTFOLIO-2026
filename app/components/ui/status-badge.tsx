import { Magnetic } from "~/components/ui/magnetic";

export function StatusBadge() {
    return (
        <Magnetic>
            <span className="cursor-hover inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/50 border border-zinc-200 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Available for work</span>
            </span>
        </Magnetic>
    );
}
