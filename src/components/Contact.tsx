import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { contact } from "@/data/portfolio";

const socialIcons = { LinkedIn: Linkedin, GitHub: Github, Instagram: Instagram } as const;

export default function Contact() {
  const items = [
    { icon: MapPin, label: "Address", value: contact.address, href: null },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-16 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10 min-w-0">
          <p className="section-label text-[0.62rem] sm:text-[0.72rem]">Contact</p>
          <h2 className="display-xl mt-3 text-3xl sm:text-4xl lg:text-5xl">
            Let&apos;s work <span className="text-primary">together</span>
          </h2>

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

        {/* Large low-opacity background type */}
        <p
          aria-hidden
          className="display-xl pointer-events-none hidden select-none break-words text-right text-[12vw] leading-[0.85] text-muted-foreground/10 sm:block lg:text-[11vw]"
        >
          Let&apos;s get in touch
        </p>
      </div>
    </section>
  );
}
