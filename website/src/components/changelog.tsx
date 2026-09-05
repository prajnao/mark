import type { ReactNode } from "react";
import changelog from "../../../extension/CHANGELOG.md?raw";


type Release = {
  version: string;
  date: string;
  changes: string[];
};


function parseChangelog(raw: string): Release[] {
  const releases: Release[] = [];
  let current: Release | null = null;

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      const heading = trimmed.slice(3).trim();

      const [version, date] = heading.split(/\s+-\s+/);

      current = {
        version: version?.trim() ?? heading,
        date: date?.trim() ?? "",
        changes: [],
      };

      releases.push(current);
      continue;
    }

  
    if (trimmed.startsWith("- ") && current) {
      current.changes.push(trimmed.slice(2).trim());
    }
  }

  return releases;
}

/**
 * Renders Markdown links inside a line of text.
 *
 * Changelogs often link to an issue or a pull request. Nothing else is
 * supported, so do not use bold or inline code in the file.
 */
function renderInline(text: string): ReactNode {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;

    return (
      <a
        key={index}
        href={match[2]}
        target="_blank"
        rel="noreferrer"
        className="underline decoration-current/40 underline-offset-2 hover:decoration-current"
      >
        {match[1]}
      </a>
    );
  });
}


const releases = parseChangelog(changelog);

export default function Changelog() {
  if (releases.length === 0) {
    return <p className="text-muted">No releases yet.</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {releases.map((release) => (
        <section key={release.version} className="flex flex-col gap-3">
          <header className="flex items-baseline gap-3">
            <h2 className="font-medium text-strong">{release.version}</h2>
            {release.date && (
              <span className="text-xs text-muted">{release.date}</span>
            )}
          </header>

          <ul className="list-disc space-y-1 pl-5 text-muted">
            {release.changes.map((change, index) => (
              <li key={index} className="text-sm">{renderInline(change)}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}