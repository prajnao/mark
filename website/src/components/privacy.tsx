export default function Privacy() {
    return (
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <header className="flex items-baseline gap-3">
            <h2 className="font-medium text-strong">Privacy</h2>
            <span className="text-xs text-muted">5 September 2026</span>
          </header>
  
          <div className="flex flex-col gap-3 text-muted text-sm">
            <p>Mark does not collect, transmit, or store any personal data.</p>
  
            <p>
              All processing happens locally in your browser. Markdown files you
              open are read and rendered on your own device. No file content is
              sent anywhere.
            </p>
  
            <p>
              The extension stores only your display preferences, your theme
              choice and sidebar state using your browser's local storage. This
              data stays on your device and is never transmitted.
            </p>
  
            <p>There is no server, no account, and no analytics.</p>
  
            <p>
              Please open an issue on{" "}
              <a
                href="https://github.com/prajnao/mark/issues"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-current/40 underline-offset-2 hover:decoration-current"
              >
                GitHub
              </a>{" "}
              for any questions.
            </p>
          </div>
        </section>
      </div>
    );
  }