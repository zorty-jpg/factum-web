"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContact, type ContactState } from "../actions/sendContact";

const INITIAL_STATE: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="self-start mt-4 text-[11px] uppercase tracking-[0.14em] link-underline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Send message →"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContact, INITIAL_STATE);

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-6 max-w-[560px]">
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
          Or send a note
        </p>
        <p className="text-[22px] md:text-[24px] leading-[1.3]">
          Got it. We&rsquo;ll get back to you soon.
        </p>
        <p className="text-[14px] text-white/60 max-w-[420px]">
          In the meantime, your first class is free — just walk in.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-8 max-w-[560px]" noValidate>
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
        Or send a note
      </p>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
      />

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
          Name
        </span>
        <input
          type="text"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className="bg-transparent border-b border-white/30 py-2 text-[18px] md:text-[20px] outline-none focus:border-red transition-colors"
          placeholder="Your name"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          maxLength={200}
          autoComplete="email"
          className="bg-transparent border-b border-white/30 py-2 text-[18px] md:text-[20px] outline-none focus:border-red transition-colors"
          placeholder="you@email.com"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
          Message
        </span>
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
          className="bg-transparent border-b border-white/30 py-2 text-[18px] md:text-[20px] outline-none focus:border-red transition-colors resize-none"
          placeholder="What do you want to train?"
        />
      </label>

      {state.status === "error" && (
        <p
          role="alert"
          className="text-[13px] text-[var(--red)] uppercase tracking-[0.14em]"
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
