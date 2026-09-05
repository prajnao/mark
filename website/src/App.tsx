import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MousePointerClickIcon,
  TableOfContentsIcon,
  Moon02Icon,
  TextFontIcon,
  File01Icon,
  SourceCodeIcon,
  MathIcon,
  FlowchartIcon,
  Image02Icon,
  LockedIcon,
  HardDriveIcon,
  ShieldIcon,
  GithubIcon,
} from "@hugeicons/core-free-icons";

import Changelog from "./components/changelog";
import HowToUse from "./components/how-to-use";
import MarkWordmark from "./components/logo";
import { getExtensionVersion } from "./lib/get-version";
import Privacy from "./components/privacy";

type Feature = {
  icon: ReactNode;
  label: string;
  description: string;
};

const ICON_SIZE = 16;

const FEATURES: Feature[] = [
  {
    icon: <HugeiconsIcon icon={MousePointerClickIcon} size={ICON_SIZE} />,
    label: "Double-click to read",
    description: "Open any local .md file straight in your browser",
  },
  {
    icon: <HugeiconsIcon icon={TableOfContentsIcon} size={ICON_SIZE} />,
    label: "Contents rail",
    description:
      "A toc built from your headings, with click-to-jump and live position",
  },
  {
    icon: <HugeiconsIcon icon={Moon02Icon} size={ICON_SIZE} />,
    label: "Themes",
    description: "Light, dark, or follow your system",
  },
  {
    icon: <HugeiconsIcon icon={TextFontIcon} size={ICON_SIZE} />,
    label: "Typography",
    description: "Measure, spacing, and rhythm tuned for long documents",
  },
  {
    icon: <HugeiconsIcon icon={File01Icon} size={ICON_SIZE} />,
    label: "GitHub Flavored Markdown",
    description:
      "Tables, task lists, footnotes, strikethrough, and automatic links",
  },
  {
    icon: <HugeiconsIcon icon={SourceCodeIcon} size={ICON_SIZE} />,
    label: "Code blocks",
    description: "Syntax highlighting with a language label and a copy button",
  },
  {
    icon: <HugeiconsIcon icon={MathIcon} size={ICON_SIZE} />,
    label: "Math",
    description: "Inline and block equations rendered with KaTeX",
  },
  {
    icon: <HugeiconsIcon icon={FlowchartIcon} size={ICON_SIZE} />,
    label: "Diagrams",
    description: "Mermaid flowcharts, sequences, and more",
  },
  {
    icon: <HugeiconsIcon icon={Image02Icon} size={ICON_SIZE} />,
    label: "Images and SVG",
    description: "Local files, remote URLs, and inline vector graphics",
  },
  {
    icon: <HugeiconsIcon icon={LockedIcon} size={ICON_SIZE} />,
    label: "Read-only",
    description: "Your file is never touched",
  },
  {
    icon: <HugeiconsIcon icon={HardDriveIcon} size={ICON_SIZE} />,
    label: "Local-first",
    description: "Nothing is uploaded. No server, no account",
  },
  {
    icon: <HugeiconsIcon icon={ShieldIcon} size={ICON_SIZE} />,
    label: "Sanitized",
    description: "Every document is cleaned before it renders",
  },
  {
    icon: <HugeiconsIcon icon={GithubIcon} size={ICON_SIZE} />,
    label: "Open source",
    description: "Free, and the code is public",
  },
];

function Features() {
  return (
    <section>
      <h4 className="mb-4 font-[450] text-strong">Features</h4>

      <div className="grid grid-cols-1 gap-4">
        {FEATURES.map((feature) => (
          <div key={feature.label} className="flex items-center gap-2 text-sm">
            <span className="shrink-0 text-muted">{feature.icon}</span>

            <p className="text-sm">
              <span className="text-strong">{feature.label}</span>
              <span className="text-muted"> - {feature.description}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  const isChangelog =
    typeof window !== "undefined" && window.location.pathname === "/changelog";

  const isPrivacy =
    typeof window !== "undefined" && window.location.pathname === "/privacy";

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-y-12 px-4 py-10">
      <section>
        <nav className="flex items-center justify-between">
          <MarkWordmark />

          <div className="flex items-center gap-x-1.5">
            <span className="text-muted">{getExtensionVersion()}</span>

            <a
              href="https://github.com/prajnao/mark"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="mb-0.5 inline-flex h-4 w-4 items-center justify-center text-muted transition-colors hover:text-strong"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.92c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.93 0 1.4-.01 2.53-.01 2.88 0 .28.18.6.69.5A10.2 10.2 0 0 0 22 12.23C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
          </div>
        </nav>

        {(!isChangelog && !isPrivacy )  && (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Mark is a simple, intuitive way to read Markdown files in your
            browser.
          </p>
        )}
      </section>

      {isChangelog ? (
        <Changelog />
      ) : isPrivacy ? (
        <Privacy />
      ) : (
        <>
          <HowToUse />
          <Features />
        </>
      )}

      <footer>
        <hr className="mb-4 border-border" />

        <div className="flex items-center justify-between text-sm">
          <p>
            Crafted by{" "}
            <a
              href="https://x.com/prjnap"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-muted transition-colors hover:text-strong"
            >
              prajna
            </a>
          </p>

          <div className="flex items-center gap-x-4">
          {!isChangelog && (
            <div className="flex flex-wrap gap-1.5 text-muted">
              <a
                href="/changelog"
                className="transition-colors hover:text-strong"
              >
                Changelog
              </a>
            </div>
          )}

{!isPrivacy &&  <div className="flex flex-wrap gap-1.5 text-muted">
              <a
                href="/privacy"
                className="transition-colors hover:text-strong"
              >
               Privacy
              </a>
            </div>}

          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
