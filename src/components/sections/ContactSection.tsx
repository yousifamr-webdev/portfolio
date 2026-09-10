import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { portfolioData } from "../../data/portfolioData";
import { LinkedInIcon } from "../ui/SocialIcons";

const INTENT_TAGS = [
  "Full-Time Role",
  "Contract / MVP",
  "Backend Architecture",
  "General Inquiry",
] as const;

type IntentTag = (typeof INTENT_TAGS)[number];

export default function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);
  const [selectedIntent, setSelectedIntent] =
    useState<IntentTag>("Full-Time Role");

  const copyEmail = () => {
    void navigator.clipboard
      .writeText(portfolioData.identity.email)
      .then(() => {
        setIsCopied(true);
        window.setTimeout(() => setIsCopied(false), 2000);
      });
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const userEmail = (form.elements.namedItem("email") as HTMLInputElement)
      .value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    const subject = encodeURIComponent(
      `[${selectedIntent}] Inquiry from ${name}`,
    );
    const body = encodeURIComponent(
      `Hi Yousif,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${userEmail}\nTopic: ${selectedIntent}`,
    );

    window.location.href = `mailto:${portfolioData.identity.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28"
      id="contact"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px] sm:h-[420px] sm:w-[650px] sm:blur-[140px]" />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface/70 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8 md:p-12 lg:rounded-[2.5rem] lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left Column: Direct Channels & Credibility */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.24em]">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>Start a conversation</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-text-base sm:mt-5 sm:text-4xl md:text-5xl">
                Let&apos;s build something durable.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted sm:mt-5 sm:text-base">
                Available for full-time backend and full-stack engineering
                roles, technical contracting, and high-impact digital products.
              </p>

              {/* Status Badges */}
              <div className="mt-6 flex flex-col gap-2 text-xs text-text-muted sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="shrink-0 text-accent" />
                  <span>
                    Response time:{" "}
                    <strong className="text-text-base">&lt; 24 hours</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="shrink-0 text-accent" />
                  <span>Cairo (UTC+2) · Remote worldwide</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Pills (Full width stacked on mobile, row on tablet/desktop) */}
            <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.25)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                <span>{isCopied ? "Email Copied!" : "Copy Email Address"}</span>
              </button>

              <a
                href={`mailto:${portfolioData.identity.email}?subject=Project%20or%20Role%20Inquiry`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated/70 px-4 py-2.5 text-xs font-medium text-text-base transition-colors hover:border-accent hover:text-accent sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
              >
                <Mail size={16} />
                <span>Direct Mail</span>
              </a>

              <a
                href={portfolioData.identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated/70 px-4 py-2.5 text-xs font-medium text-text-base transition-colors hover:border-accent hover:text-accent sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
              >
                <LinkedInIcon className="h-4 w-4" />
                <span>LinkedIn</span>
                <ArrowUpRight
                  size={14}
                  className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            </div>
          </div>

          {/* Right Column: Pre-Configured Message Dispatcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/90 bg-surface-elevated/40 p-4 backdrop-blur-md sm:rounded-3xl sm:p-6 md:p-8"
          >
            <form className="grid gap-4 sm:gap-5" onSubmit={handleSendMessage}>
              {/* Intent Chips */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted sm:text-xs sm:tracking-[0.2em]">
                  I&apos;m inquiring about
                </label>
                <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                  {INTENT_TAGS.map((tag) => {
                    const isSelected = selectedIntent === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedIntent(tag)}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all sm:px-3.5 sm:py-1.5 sm:text-xs ${
                          isSelected
                            ? "border-accent bg-accent text-accent-contrast shadow-sm"
                            : "border-border/80 bg-surface text-text-muted hover:border-border hover:text-text-base"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:gap-2 sm:text-xs sm:tracking-[0.16em]">
                  Your Name
                  <input
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-border/80 bg-canvas/80 px-3.5 py-2.5 text-xs text-text-base placeholder:text-text-muted/50 outline-none transition-colors focus:border-accent focus:bg-canvas sm:px-4 sm:py-3 sm:text-sm"
                  />
                </label>

                <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:gap-2 sm:text-xs sm:tracking-[0.16em]">
                  Your Email
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-border/80 bg-canvas/80 px-3.5 py-2.5 text-xs text-text-base placeholder:text-text-muted/50 outline-none transition-colors focus:border-accent focus:bg-canvas sm:px-4 sm:py-3 sm:text-sm"
                  />
                </label>
              </div>

              {/* Message Field */}
              <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:gap-2 sm:text-xs sm:tracking-[0.16em]">
                Project or Role Details
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about what you're building, timelines, or role specs..."
                  className="w-full resize-none rounded-xl border border-border/80 bg-canvas/80 p-3 text-xs text-text-base placeholder:text-text-muted/50 outline-none transition-colors focus:border-accent focus:bg-canvas sm:p-4 sm:text-sm"
                />
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-xs font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.3)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:py-3.5 sm:text-sm"
              >
                <span>Draft Email to Yousif</span>
                <Send
                  size={14}
                  className="transition-transform group-hover:translate-x-1 sm:size-[15px]"
                />
              </button>

              <p className="text-center text-[10px] text-text-muted sm:text-[11px]">
                Prefills a clean draft in your default email client with all
                structured details.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
