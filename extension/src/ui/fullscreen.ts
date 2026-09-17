const ENTER_FULLSCREEN_LABEL = "View Fullscreen";
const EXIT_FULLSCREEN_LABEL = "Exit Fullscreen";

export function buildFullScreenButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.id = "mark-fullscreen";
  button.type = "button";
  button.setAttribute("aria-label", ENTER_FULLSCREEN_LABEL);

  button.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {
        console.log("rejected fullscreen");
      });
    }
  });

  // on `ESC` exit fullscreen
  document.addEventListener("fullscreenchange", () => {
    const active = Boolean(document.fullscreenElement);
    button.classList.toggle("is-active", active);
    button.setAttribute(
      "aria-label",
      active ? EXIT_FULLSCREEN_LABEL : ENTER_FULLSCREEN_LABEL,
    );
  });

  button.innerHTML = `
   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-enter" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-exit" aria-hidden="true"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
`;

//   button.innerHTML=`<svg class="icon-enter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
//       <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>
//     </svg>
//     <svg class="icon-exit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
//       <path d="M3 8h3a2 2 0 0 0 2-2V3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M21 16h-3a2 2 0 0 0-2 2v3"/>
//     </svg>`

  return button;
}
