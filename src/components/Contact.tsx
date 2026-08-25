import { Github, Linkedin, Mail, MapPin, Share2 } from "lucide-react";
import { contact } from "@/data/portfolio";
import ShootingStars from "@/components/ShootingStars";

const RedditIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" {...props}>
    <path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.679c0-.975-.794-1.767-1.77-1.767-.622 0-1.166.326-1.48.816-1.558-1.086-3.704-1.737-6.05-1.808l1.293-6.053 4.195 1.053c.015.646.541 1.164 1.189 1.164.658 0 1.191-.533 1.191-1.189 0-.657-.533-1.191-1.191-1.191-.502 0-.932.311-1.096.756l-4.63-1.163c-.11-.027-.223.036-.255.143l-1.427 6.671c-2.443.018-4.681.677-6.305 1.803-.314-.486-.856-.81-1.478-.81-.975 0-1.768.791-1.768 1.766 0 .66.368 1.233.916 1.536-.037.228-.057.461-.057.697 0 3.254 3.993 5.9 8.91 5.9s8.911-2.646 8.911-5.9c0-.236-.02-.468-.058-.696.548-.303.916-.876.916-1.536zm-10.05 3.097c0 .506-.414.918-.923.918-.508 0-.922-.412-.922-.918 0-.507.414-.919.922-.919.509 0 .923.412.923.919z" />
  </svg>
);

const socialIcons = { LinkedIn: Linkedin, GitHub: Github, Reddit: RedditIcon } as const;

export default function Contact() {
  const items = [
    { icon: MapPin, label: "Address", value: contact.address, href: null },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-16 sm:py-24 lg:py-28">
      <ShootingStars direction="top-right" />
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
          className="display-xl pointer-events-none hidden select-none text-right text-6xl leading-loose tracking-[0.2em] text-muted-foreground/10 sm:block lg:text-7xl lg:leading-[1.7]"
        >
          Let&apos;s<br/>
          get in<br/>
          touch
        </p>
      </div>
    </section>
  );
}
