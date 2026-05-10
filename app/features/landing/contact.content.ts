// oxlint-disable-next-line id-length
import { type Dictionary, t } from "intlayer";

const contactContent: Dictionary = {
  content: {
    copyright: t({ en: "© 2026 Santiago Correa. All rights reserved." }),
    description: t({
      en: "Have a project in mind? Let's build something extraordinary together.",
    }),
    emailLabel: t({ en: "Email" }),
    messageLabel: t({ en: "Message" }),
    messagePlaceholder: t({ en: "Tell me about your project..." }),
    messageSentDescription: t({ en: "Thanks for reaching out! I'll get back to you as soon as possible." }),
    messageSentTitle: t({ en: "Message Sent!" }),
    nameLabel: t({ en: "Name" }),
    sendAnother: t({ en: "Send Another" }),
    sendButton: t({ en: "Send Message" }),
    sending: t({ en: "Sending..." }),
    titleLine1: t({ en: "Let's build" }),
    titleLine2: t({ en: "something" }),
    titleLine3: t({ en: "together." }),
  },
  key: "contact",
};

export default contactContent;
