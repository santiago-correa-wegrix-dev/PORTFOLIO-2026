import { type ActionFunctionArgs, data } from "react-router";
import { Resend } from "resend";
import { z } from "zod";

const escapeHtml = (str: string) =>
  str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const contactSchema = z.object({
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData);

    // Zod Validation
    const result = contactSchema.safeParse(payload);

    if (!result.success) {
      const details = result.error.issues.reduce((acc: Record<string, string[]>, curr) => {
        const key = curr.path[0] as string;
        if (!acc[key]) {acc[key] = [];}
        acc[key].push(curr.message);
        return acc;
      }, {});

      console.error("Validation Failed:", details);
      return data(
        {
          details,
          error: "Please check the form for errors.",
        },
        { status: 400 },
      );
    }

    const { name, email, message } = result.data;

    if (!process.env.RESEND_API_KEY) {
      return data({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
        html: `
                    <h2>New Message</h2>
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Message:</strong></p>
                    <p>${escapeHtml(message)}</p>
                `,
        subject: `New Contact from Portfolio: ${escapeHtml(name)}`,
        to: process.env.CONTACT_EMAIL ?? "santiago.correa@wegrix.dev",
      });

      if (emailResult.error) {
        console.error("Resend API Error:", emailResult.error);
        throw new Error("Failed to send email via Resend");
      }
    } catch (emailError) {
      console.error("Resend Execution Error:", emailError);
      return data({ error: "Failed to send email service" }, { status: 500 });
    }

    return data({ message: "Email sent successfully!", success: true });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return data({ error: "Failed to send message" }, { status: 500 });
  }
}
