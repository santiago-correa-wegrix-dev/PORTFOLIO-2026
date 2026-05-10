import { t, type Dictionary } from "intlayer";

const contactContent = {
  key: "contact",
  content: {
    titleLine1: t({ en: "Let's build" }),
    titleLine2: t({ en: "something" }),
    titleLine3: t({ en: "together." }),
    description: t({
      en: "Have a project in mind? Let's build something extraordinary together.",
    }),
    nameLabel: t({ en: "Name" }),
    emailLabel: t({ en: "Email" }),
    messageLabel: t({ en: "Message" }),
    sendButton: t({ en: "Send Message" }),
  },
} satisfies Dictionary;

export default contactContent;
