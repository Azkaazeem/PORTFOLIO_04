import { useState, useRef } from "react";
import { Github, Linkedin, Mail, MapPin, Share2, Send, CheckCircle2, Loader2, X } from "lucide-react";
import { contact } from "@/data/portfolio";

const RedditIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" {...props}>
    <path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.679c0-.975-.794-1.767-1.77-1.767-.622 0-1.166.326-1.48.816-1.558-1.086-3.704-1.737-6.05-1.808l1.293-6.053 4.195 1.053c.015.646.541 1.164 1.189 1.164.658 0 1.191-.533 1.191-1.189 0-.657-.533-1.191-1.191-1.191-.502 0-.932.311-1.096.756l-4.63-1.163c-.11-.027-.223.036-.255.143l-1.427 6.671c-2.443.018-4.681.677-6.305 1.803-.314-.486-.856-.81-1.478-.81-.975 0-1.768.791-1.768 1.766 0 .66.368 1.233.916 1.536-.037.228-.057.461-.057.697 0 3.254 3.993 5.9 8.91 5.9s8.911-2.646 8.911-5.9c0-.236-.02-.468-.058-.696.548-.303.916-.876.916-1.536zm-10.05 3.097c0 .506-.414.918-.923.918-.508 0-.922-.412-.922-.918 0-.507.414-.919.922-.919.509 0 .923.412.923.919z" />
  </svg>
);

const socialIcons = { LinkedIn: Linkedin, GitHub: Github, Reddit: RedditIcon } as const;

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const items = [
    { icon: MapPin, label: "Address", value: contact.address, href: null },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Web3Forms Access Key from .env or fallback
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "fe53f3e7-0ef7-4f92-8813-905ab3075c5c";

    if (!accessKey) {
      // If no key yet configured in .env, simulate successful submission and notify
      setTimeout(() => {
        setLoading(false);
        setShowPopup(true);
        form.reset();
      }, 700);
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setShowPopup(true);
        form.reset();
      } else {
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("Could not send message. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Upper Heading */}
        <div className="mb-12 max-w-2xl">
          <p className="section-label text-[0.62rem] sm:text-[0.72rem]">Contact</p>
          <h2 className="display-xl mt-3 text-4xl sm:text-5xl lg:text-6xl">
            Let&apos;s Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Have a question, project proposal, or want to collaborate? Send me a message below or contact me directly.
          </p>
        </div>

        {/* 2-Column Layout: Left Details + Right Form */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Details Column */}
          <div className="relative z-10 min-w-0">
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              Let&apos;s work <span className="text-primary">together</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Feel free to reach out through the form or my social accounts.
            </p>

            <ul className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
              {items.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex min-w-0 items-start gap-4 sm:gap-5">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="block min-w-0">
                    <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground sm:text-xs">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="red-underline mt-1 inline-block break-words text-sm font-medium text-foreground sm:text-base"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="mt-1 block break-words text-sm font-medium text-foreground sm:text-base">
                        {value}
                      </span>
                    )}
                  </span>
                </li>
              ))}

              <li className="flex min-w-0 items-start gap-4 sm:gap-5">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-primary">
                  <Share2 className="h-4 w-4" />
                </span>
                <span className="block min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground sm:text-xs">
                    Follow Me
                  </span>
                  <span className="mt-3 flex flex-wrap gap-3">
                    {contact.socials.map((social) => {
                      const Icon = socialIcons[social.name as keyof typeof socialIcons];
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={social.name}
                          className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative z-10 rounded-2xl border border-border bg-card/70 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            <h3 className="text-xl font-bold text-foreground">
              Send a <span className="text-primary">Message</span>
            </h3>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Fill out this form and it will be delivered directly to my Gmail inbox.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, idea, or question..."
                  className="w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-500 font-medium">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_-4px_rgba(230,57,70,0.5)] transition-all duration-300 hover:shadow-[0_8px_28px_-4px_rgba(230,57,70,0.7)] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Submission Success Popup Modal */}
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setShowPopup(false)}
              aria-label="Close popup"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h4 className="mt-4 text-xl font-bold text-foreground">
              Message Sent Successfully! 🎉
            </h4>

            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Thank you for reaching out! Your message has been sent directly to Azka&apos;s Gmail inbox. I will review it and reply as soon as possible.
            </p>

            <div className="mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-95"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
