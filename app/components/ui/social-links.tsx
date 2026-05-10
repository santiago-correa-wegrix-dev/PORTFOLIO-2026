import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { getSocialIconElement } from "~/components/ui/social-icon";
import { socialLinks } from "~/data/social-links";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  showDividerBeforeResume?: boolean;
}

export function SocialLinks({
  className = "flex gap-3",
  iconClassName,
  showDividerBeforeResume = false,
}: SocialLinksProps) {
  return (
    <TooltipProvider>
      <div className={className}>
        {socialLinks.map((link) => (
          <span key={link.label} className="contents">
            {showDividerBeforeResume && link.icon === "resume" && (
              <div className="mx-1 h-8 w-px self-center bg-border" />
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={
                    iconClassName ??
                    "rounded-full border border-zinc-200 bg-white/80 p-2.5 text-zinc-500 backdrop-blur-sm transition-all hover:scale-110 hover:border-zinc-400 hover:text-black hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-white"
                  }
                >
                  {getSocialIconElement(link.icon)}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </span>
        ))}
      </div>
    </TooltipProvider>
  );
}
