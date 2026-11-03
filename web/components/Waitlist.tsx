"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/email";
import { buttonClass } from "./Button";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "invalid"; message: string }
  | { kind: "failed"; message: string }
  | { kind: "demo" };

const INVALID = "Enter a valid email address, like name@example.com.";
const TIMEOUT_MS = 10_000;

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const invalid = state.kind === "invalid";
  const sending = state.kind === "sending";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!isValidEmail(email)) {
      setState({ kind: "invalid", message: INVALID });
      inputRef.current?.focus();
      return;
    }
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === "demo") setState({ kind: "demo" });
      else if (res.status === 400) {
        setState({ kind: "invalid", message: data.message ?? INVALID });
        inputRef.current?.focus();
      } else setState({ kind: "failed", message: "Something went wrong on our side. Try again in a minute." });
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === "TimeoutError";
      setState({
        kind: "failed",
        message: timedOut
          ? "The server took too long to answer. Try again in a minute."
          : "Couldn’t reach the server. Check your connection and try again.",
      });
    }
  }

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="mx-auto mt-32 max-w-[1240px] px-4 sm:mt-40">
      <div className="rounded-lg bg-paper-paleblue px-6 py-14 text-center sm:px-12 sm:py-20">
        {/* the key restarts the reaction each time the form's state changes */}
        <div
          key={state.kind}
          className={`mx-auto mb-5 w-24 sm:w-28 ${
            state.kind === "demo" ? "mascot-happy" : invalid || state.kind === "failed" ? "mascot-sad" : ""
          }`}
        >
          <Image src="/assets/3d/mascot.webp" alt="" width={820} height={698} sizes="112px" className="h-auto w-full" />
        </div>
        <h2
          id="waitlist-title"
          className="font-display-tight mx-auto max-w-[16ch] text-h2 leading-heading tracking-heading text-balance"
        >
          Be first to try it.
        </h2>
        <p className="mx-auto mt-4 max-w-[44ch] text-lead">
          Leave your email and we’ll tell you when it’s ready to use.
        </p>

        <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-[560px] text-left">
          <label htmlFor="waitlist-email" className="mb-2 block pl-5 text-small font-semibold">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-2 sm:rounded-pill sm:bg-bg sm:p-1.5 sm:shadow-card">
            <input
              ref={inputRef}
              id="waitlist-email"
              type="email"
              maxLength={254}
              name="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state.kind !== "idle" && state.kind !== "sending") setState({ kind: "idle" });
              }}
              onBlur={() => {
                if (email.trim() && !isValidEmail(email)) setState({ kind: "invalid", message: INVALID });
              }}
              aria-invalid={invalid}
              aria-describedby="waitlist-status waitlist-note"
              className="min-h-12 w-full min-w-0 rounded-pill border-[1.5px] border-field bg-bg px-5 text-body text-ink placeholder:text-ink-2 aria-invalid:border-error sm:border-transparent sm:aria-invalid:border-error"
            />
            <button type="submit" disabled={sending} className={buttonClass("primary", "disabled:opacity-70")}>
              {sending ? "Joining…" : "Join the waitlist"}
            </button>
          </div>

          {/* Space is reserved so the layout doesn't jump when a message appears. */}
          <div id="waitlist-status" aria-live="polite" className="mt-2 min-h-8 pl-5 text-small">
            {(state.kind === "invalid" || state.kind === "failed") && (
              <p className="pop-in font-semibold text-error">{state.message}</p>
            )}
            {state.kind === "demo" && (
              <p className="pop-in font-semibold text-ink">
                Demo mode: your email was checked but not saved. The waitlist isn’t connected to an email service
                yet.
              </p>
            )}
          </div>

          <p id="waitlist-note" className="pl-5 text-small text-ink">
            We’ll only use your email to tell you when we launch. Unsubscribe anytime.{" "}
            <a href="/privacy" className="font-semibold underline underline-offset-2">
              Privacy
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
