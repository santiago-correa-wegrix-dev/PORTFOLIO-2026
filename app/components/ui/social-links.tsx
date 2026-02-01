import { Github, Linkedin, Mail } from "lucide-react";

import { Magnetic } from "~/components/ui/magnetic";

const links = [
    { Icon: Github, href: "https://github.com" },
    { Icon: Linkedin, href: "https://linkedin.com" },
    { Icon: Mail, href: "mailto:hello@example.com" }
];

export function SocialLinks() {
    return (
        <div className="flex gap-6 items-center">
            {links.map(({ Icon, href }, i) => (
                <Magnetic key={i}>
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-hover p-4 text-zinc-500 hover:text-black transition-colors border border-transparent hover:border-zinc-200 rounded-full bg-transparent hover:bg-zinc-100"
                    >
                        <Icon className="w-6 h-6" />
                    </a>
                </Magnetic>
            ))}
        </div>
    );
}
