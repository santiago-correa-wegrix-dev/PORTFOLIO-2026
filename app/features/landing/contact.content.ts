// oxlint-disable-next-line id-length
import { type Dictionary, t } from "intlayer";

const contactContent = {
  content: {
    description: t({
      en: "Have a project in mind? Let's build something extraordinary together.",
    }),
    emailLabel: t({ en: "Email" }),
    messageLabel: t({ en: "Message" }),
    nameLabel: t({ en: "Name" }),
    sendButton: t({ en: "Send Message" }),
    titleLine1: t({ en: "Let's build" }),
    titleLine2: t({ en: "something" }),
    titleLine3: t({ en: "together." }),
  },
  key: "contact",
} satisfies Dictionary;

export default contactContent;
