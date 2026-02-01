import { type ActionFunctionArgs, data } from "react-router";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters")
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
            return data({
                error: "Validation failed",
                details: result.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { name, email, message } = result.data;

        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        try {
            const data = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'santiago.correa@wegrix.dev',
                subject: `New Contact from Portfolio: ${name}`,
                html: `
                    <h2>New Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `
            });

            if (data.error) {
                console.error("Resend API Error:", data.error);
                throw new Error("Failed to send email via Resend");
            }
        } catch (emailError) {
            console.error("Resend Execution Error:", emailError);
            return data({ error: "Failed to send email service" }, { status: 500 });
        }

        return data({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error("Contact Form Error:", error);
        return data({ error: "Failed to send message" }, { status: 500 });
    }
}
