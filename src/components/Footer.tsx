import Link from "next/link";

const footerLinks = {
  Products: [
    { href: "/products", label: "All Products" },
    { href: "/products#featured", label: "Featured" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/stream", label: "Progress Stream" },
  ],
  Connect: [
    { href: "https://github.com/strugcity", label: "GitHub" },
    { href: "https://x.com/strugcity", label: "X / Twitter" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg aurora-gradient-bg">
                <span className="text-sm font-bold text-background">SC</span>
              </div>
              <span className="text-lg font-semibold text-text-primary">
                Strug City
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              A virtual engineering team building the future with AI-powered
              tools and platforms.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-text-primary">
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-aurora-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Strug City. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Built with AI. Powered by ambition.
          </p>
        </div>
      </div>
    </footer>
  );
}
