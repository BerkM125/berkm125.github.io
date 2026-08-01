import "./style.css";
import { CONTENT, type NoteContent } from "./content";

interface Page {
  id: string;
  label: string;
  children?: Page[];
}

interface FontOption {
  id: string;
  label: string;
  body: string;
  title: string;
}

interface Palette {
  id: string;
  label: string;
  accent: string;
  accentDark: string;
}

const NOTEBOOK = "Berkan @ UW";

const PAGES: Page[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work Experience" },
  {
    id: "research",
    label: "Selected Research",
    children: [
      { id: "ml-phenotyping", label: "Machine Learning for Phenotyping" },
    ],
  },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
];

const FONTS: FontOption[] = [
  {
    id: "segoe",
    label: "Segoe UI",
    body: `"Segoe UI", system-ui, -apple-system, sans-serif`,
    title: `"Calibri Light", "Segoe UI Light", "Segoe UI", sans-serif`,
  },
  {
    id: "serif",
    label: "Georgia",
    body: `Georgia, "Times New Roman", serif`,
    title: `Georgia, "Times New Roman", serif`,
  },
  {
    id: "mono",
    label: "Consolas",
    body: `Consolas, "Cascadia Mono", monospace`,
    title: `Consolas, "Cascadia Mono", monospace`,
  },
  {
    id: "rounded",
    label: "Comic Sans",
    body: `"Comic Sans MS", "Segoe UI", sans-serif`,
    title: `"Comic Sans MS", "Segoe UI", sans-serif`,
  },
];

const PALETTES: Palette[] = [
  {
    id: "onenote",
    label: "OneNote Purple",
    accent: "#7719aa",
    accentDark: "#5c1387",
  },
  {
    id: "ocean",
    label: "Ocean Blue",
    accent: "#0078d4",
    accentDark: "#005a9e",
  },
  {
    id: "forest",
    label: "Forest Green",
    accent: "#107c41",
    accentDark: "#0b5a2f",
  },
  {
    id: "crimson",
    label: "Crimson Red",
    accent: "#d13438",
    accentDark: "#a4262c",
  },
  { id: "rose", label: "Rose Pink", accent: "#e3008c", accentDark: "#b4006f" },
  {
    id: "graphite",
    label: "Graphite",
    accent: "#515c6b",
    accentDark: "#3b4350",
  },
];

/** id -> page, plus id -> parent id for subpages */
const pagesById = new Map<string, Page>();
const parentOf = new Map<string, string>();
for (const p of PAGES) {
  pagesById.set(p.id, p);
  for (const c of p.children ?? []) {
    pagesById.set(c.id, c);
    parentOf.set(c.id, p.id);
  }
}

const app = document.querySelector<HTMLDivElement>("#app")!;

/**
 * Microsoft's own OneNote mark (Office 2013–2019 artwork, via Wikimedia
 * Commons): the notebook body with the cut-out "N", ruled page edge, and the
 * three section tabs. One silhouette path, so it recolors cleanly.
 */
const ONENOTE_PATH =
  "M 74.25,230.65433 6,218.51636 6.0025591,127.50818 6.0051182,36.5 73.752559,24.572764 C 111.01365,18.012785 142.2875,12.447801 143.25,12.206133 144.84145,11.806546 145,12.819188 145,23.383369 L 145,35 l 38.95295,0 c 26.41798,0 39.73709,0.357283 41.38973,1.110272 C 228.26779,37.443045 230,40.901226 230,45.408164 l 0,3.314059 5.87286,0.532532 c 6.90889,0.626476 10.36022,2.609303 12.54099,7.204935 2.33623,4.923255 2.31452,40.203135 -0.0278,45.13918 -1.48526,3.12994 -1.48526,3.67232 0,6.80226 2.23209,4.70379 2.36595,40.63365 0.16708,44.84887 -1.24605,2.38867 -1.24605,3.11133 0,5.5 2.17844,4.17606 2.06659,40.14175 -0.13929,44.79031 -2.16864,4.57006 -5.62704,6.578 -12.38521,7.19081 -5.34884,0.48502 -5.79205,0.72571 -6.88087,3.73678 -0.64008,1.7701 -2.30635,3.73895 -3.70283,4.37523 C 223.66155,219.6557 211.31302,220 183.95295,220 L 145,220 l 0,11.5 c 0,8.58872 -0.31644,11.47371 -1.25,11.39615 -0.6875,-0.0571 -31.9625,-5.56593 -69.5,-12.24182 z M 222,156.5 l 0,-55.5 8.17126,0 C 242.36063,101 242,101.66543 242,79.173753 242,56.354497 242.33929,57 230.34501,57 L 222,57 l 0,-7 0,-7 -38.5,0 -38.5,0 0,8.5 0,8.5 30,0 30,0 0,5 0,5 -30,0 -30,0 0,7.5 0,7.5 30,0 30,0 0,5 0,5 -30,0 -30,0 0,7.5 0,7.5 30,0 30,0 0,5 0,5 -30,0 -30,0 0,7.5 0,7.5 30,0 30,0 0,5 0,5 -30,0 -30,0 0,7.5 0,7.5 30,0 30,0 0,5 0,5 -30,0 -30,0 0,8.5 0,8.5 38.5,0 38.5,0 z m 18.17126,44.84501 C 241.81748,199.8552 242,197.84202 242,181.17375 242,159.78055 241.73053,159 234.34501,159 L 230,159 l 0,22 0,22 4.17126,0 c 2.47808,0 4.91357,-0.67179 6,-1.65499 z M 100,127.36408 100,85.728152 86.032144,87 85.766072,114.02207 85.5,141.04414 72,115.01359 58.5,88.98303 43.5,89.5 l 0,38 0,38 12.5,0.59543 0.0064,-26.79771 L 56.0128,112.5 70.376074,140 84.739349,167.5 100,169 z m 140.17126,23.98093 C 241.81748,149.8552 242,147.84202 242,131.17375 242,109.78055 241.73053,109 234.34501,109 L 230,109 l 0,22 0,22 4.17126,0 c 2.47808,0 4.91357,-0.67179 6,-1.65499 z";

/** `mono` renders it flat white, for use against the colored title bar. */
function oneNoteLogo(mono = false): string {
  return `<svg class="onenote-logo" viewBox="0 0 256 256" aria-hidden="true">
    <path fill="${mono ? "#fff" : "#7719aa"}" d="${ONENOTE_PATH}"/>
  </svg>`;
}

/** Windows 11 logo: four flush square panes, official #0078d4. */
const WINDOWS_LOGO = `<svg class="win-logo" viewBox="0 0 48.75 48.75" aria-hidden="true">
  <g fill="#0078d4">
    <rect x="0" y="0" width="23.105" height="23.105"/>
    <rect x="25.645" y="0" width="23.105" height="23.105"/>
    <rect x="0" y="25.645" width="23.105" height="23.105"/>
    <rect x="25.645" y="25.645" width="23.105" height="23.105"/>
  </g>
</svg>`;

/** Microsoft Fluent UI "bin recycle" icon (MIT-licensed icon set). */
const RECYCLE_BIN = `<svg class="bin-icon" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M3.80337 5.59931C3.59559 3.67733 5.10137 2 7.03455 2H16.9649C18.8981 2 20.4038 3.67733 20.196 5.59932L18.6401 19.9918C18.5166 21.1342 17.5522 22 16.4031 22H7.59629C6.44725 22 5.48282 21.1342 5.35932 19.9918L3.80337 5.59931ZM5.30226 4.99743H18.6972C18.576 4.15965 17.8545 3.5 16.9649 3.5H7.03455C6.14494 3.5 5.42342 4.15965 5.30226 4.99743ZM11.7926 10.4094C11.8916 10.2614 12.1092 10.2614 12.2082 10.4094L12.8771 11.4092C13.1074 11.7535 13.5732 11.8459 13.9175 11.6155C14.2617 11.3852 14.3541 10.9194 14.1238 10.5751L13.455 9.57537C12.7619 8.53945 11.2389 8.53945 10.5459 9.57537L9.87706 10.5751C9.64674 10.9194 9.73912 11.3852 10.0834 11.6155C10.4277 11.8459 10.8935 11.7535 11.1238 11.4092L11.7926 10.4094ZM9.89355 13.628C10.1067 13.2729 9.99149 12.8122 9.6363 12.5991C9.28112 12.3859 8.82042 12.5011 8.60731 12.8563L8.24318 13.4632C7.44335 14.7962 8.40358 16.4922 9.95817 16.4922H10.7504C11.1646 16.4922 11.5004 16.1564 11.5004 15.7422C11.5004 15.328 11.1646 14.9922 10.7504 14.9922H9.95817C9.56952 14.9922 9.32946 14.5682 9.52942 14.2349L9.89355 13.628ZM14.3673 12.5988C14.012 12.8117 13.8965 13.2723 14.1094 13.6276L14.4734 14.2352C14.673 14.5685 14.433 14.9922 14.0445 14.9922H13.2504C12.8362 14.9922 12.5004 15.328 12.5004 15.7422C12.5004 16.1564 12.8362 16.4922 13.2504 16.4922H14.0445C15.5984 16.4922 16.5588 14.7974 15.7602 13.4644L15.3962 12.8567C15.1833 12.5014 14.7227 12.3859 14.3673 12.5988Z"/>
</svg>`;

function esc(s: string): string {
  return s.replace(/"/g, "&quot;");
}

function renderPageList(): string {
  return PAGES.map((p) => {
    const sublist = p.children
      ? `<ul class="subpage-list" data-parent="${p.id}">
          ${p.children
            .map(
              (c) =>
                `<li class="page-item subpage" data-page="${c.id}">${c.label}</li>`,
            )
            .join("")}
        </ul>`
      : "";
    return `<li class="page-group">
      <div class="page-item" data-page="${p.id}">${p.label}</div>
      ${sublist}
    </li>`;
  }).join("");
}

app.innerHTML = `
  <div class="desktop">
    <div class="desktop-icons">
      <div class="desktop-icon">
        <span class="desktop-icon-img">${RECYCLE_BIN}</span>
        <span class="desktop-icon-label">Recycle Bin</span>
      </div>
    </div>

    <div class="window" id="onenote-window">
      <div class="resize-handle" data-resize="n"></div>
      <div class="resize-handle" data-resize="s"></div>
      <div class="resize-handle" data-resize="e"></div>
      <div class="resize-handle" data-resize="w"></div>
      <div class="resize-handle" data-resize="ne"></div>
      <div class="resize-handle" data-resize="nw"></div>
      <div class="resize-handle" data-resize="se"></div>
      <div class="resize-handle" data-resize="sw"></div>

      <header class="titlebar">
        <div class="titlebar-left">
          <button class="menu-btn" aria-label="Show pages">
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M1 3h14M1 8h14M1 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>
          <span class="app-icon">${oneNoteLogo(true)}</span>
          <span class="titlebar-text">${NOTEBOOK} - OneNote</span>
        </div>
        <div class="titlebar-controls">
          <span class="control" data-action="minimize" title="Minimize">&#x2015;</span>
          <span class="control" data-action="maximize" title="Maximize"></span>
          <span class="control control-close" data-action="close" title="Close">&#x2715;</span>
        </div>
      </header>

      <nav class="ribbon">
        <span class="ribbon-tab">Home</span>
      </nav>

      <div class="ribbon-panel collapsed">
        <div class="ribbon-group">
          <div class="ribbon-group-content">
            <div class="font-select">
              <button class="font-combo" title="Font">
                <span class="font-combo-label">Segoe UI</span>
                <span class="font-combo-chevron">&#x25BE;</span>
              </button>
              <div class="font-menu">
                ${FONTS.map(
                  (f) =>
                    `<button class="font-menu-item" data-font="${f.id}" style="font-family:${esc(f.body)}">
                      <span class="font-menu-check">&#x2713;</span>${f.label}
                    </button>`,
                ).join("")}
              </div>
            </div>
          </div>
          <div class="ribbon-group-label">Font</div>
        </div>

        <div class="ribbon-sep"></div>

        <div class="ribbon-group">
          <div class="ribbon-group-content">
            <div class="color-swatches">
              ${PALETTES.map(
                (p) =>
                  `<button class="color-swatch" data-palette="${p.id}" title="${p.label}" style="background:${p.accent}"></button>`,
              ).join("")}
            </div>
          </div>
          <div class="ribbon-group-label">Colors</div>
        </div>
      </div>

      <div class="workspace">
        <aside class="sidebar">
          <div class="notebook-header">
            <span class="notebook-chevron">&#x25BE;</span>
            <span class="notebook-name">${NOTEBOOK}</span>
          </div>
          <ul class="page-list">
            ${renderPageList()}
          </ul>
          <button class="add-page">&#xFF0B;&nbsp; Add page</button>
        </aside>

        <div class="nav-scrim"></div>

        <main class="canvas">
          <div class="note">
            <input class="note-title" spellcheck="false" readonly />
            <div class="note-date"></div>
            <div class="note-body" contenteditable="true" spellcheck="false"></div>
          </div>
        </main>
      </div>
    </div>

    <footer class="taskbar">
      <div class="taskbar-center">
        <button class="task-icon start-btn" title="Start">
          ${WINDOWS_LOGO}
        </button>
        <button class="task-icon onenote-task" title="OneNote">
          <span class="onenote-task-icon">${oneNoteLogo()}</span>
          <span class="task-indicator"></span>
        </button>
        <button class="task-icon theme-btn" title="Toggle light / dark mode">
          <span class="theme-icon">&#x263D;</span>
        </button>
      </div>
      <div class="taskbar-right">
        <div class="tray-clock">
          <div class="tray-time"></div>
          <div class="tray-date"></div>
        </div>
      </div>
    </footer>
  </div>
`;

/* ---------- Theme: fonts, palettes, dark mode ---------- */

const rootEl = document.documentElement;
// v3 key so the Segoe UI default applies even if an older choice was stored
let currentFont = localStorage.getItem("font-v3") ?? "segoe";
let currentPalette = localStorage.getItem("palette") ?? "onenote";
let darkMode = localStorage.getItem("theme") === "dark";

const fontComboLabel = app.querySelector<HTMLSpanElement>(".font-combo-label")!;

function syncRibbonUI(): void {
  const font = FONTS.find((f) => f.id === currentFont) ?? FONTS[0];
  fontComboLabel.textContent = font.label;
  fontComboLabel.style.fontFamily = font.body;
  app
    .querySelectorAll<HTMLButtonElement>(".font-menu-item")
    .forEach((b) =>
      b.classList.toggle("selected", b.dataset.font === currentFont),
    );
  app
    .querySelectorAll<HTMLButtonElement>(".color-swatch")
    .forEach((b) =>
      b.classList.toggle("selected", b.dataset.palette === currentPalette),
    );
}

function applyFont(id: string): void {
  const font = FONTS.find((f) => f.id === id) ?? FONTS[0];
  currentFont = font.id;
  rootEl.style.setProperty("--font-ui", font.body);
  rootEl.style.setProperty("--font-title", font.title);
  localStorage.setItem("font-v3", font.id);
  syncRibbonUI();
}

function applyPalette(id: string): void {
  const palette = PALETTES.find((p) => p.id === id) ?? PALETTES[0];
  currentPalette = palette.id;
  rootEl.style.setProperty("--accent", palette.accent);
  rootEl.style.setProperty("--accent-dark", palette.accentDark);
  localStorage.setItem("palette", palette.id);
  syncRibbonUI();
}

function applyTheme(dark: boolean): void {
  darkMode = dark;
  rootEl.classList.toggle("dark", dark);
  const icon = app.querySelector<HTMLSpanElement>(".theme-icon")!;
  icon.innerHTML = dark ? "&#x2600;" : "&#x263D;";
  localStorage.setItem("theme", dark ? "dark" : "light");
}

/* ---------- Ribbon interactions ---------- */

const ribbonTab = app.querySelector<HTMLElement>(".ribbon-tab")!;
const ribbonPanel = app.querySelector<HTMLDivElement>(".ribbon-panel")!;
const fontSelect = app.querySelector<HTMLDivElement>(".font-select")!;
const fontComboBtn = app.querySelector<HTMLButtonElement>(".font-combo")!;

ribbonTab.addEventListener("click", () => {
  const collapsed = ribbonPanel.classList.toggle("collapsed");
  ribbonTab.classList.toggle("active", !collapsed);
  fontSelect.classList.remove("open");
});

fontComboBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fontSelect.classList.toggle("open");
});

app.querySelectorAll<HTMLButtonElement>(".font-menu-item").forEach((btn) =>
  btn.addEventListener("click", () => {
    applyFont(btn.dataset.font!);
    fontSelect.classList.remove("open");
  }),
);

app
  .querySelectorAll<HTMLButtonElement>(".color-swatch")
  .forEach((btn) =>
    btn.addEventListener("click", () => applyPalette(btn.dataset.palette!)),
  );

document.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest(".font-select")) {
    fontSelect.classList.remove("open");
  }
});

/* ---------- OneNote pages ---------- */

const titlebarText = app.querySelector<HTMLSpanElement>(".titlebar-text")!;
const titleInput = app.querySelector<HTMLInputElement>(".note-title")!;
const noteDate = app.querySelector<HTMLDivElement>(".note-date")!;
const noteBody = app.querySelector<HTMLDivElement>(".note-body")!;
const items = app.querySelectorAll<HTMLElement>(".page-item");
const sublists = app.querySelectorAll<HTMLUListElement>(".subpage-list");

function formatNow(): string {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} ${time}`;
}

/* ---------- Typewriter + soft key clacks ---------- */

let audioCtx: AudioContext | null = null;
let audioPrimed = false;

/** Browsers block audio until a gesture, so this is called from the first one. */
function unlockAudio(): void {
  if (!audioCtx) {
    const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
    if (Ctor) audioCtx = new Ctor();
  }
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") void audioCtx.resume();
    // iOS/Safari only truly unlock once a buffer has been started *inside* the
    // gesture, so kick off a single silent one-frame source the first time.
    if (!audioPrimed) {
      const src = audioCtx.createBufferSource();
      src.buffer = audioCtx.createBuffer(1, 1, audioCtx.sampleRate);
      src.connect(audioCtx.destination);
      src.start(0);
      audioPrimed = true;
    }
  } catch {
    /* audio is a nicety — never let it break the page */
  }
}

addEventListener("pointerdown", unlockAudio);
addEventListener("touchstart", unlockAudio, { passive: true });
addEventListener("keydown", unlockAudio);

/**
 * One keystroke: a short noise burst run through a lowpass, so it reads as a
 * muted, dampened board rather than a sharp click. Deliberately very quiet.
 */
function playKeyClack(char: string): void {
  const ctx = audioCtx;
  if (!ctx || ctx.state !== "running") return;

  try {
    const dur = 0.032;
    const frames = Math.max(1, Math.ceil(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      // Sharp attack, fast decay
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / frames, 4);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1200 + Math.random() * 500;
    lowpass.Q.value = 0.6;

    const gain = ctx.createGain();
    // Spacebar reads a touch deeper and louder, like a real board
    const peak = char === " " ? 0.2 : 0.128 + Math.random() * 0.048;
    gain.gain.setValueAtTime(peak, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

    src.connect(lowpass).connect(gain).connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + dur);
  } catch {
    /* a failed clack must never stop the typing */
  }
}

// Bumped on every navigation so a stale run can't keep typing into a new page
let typeRun = 0;
/** Detaches the "waiting for a gesture" listeners when we leave the page. */
let cancelTyping: (() => void) | null = null;

function runTypewriter(): void {
  // Invalidate any run in flight and drop its listeners, so neither the
  // animation nor the key clacks can fire once another page is open.
  const run = ++typeRun;
  cancelTyping?.();
  cancelTyping = null;

  const el = noteBody.querySelector<HTMLElement>(".typed");
  if (!el) return; // only the About page has one
  const text = el.dataset.text ?? "";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = text;
    return;
  }

  // Idle: a messaging-app typing indicator, held until the visitor clicks.
  // Waiting for that gesture also lets the audio context start.
  el.classList.remove("typing");
  el.classList.add("waiting");
  const touch = matchMedia("(pointer: coarse)").matches;
  el.innerHTML =
    `<span class="dots"><i></i><i></i><i></i></span>` +
    `<span class="type-hint">(${touch ? "tap anywhere" : "type anything"})</span>`;

  const begin = () => {
    removeEventListener("pointerdown", begin);
    removeEventListener("touchstart", begin);
    removeEventListener("keydown", begin);
    cancelTyping = null;
    if (run !== typeRun) return; // navigated away before clicking

    unlockAudio();
    el.classList.remove("waiting");
    el.classList.add("typing");
    el.textContent = "";

    let i = 0;
    const step = () => {
      if (run !== typeRun) return;
      if (i >= text.length) {
        el.classList.remove("typing"); // cursor goes away once it's done
        return;
      }
      const char = text[i];
      el.textContent += char;
      playKeyClack(char);
      i++;
      // Slight jitter, with a longer beat after punctuation
      const base = char === " " ? 70 : 52;
      const pause = /[,.@]/.test(char) ? 180 : 0;
      setTimeout(step, base + pause + Math.random() * 45);
    };

    // Wait for the context to actually reach "running" before the first
    // keystroke, otherwise early clacks get dropped silently on mobile.
    // Nothing here may prevent the typing from starting: older WebKit returns
    // undefined from resume() instead of a promise, and it can also never
    // settle, so this is guarded and backed by a timeout.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setTimeout(step, 200);
    };

    try {
      const resuming =
        audioCtx && audioCtx.state !== "running" ? audioCtx.resume() : null;
      if (resuming && typeof resuming.then === "function") {
        resuming.then(start, start);
        setTimeout(start, 350); // safety net
      } else {
        start();
      }
    } catch {
      start();
    }
  };

  addEventListener("pointerdown", begin);
  addEventListener("touchstart", begin, { passive: true });
  addEventListener("keydown", begin);
  cancelTyping = () => {
    removeEventListener("pointerdown", begin);
    removeEventListener("touchstart", begin);
    removeEventListener("keydown", begin);
  };
}

/** Photo column first, prose beside it — images lead, text supports. */
function renderNote(content: NoteContent): string {
  let media = content.aside ?? "";
  if (!media && content.images?.length) {
    media = content.images
      .map(
        (img) => `<figure class="shot">
          <img src="${img.src}" alt="${img.caption}" loading="lazy" />
          <figcaption>${img.caption}</figcaption>
        </figure>`,
      )
      .join("");
  }
  if (content.mediaFooter) media += content.mediaFooter;
  if (!media) return `<div class="note-text">${content.text}</div>`;
  return `<div class="note-split">
    <aside class="note-media">${media}</aside>
    <div class="note-text">${content.text}</div>
  </div>`;
}

function openPage(id: string): void {
  const page = pagesById.get(id) ?? PAGES[0];
  const parentId = parentOf.get(page.id);

  items.forEach((el) =>
    el.classList.toggle("active", el.dataset.page === page.id),
  );
  // Expand a sublist only while its section (or one of its subpages) is open
  sublists.forEach((ul) =>
    ul.classList.toggle(
      "expanded",
      ul.dataset.parent === page.id || ul.dataset.parent === parentId,
    ),
  );

  titleInput.value = page.label;
  noteDate.textContent = formatNow();

  const content = CONTENT[page.id];
  noteBody.innerHTML = content ? renderNote(content) : "";
  // Pages with written content are read-only; blank pages stay scratch-editable.
  noteBody.contentEditable = content ? "false" : "true";
  noteBody.classList.toggle("has-content", Boolean(content));
  // Photos that haven't been dropped into /public/images yet show a labeled placeholder
  noteBody.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    img.addEventListener("error", () =>
      img
        .closest(".shot, .headshot, .logo-cell, .logo-slot")
        ?.classList.add("missing"),
    );
  });

  titlebarText.textContent = `${page.label} - OneNote`;
  document.title = `${page.label} - ${NOTEBOOK} - OneNote`;
  history.replaceState(null, "", `#${page.id}`);

  runTypewriter();
}

items.forEach((el) =>
  el.addEventListener("click", () => {
    openPage(el.dataset.page!);
    setNavOpen(false); // dismiss the drawer after picking a page
  }),
);

// In-note links that jump to another page instead of leaving the site
noteBody.addEventListener("click", (e) => {
  const link = (e.target as HTMLElement).closest<HTMLElement>("[data-goto]");
  if (!link) return;
  e.preventDefault();
  openPage(link.dataset.goto!);
});

addEventListener("hashchange", () =>
  openPage(location.hash.slice(1) || "about"),
);

applyFont(currentFont);
applyPalette(currentPalette);
applyTheme(darkMode);
openPage(location.hash.slice(1) || "about");

/* ---------- Window: drag + controls ---------- */

const win = app.querySelector<HTMLDivElement>("#onenote-window")!;
const titlebar = win.querySelector<HTMLElement>(".titlebar")!;
const taskBtn = app.querySelector<HTMLButtonElement>(".onenote-task")!;
const themeBtn = app.querySelector<HTMLButtonElement>(".theme-btn")!;
const maxBtn = win.querySelector<HTMLElement>('[data-action="maximize"]')!;

const MAXIMIZE_ICON = `<svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
  <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/>
</svg>`;
const RESTORE_ICON = `<svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
  <path d="M2.5 2.5 V0.5 H9.5 V7.5 H7.5" fill="none" stroke="currentColor" stroke-width="1"/>
  <rect x="0.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/>
</svg>`;
maxBtn.innerHTML = MAXIMIZE_ICON;

/** Phone-sized layout: the window fills the screen and the sidebar is a drawer. */
const isCompact = () => matchMedia("(max-width: 760px)").matches;

function centerWindow(): void {
  if (isCompact()) return; // CSS pins it full-screen instead
  const rect = win.getBoundingClientRect();
  win.style.left = `${Math.max(0, (innerWidth - rect.width) / 2)}px`;
  win.style.top = `${Math.max(0, (innerHeight - 48 - rect.height) / 2)}px`;
}
centerWindow();

/* ---------- Compact nav drawer ---------- */

const workspace = app.querySelector<HTMLDivElement>(".workspace")!;
const menuBtn = app.querySelector<HTMLButtonElement>(".menu-btn")!;
const navScrim = app.querySelector<HTMLDivElement>(".nav-scrim")!;

function setNavOpen(open: boolean): void {
  workspace.classList.toggle("nav-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setNavOpen(!workspace.classList.contains("nav-open"));
});
navScrim.addEventListener("click", () => setNavOpen(false));

// Re-center when coming back to a desktop-sized viewport
addEventListener("resize", () => {
  if (isCompact()) {
    win.style.left = "";
    win.style.top = "";
    win.style.width = "";
    win.style.height = "";
  } else {
    setNavOpen(false);
    if (!win.style.left) centerWindow();
  }
});

let dragOffsetX = 0;
let dragOffsetY = 0;
let dragging = false;

titlebar.addEventListener("pointerdown", (e: PointerEvent) => {
  if ((e.target as HTMLElement).closest(".control, .menu-btn")) return;
  if (win.classList.contains("maximized") || isCompact()) return;
  dragging = true;
  const rect = win.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  titlebar.setPointerCapture(e.pointerId);
  win.classList.add("dragging");
});

titlebar.addEventListener("pointermove", (e: PointerEvent) => {
  if (!dragging) return;
  const maxX = innerWidth - 120;
  const maxY = innerHeight - 48 - 34;
  const x = Math.min(
    Math.max(e.clientX - dragOffsetX, 120 - win.offsetWidth),
    maxX,
  );
  const y = Math.min(Math.max(e.clientY - dragOffsetY, 0), maxY);
  win.style.left = `${x}px`;
  win.style.top = `${y}px`;
});

titlebar.addEventListener("pointerup", (e: PointerEvent) => {
  dragging = false;
  win.classList.remove("dragging");
  titlebar.releasePointerCapture(e.pointerId);
});

titlebar.addEventListener("dblclick", (e) => {
  if ((e.target as HTMLElement).closest(".control")) return;
  toggleMaximize();
});

function toggleMaximize(): void {
  const maximized = win.classList.toggle("maximized");
  maxBtn.innerHTML = maximized ? RESTORE_ICON : MAXIMIZE_ICON;
  maxBtn.title = maximized ? "Restore Down" : "Maximize";
}

/* Edge + corner resizing */

const MIN_W = 620;
const MIN_H = 420;

win.querySelectorAll<HTMLElement>(".resize-handle").forEach((handle) => {
  handle.addEventListener("pointerdown", (e: PointerEvent) => {
    if (win.classList.contains("maximized") || isCompact()) return;
    e.preventDefault();
    e.stopPropagation();

    const dir = handle.dataset.resize!;
    const start = win.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const maxBottom = innerHeight - 48;
    handle.setPointerCapture(e.pointerId);
    win.classList.add("dragging");

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let { left, top, width, height } = {
        left: start.left,
        top: start.top,
        width: start.width,
        height: start.height,
      };

      if (dir.includes("e"))
        width = Math.min(start.width + dx, innerWidth - start.left);
      if (dir.includes("s"))
        height = Math.min(start.height + dy, maxBottom - start.top);
      if (dir.includes("w")) {
        width = start.width - dx;
        left = start.left + dx;
        if (left < 0) {
          width += left;
          left = 0;
        }
      }
      if (dir.includes("n")) {
        height = start.height - dy;
        top = start.top + dy;
        if (top < 0) {
          height += top;
          top = 0;
        }
      }

      // Clamp to minimums without letting the anchored edge drift
      if (width < MIN_W) {
        if (dir.includes("w")) left = start.left + start.width - MIN_W;
        width = MIN_W;
      }
      if (height < MIN_H) {
        if (dir.includes("n")) top = start.top + start.height - MIN_H;
        height = MIN_H;
      }

      win.style.left = `${left}px`;
      win.style.top = `${top}px`;
      win.style.width = `${width}px`;
      win.style.height = `${height}px`;
    };

    const onUp = (ev: PointerEvent) => {
      handle.releasePointerCapture(ev.pointerId);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      win.classList.remove("dragging");
    };

    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
  });
});

function setWindowOpen(open: boolean): void {
  win.classList.toggle("hidden", !open);
  taskBtn.classList.toggle("open", open);
}

win.querySelectorAll<HTMLElement>(".control").forEach((btn) =>
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (action === "minimize" || action === "close") setWindowOpen(false);
    else if (action === "maximize") toggleMaximize();
  }),
);

taskBtn.addEventListener("click", () =>
  setWindowOpen(win.classList.contains("hidden")),
);
themeBtn.addEventListener("click", () => applyTheme(!darkMode));
setWindowOpen(true);

/* ---------- Taskbar clock ---------- */

const trayTime = app.querySelector<HTMLDivElement>(".tray-time")!;
const trayDate = app.querySelector<HTMLDivElement>(".tray-date")!;

function tickClock(): void {
  const now = new Date();
  trayTime.textContent = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  trayDate.textContent = now.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}
tickClock();
setInterval(tickClock, 10_000);
