import HowToUse from "./components/how-to-use"
import MarkWordmark from "./components/logo"



function App() {

  return (
  <main className="min-h-screen px-4 py-20 mx-auto max-w-2xl flex flex-col gap-y-12">
    
    <nav className="flex items-center justify-between">
      <MarkWordmark/>
 

     <div className="flex items-center gap-x-1.5  cursor-pointer">
          <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="text-muted transition-colors hover:text-strong"
        >
          v1.3.4
        </a>
        <a
          href="https://github.com/prajnao/mark"
          target="_blank"
          rel="noreferrer"
          aria-label="NPM package"
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


    <section>
      <p className="text-muted text-sm leading-relaxed">Mark is a simple, intuitive way to read markdown files in your browser.</p>
    </section>


    {/* how to use  */}
   <HowToUse/>
    

    <section>
        <h4 className="text-strong font-[450]">Features</h4>
    </section>



<footer className="" >
  <hr className="mb-4 border-border"/>
  <div className="text-sm flex justify-between items-center">

  <p>Crafted by <a href="https://x.com/prjnap" target="_blank"  rel="noopener noreferrer" aria-label="x" className="text-muted hover:text-strong transition-colors cursor-pointer"><span>prajna</span> </a></p>



  <div className="flex flex-wrap gap-1.5 text-muted">
    <a href="/changelog" className="hover:text-strong transition-colors">Changelog</a>
  </div>
  </div>
</footer>
  </main>
  )
}

export default App



