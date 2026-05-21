"use server";

import { Resend } from "resend";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 100) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return { status: "error", message: "Please enter a valid email." };
  }
  if (!message || message.length > 2000) {
    return { status: "error", message: "Message is required (under 2000 characters)." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error("[sendContact] Missing env vars: RESEND_API_KEY, CONTACT_EMAIL_TO, or CONTACT_EMAIL_FROM");
    return { status: "error", message: "Email service is not configured. Please email us directly." };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New contact from ${name} via factumfitness.com`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5;">
          <h2 style="margin: 0 0 16px;">New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[sendContact] Resend error:", error);
      return { status: "error", message: "Could not send. Please try again or email us directly." };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[sendContact] Unexpected error:", err);
    return { status: "error", message: "Could not send. Please try again or email us directly." };
  }
}
