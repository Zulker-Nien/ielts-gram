"use client";

import { useStore } from "@/app/store/useStore";
import { t } from "@/app/store/translations";
import Image from "next/image";

export default function Footer() {
  const lang = useStore((s) => s.lang);
  return (
    <footer className="border-t border-theme-border bg-theme-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Image
                      alt="logo"
                      src={"/logo.png"}
                      width={0}
                      height={0}
                      className="h-16 w-auto"
                      unoptimized
                    />
            <p className="mt-3 text-sm leading-relaxed text-theme-text-muted">
              {t.footer.tagline[lang]}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-theme-text">{t.footer.quickLinks[lang]}</h4>
            <ul className="space-y-2 text-sm text-theme-text-muted">
              {t.footer.footerLinks.map((l) => (
                <li key={l.en}>
                  <a href={`#${l.en.toLowerCase()}`} className="transition-colors hover:text-theme-accent">
                    {l[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-theme-text">{t.footer.contact[lang]}</h4>
            <ul className="space-y-2 text-sm text-theme-text-muted">
              <li>
                <a href="mailto:mahbuburrahman6532@gmail.com" className="transition-colors hover:text-theme-accent">
                  mahbuburrahman6532@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-theme-accent">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61559938447857" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-theme-accent">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-theme-border pt-6 text-center text-xs text-theme-text-muted">
          &copy; {new Date().getFullYear()} ieltsgram. {t.footer.copyright[lang]}
        </div>
      </div>
    </footer>
  );
}
