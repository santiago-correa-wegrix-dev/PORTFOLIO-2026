import { FileDown, Mail } from "lucide-react";

import { SimpleIcon, siGithub, siLinkedin } from "~/components/ui/simple-icon";
import type { SocialLink } from "~/data/social-links";

const ICON_MAP = {
  github: () => <SimpleIcon icon={siGithub} />,
  linkedin: () => <SimpleIcon icon={siLinkedin} />,
  mail: () => <Mail className="h-5 w-5" />,
  resume: () => <FileDown className="h-5 w-5" />,
} as const;

export function getSocialIconElement(icon: SocialLink["icon"]) {
  return ICON_MAP[icon]();
}
