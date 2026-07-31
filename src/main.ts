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
 * OneNote mark: notebook body with the "N", plus the three page tabs down the
 * right edge. `mono` renders it flat white for use on a colored title bar.
 */
function oneNoteLogo(mono = false): string {
  const body = mono ? "#fff" : "#7719aa";
  const letter = mono ? "#7719aa" : "#fff";
  const tabs = mono
    ? ["#fff", "#fff", "#fff"]
    : ["#c063d8", "#a13cc4", "#8425b0"];
  const tabOpacity = mono ? "0.75" : "1";
  return `<svg class="onenote-logo" viewBox="0 0 32 32" aria-hidden="true">
    <rect x="1" y="3" width="23" height="26" rx="3" fill="${body}"/>
    <path d="M6 24V8h3.4l6.2 9.4V8H19v16h-3.4L9.4 14.6V24z" fill="${letter}"/>
    <rect x="22" y="7" width="9" height="4" rx="2" fill="${tabs[0]}" opacity="${tabOpacity}"/>
    <rect x="22" y="14" width="9" height="4" rx="2" fill="${tabs[1]}" opacity="${tabOpacity}"/>
    <rect x="22" y="21" width="9" height="4" rx="2" fill="${tabs[2]}" opacity="${tabOpacity}"/>
  </svg>`;
}

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
        <span class="desktop-icon-img">&#x1F5D1;</span>
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
          <span class="win-logo">
            <span></span><span></span><span></span><span></span>
          </span>
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
// v2 key so the new Consolas default applies even if an older choice was stored
let currentFont = localStorage.getItem("font-v2") ?? "mono";
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
  localStorage.setItem("font-v2", font.id);
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
