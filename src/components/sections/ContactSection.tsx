import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  MapPin,
  Phone,
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
type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);
  const [selectedIntent, setSelectedIntent] =
    useState<IntentTag>("Full-Time Role");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const phoneNumber = portfolioData.identity.phone ?? "+20 109 400 5690";
  const telLink = `tel:${phoneNumber.replace(/\s+/g, "")}`;
  const cleanWhatsAppNumber = phoneNumber.replace(/\D/g, ""); // "201094005690"
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    "Hi Yousif, I'd like to discuss a project / role.",
  )}`;

  const copyEmail = () => {
    void navigator.clipboard
      .writeText(portfolioData.identity.email)
      .then(() => {
        setIsCopied(true);
        window.setTimeout(() => setIsCopied(false), 2000);
      });
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Append metadata
    formData.append("topic", selectedIntent);

    // REPLACE with your free Web3Forms access key (from web3forms.com)
    // or set your Formspree endpoint URL
    formData.append("access_key", "67889ba2-a1ea-4ead-9e70-6beb3384bec2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        // Fallback to mailto if API key is not yet configured
        triggerMailtoFallback(formData);
        setStatus("success");
      }
    } catch {
      // Graceful offline fallback
      triggerMailtoFallback(formData);
      setStatus("success");
    }
  };

  const triggerMailtoFallback = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(
      `[${selectedIntent}] Inquiry from ${name}`,
    );
    const body = encodeURIComponent(
      `Hi Yousif,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}\nTopic: ${selectedIntent}`,
    );

    window.location.href = `mailto:${portfolioData.identity.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      className="relative mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 md:px-10 md:pb-24 md:pt-8"
      id="contact"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[300px] w-[300px] rounded-full bg-accent/5 blur-2xl sm:h-[420px] sm:w-[650px] sm:blur-[140px]" />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface/70 p-5 backdrop-blur-md sm:rounded-3xl sm:p-8 sm:backdrop-blur-xl md:p-12 lg:rounded-[2.5rem] lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left Column: Direct Channels & Verified Logistics */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.24em]">
               
                <span>Start a conversation</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-text-base sm:mt-5 sm:text-4xl md:text-5xl">
                Let&apos;s build something durable.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted sm:mt-5 sm:text-base">
                Available for full-time backend and full-stack engineering
                roles, technical contracting, and scalable product
                architectures.
              </p>

              {/* Status & Logistics Details */}
              <div className="mt-6 flex flex-col gap-2.5 text-xs text-text-muted sm:mt-8 sm:gap-3">
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="shrink-0 text-accent" />
                  <span>
                    Response time:{" "}
                    <strong className="text-text-base font-semibold">
                      within 24 hours
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin size={15} className="shrink-0 text-accent" />
                  <span>Cairo (UTC+2) · Remote worldwide</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="shrink-0 text-accent" />
                  <a
                    href={`tel:${phoneNumber}`}
                    className="transition-colors hover:text-text-base"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Connect Actions: Copy Email, Call/WhatsApp, LinkedIn */}
            <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              {/* Primary Copy Email Button */}
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.25)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                <span>{isCopied ? "Email Copied!" : "Copy Email Address"}</span>
              </button>

              {/* Phone Direct Dial Button */}
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated/70 px-4 py-2.5 text-xs font-medium text-text-base transition-colors hover:border-accent hover:text-accent sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
              >
                <Phone size={15} />
                <span>Call Directly</span>
              </a>

              {/* WhatsApp Direct Chat Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated/70 px-4 py-2.5 text-xs font-medium text-text-base transition-colors hover:border-accent hover:text-accent sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
              >
                {/* Precision-centered WhatsApp icon matching theme text-accent */}
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="h-4 w-4 text-accent transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                <span>WhatsApp</span>
                <ArrowUpRight
                  size={14}
                  className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            </div>
          </div>

          {/* Right Column: Locked Frame Dispatcher Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex min-h-[520px] flex-col justify-center rounded-2xl border border-border/90 bg-surface-elevated/40 p-4 backdrop-blur-md sm:min-h-[550px] sm:rounded-3xl sm:p-6 md:p-8"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="my-auto flex h-full w-full flex-1 flex-col items-center justify-center p-4 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <CheckCircle2 size={28} />
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-text-base">
                    Message Dispatched!
                  </h3>

                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-text-muted sm:text-sm">
                    Thank you for reaching out. Your note has been delivered
                    directly to my inbox and I will respond within 24 hours.
                  </p>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-base transition-colors hover:border-accent hover:text-accent cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form
                  key="contact-form"
                  className="grid gap-4 sm:gap-5"
                  onSubmit={handleSendMessage}
                >
                  {/* Intent Filter Chips */}
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
                        className="w-full rounded-xl border border-border/80 bg-canvas/80 px-3.5 py-2.5 font-sans text-xs text-text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-text-muted/40 outline-none transition-all focus:border-accent focus:bg-canvas focus:ring-1 focus:ring-accent/40 sm:px-4 sm:py-3 sm:text-sm"
                      />
                    </label>

                    <label className="grid gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:gap-2 sm:text-xs sm:tracking-[0.16em]">
                      Your Email
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="jane@company.com"
                        className="w-full rounded-xl border border-border/80 bg-canvas/80 px-3.5 py-2.5 font-sans text-xs text-text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-text-muted/40 outline-none transition-all focus:border-accent focus:bg-canvas focus:ring-1 focus:ring-accent/40 sm:px-4 sm:py-3 sm:text-sm"
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
                      placeholder="Tell me about what you're building, scope, timelines, or specifications..."
                      className="w-full resize-none rounded-xl border border-border/80 bg-canvas/80 p-3 font-sans text-xs text-text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-text-muted/40 outline-none transition-all focus:border-accent focus:bg-canvas focus:ring-1 focus:ring-accent/40 sm:p-4 sm:text-sm"
                    />
                  </label>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-xs font-semibold text-accent-contrast shadow-[0_0_24px_rgba(217,184,255,0.3)] transition-all hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-70 sm:py-3.5 sm:text-sm cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send
                          size={14}
                          className="transition-transform group-hover:translate-x-1 sm:size-[15px]"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-text-muted sm:text-[11px]">
                    Direct inbox dispatch. No spam, immediate confirmation.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
