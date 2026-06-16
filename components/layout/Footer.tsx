import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={110}
            height={28}
            className="h-7 w-auto"
          />
        </Link>

        <p className="text-xs text-text-muted text-center">
          © 2026 JobPilot. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-xs text-text-secondary hover:text-accent transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-xs text-text-secondary hover:text-accent transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
