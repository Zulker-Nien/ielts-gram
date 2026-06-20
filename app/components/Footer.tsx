"use client";

export default function Footer() {
  return (
    <footer className="border-t border-theme-border bg-theme-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <span className="text-xl font-bold tracking-tight text-theme-accent">
              ielts<span className="text-theme-text">gram</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-theme-text-muted">
              Specialised IELTS Speaking coaching with a proven track record of Band 7+ results.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-theme-text">Quick Links</h4>
            <ul className="space-y-2 text-sm text-theme-text-muted">
              {["About", "Services", "Testimonials", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-theme-accent">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-theme-text">Contact</h4>
            <ul className="space-y-2 text-sm text-theme-text-muted">
              <li>
                <a href="mailto:hello@ieltsgram.com" className="transition-colors hover:text-theme-accent">
                  hello@ieltsgram.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-theme-accent">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://facebook.com/ieltsgram" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-theme-accent">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-theme-border pt-6 text-center text-xs text-theme-text-muted">
          &copy; {new Date().getFullYear()} ieltsgram. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
