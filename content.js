(() => {
  if (window.__tabPrompterLoaded) {
    return;
  }

  window.__tabPrompterLoaded = true;

  const ROOT_ID = "ugtp-root";
  const ACTIVE_CLASS = "ugtp-active-page";
  const SEARCH_ACTIVE_CLASS = "ugtp-search-page";
  const APP_NAME = "TabPrompter";
  const SUPPORT_HANDLE = "@jerome-eno";
  const SUPPORT_URL = "https://account.venmo.com/u/jerome-eno";
  const SUPPORT_QR_PATH = "assets/venmo-qr.png";
  const PORTFOLIO_URL = "https://www.ateli3r.xyz/";
  const THEME_STORAGE_KEY = "tabprompter-theme-preference";
  const PALETTE_STORAGE_KEY = "tabprompter-palette-preference";
  const DEFAULT_INSTRUMENT_STORAGE_KEY = "tabprompter-default-instrument";
  const SEARCH_THEME_PARAM = "tp_theme";
  const SEARCH_PALETTE_PARAM = "tp_palette";
  const SEARCH_FORMAT_PARAM = "tp_format";
  const SONG_SELECTOR = "code > pre";
  const FLASH_HINT_DURATION = 2200;
  const DEFAULT_SEARCH_FORMAT = "chords";
  const DEFAULT_INSTRUMENT_OPTIONS = ["chords", "tabs", "ukulele", "bass", "drums"];
  const SEARCH_FORMATS = {
    all: { id: "all", label: "All", order: 0 },
    chords: { id: "chords", label: "Guitar Chords", order: 1 },
    tabs: { id: "tabs", label: "Tabs", order: 2 },
    ukulele: { id: "ukulele", label: "Ukulele", order: 3 },
    bass: { id: "bass", label: "Bass", order: 4 },
    drums: { id: "drums", label: "Drums", order: 5 }
  };
  const BLOCKED_SEARCH_TYPE_PATTERN = /\b(?:official|pro|vocal|video|power|musescore)\b/i;
  const PALETTE_LABELS = {
    terracotta: "Terracotta",
    monokai: "Citrus Night",
    catppuccin: "Soft Bloom",
    nord: "Blue Hush"
  };
  const ICONS = {
    info:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.7"/><path d="M10 8.1v5" stroke="currentColor" stroke-linecap="round" stroke-width="1.7"/><circle cx="10" cy="5.7" r="1" fill="currentColor"/></svg>',
    search:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="8.7" cy="8.7" r="4.9" stroke="currentColor" stroke-width="1.7"/><path d="m12.4 12.4 4.1 4.1" stroke="currentColor" stroke-linecap="round" stroke-width="1.7"/></svg>',
    palette:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="6" cy="6.5" r="2.1" fill="currentColor"/><circle cx="13.6" cy="6" r="2.1" fill="currentColor" opacity=".8"/><circle cx="10.3" cy="12.9" r="2.1" fill="currentColor" opacity=".55"/></svg>',
    system:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6.3" stroke="currentColor" stroke-width="1.7"/><path d="M10 3.7A6.3 6.3 0 0 1 10 16.3Z" fill="currentColor"/></svg>',
    light:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.6" fill="currentColor"/><path d="M10 2.6v2.1M10 15.3v2.1M2.6 10h2.1M15.3 10h2.1M4.8 4.8l1.5 1.5M13.7 13.7l1.5 1.5M15.2 4.8l-1.5 1.5M6.3 13.7l-1.5 1.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>',
    dark:
      '<svg viewBox="0 0 20 20" fill="none"><path d="M13.9 3.8a6.4 6.4 0 1 0 2.3 12.1A7.2 7.2 0 1 1 13.9 3.8Z" fill="currentColor"/></svg>',
    exit:
      '<svg viewBox="0 0 20 20" fill="none"><path d="m5.7 5.7 8.6 8.6M14.3 5.7 5.7 14.3" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/></svg>',
    shapes:
      '<svg viewBox="0 0 20 20" fill="none"><path d="M5 5.2h10.2M5 8.3h10.2M5 11.4h10.2M5 14.5h10.2M5 5.2v9.3M7.55 5.2v9.3M10.1 5.2v9.3M12.65 5.2v9.3M15.2 5.2v9.3" stroke="currentColor" stroke-linecap="round" stroke-width="1.1"/><circle cx="5" cy="14.5" r="1.4" fill="currentColor"/><circle cx="10.1" cy="11.4" r="1.4" fill="currentColor"/><circle cx="15.2" cy="14.5" r="1.4" fill="currentColor"/></svg>'
  };
  const SHARP_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const FLAT_NOTES = {
    "A#": "Bb",
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab"
  };
  const ENHARMONIC_NOTES = {
    Bb: "A#",
    Cb: "B",
    Db: "C#",
    Eb: "D#",
    Fb: "E",
    Gb: "F#",
    Ab: "G#",
    "B#": "C",
    "E#": "F"
  };
  const DIAGRAM_NOTE_ALIASES = {
    Db: "C#",
    Eb: "D#",
    Gb: "F#",
    Ab: "G#",
    Bb: "A#"
  };
  const EXACT_DIAGRAMS = {
    A: { frets: ["x", 0, 2, 2, 2, 0] },
    A7: { frets: ["x", 0, 2, 0, 2, 0] },
    Aadd9: { frets: ["x", 0, 2, 4, 2, 0] },
    Amaj7: { frets: ["x", 0, 2, 1, 2, 0] },
    Am: { frets: ["x", 0, 2, 2, 1, 0] },
    Am7: { frets: ["x", 0, 2, 0, 1, 0] },
    Asus2: { frets: ["x", 0, 2, 2, 0, 0] },
    Asus4: { frets: ["x", 0, 2, 2, 3, 0] },
    C: { frets: ["x", 3, 2, 0, 1, 0] },
    C7: { frets: ["x", 3, 2, 3, 1, 0] },
    Cadd9: { frets: ["x", 3, 2, 0, 3, 3] },
    Cmaj7: { frets: ["x", 3, 2, 0, 0, 0] },
    D: { frets: ["x", "x", 0, 2, 3, 2] },
    D7: { frets: ["x", "x", 0, 2, 1, 2] },
    Dadd9: { frets: ["x", "x", 0, 2, 3, 0] },
    Dm: { frets: ["x", "x", 0, 2, 3, 1] },
    Dm7: { frets: ["x", "x", 0, 2, 1, 1] },
    Dmaj7: { frets: ["x", "x", 0, 2, 2, 2] },
    Dsus2: { frets: ["x", "x", 0, 2, 3, 0] },
    Dsus4: { frets: ["x", "x", 0, 2, 3, 3] },
    E: { frets: [0, 2, 2, 1, 0, 0] },
    E7: { frets: [0, 2, 0, 1, 0, 0] },
    Eadd9: { frets: [0, 2, 4, 1, 0, 0] },
    Em: { frets: [0, 2, 2, 0, 0, 0] },
    Em7: { frets: [0, 2, 0, 0, 0, 0] },
    Emaj7: { frets: [0, 2, 1, 1, 0, 0] },
    Esus4: { frets: [0, 2, 2, 2, 0, 0] },
    F: { frets: [1, 3, 3, 2, 1, 1], barres: [{ fromString: 6, toString: 1, fret: 1 }] },
    G: { frets: [3, 2, 0, 0, 0, 3] },
    G7: { frets: [3, 2, 0, 0, 0, 1] },
    Gadd9: { frets: [3, 2, 0, 2, 0, 3] },
    Gmaj7: { frets: [3, 2, 0, 0, 0, 2] },
    Gsus4: { frets: [3, 2, 0, 0, 1, 3] }
  };
  const MOVABLE_DIAGRAMS = {
    major: {
      "A#": { template: "A-major", fret: 1 },
      B: { template: "A-major", fret: 2 },
      "C#": { template: "A-major", fret: 4 },
      "D#": { template: "A-major", fret: 6 },
      F: { template: "E-major", fret: 1 },
      "F#": { template: "E-major", fret: 2 },
      "G#": { template: "E-major", fret: 4 }
    },
    minor: {
      C: { template: "A-minor", fret: 3 },
      "C#": { template: "A-minor", fret: 4 },
      "D#": { template: "A-minor", fret: 6 },
      F: { template: "E-minor", fret: 1 },
      "F#": { template: "E-minor", fret: 2 },
      G: { template: "E-minor", fret: 3 },
      "G#": { template: "E-minor", fret: 4 },
      "A#": { template: "A-minor", fret: 1 },
      B: { template: "A-minor", fret: 2 }
    },
    dominant7: {
      "A#": { template: "A-7", fret: 1 },
      B: { template: "A-7", fret: 2 },
      "C#": { template: "A-7", fret: 4 },
      "D#": { template: "A-7", fret: 6 },
      F: { template: "E-7", fret: 1 },
      "F#": { template: "E-7", fret: 2 },
      "G#": { template: "E-7", fret: 4 }
    },
    maj7: {
      "A#": { template: "A-maj7", fret: 1 },
      B: { template: "A-maj7", fret: 2 },
      "C#": { template: "A-maj7", fret: 4 },
      "D#": { template: "A-maj7", fret: 6 },
      F: { template: "E-maj7", fret: 1 },
      "F#": { template: "E-maj7", fret: 2 },
      "G#": { template: "E-maj7", fret: 4 }
    },
    minor7: {
      C: { template: "A-m7", fret: 3 },
      "C#": { template: "A-m7", fret: 4 },
      "D#": { template: "A-m7", fret: 6 },
      F: { template: "E-m7", fret: 1 },
      "F#": { template: "E-m7", fret: 2 },
      G: { template: "E-m7", fret: 3 },
      "G#": { template: "E-m7", fret: 4 },
      "A#": { template: "A-m7", fret: 1 },
      B: { template: "A-m7", fret: 2 }
    },
    sus4: {
      "A#": { template: "A-sus4", fret: 1 },
      B: { template: "A-sus4", fret: 2 },
      "C#": { template: "A-sus4", fret: 4 },
      "D#": { template: "A-sus4", fret: 6 },
      F: { template: "E-sus4", fret: 1 },
      "F#": { template: "E-sus4", fret: 2 },
      "G#": { template: "E-sus4", fret: 4 }
    }
  };
  const SETTINGS = {
    minFontSize: 6,
    maxFontSize: 64,
    maxColumns: 7,
    horizontalPadding: 36,
    columnGap: 28,
    lineHeightRatio: 1.28,
    railGap: 16,
    topStageInset: 9
  };

  const state = {
    active: false,
    autoOpenedUrl: "",
    currentUrl: location.href,
    lastSignature: "",
    manualFontSize: null,
    showDiagrams: false,
    transposeSteps: 0,
    song: null,
    search: {
      allResults: [],
      dismissedUrl: "",
      format: readSearchFormatParam() || DEFAULT_SEARCH_FORMAT,
      availableFormats: getBaseSearchFormats(),
      isOpen: false,
      lastSignature: "",
      query: "",
      results: [],
      totalResults: 0
    },
    settings: {
      defaultInstrument: DEFAULT_SEARCH_FORMAT
    },
    info: {
      isOpen: false
    },
    palette: {
      value: "terracotta",
      isOpen: false
    },
    device: {
      unsupportedMobile: false
    },
    theme: {
      preference: "system",
      resolved: "light",
      mediaQuery: null
    },
    refreshTimer: 0,
    ui: {}
  };

  function init() {
    ensureUi();
    initDeviceSupport();
    initTheme();
    initSearchPreferences();
    bindEvents();
    observePage();
    refreshFromPage("init");
  }

  function ensureUi() {
    let root = document.getElementById(ROOT_ID);

    if (!root) {
      root = document.createElement("div");
      root.id = ROOT_ID;
      root.innerHTML = [
        '<div class="ugtp-device-note" hidden>TabPrompter is designed for desktop and tablet use only.</div>',
        '<button class="ugtp-search-launch" type="button" aria-label="Open filtered search">Search</button>',
        '<button class="ugtp-launch" type="button" aria-label="Open ' + APP_NAME + ' mode">' + APP_NAME + "</button>",
        '<div class="ugtp-search-scrim" hidden></div>',
        '<section class="ugtp-search-panel" hidden aria-label="Filtered search">',
        '  <div class="ugtp-search-head">',
        '    <div class="ugtp-search-kicker">Filtered UG Search</div>',
        '    <button class="ugtp-search-close" type="button" data-action="close-search" aria-label="Close filtered search">Close</button>',
        "  </div>",
        '  <form class="ugtp-search-form">',
        '    <input class="ugtp-search-input" type="search" autocomplete="off" spellcheck="false" placeholder="Song or artist" aria-label="Search for a song or artist" />',
        '    <button class="ugtp-search-submit" type="submit">Search UG</button>',
        "  </form>",
        '  <div class="ugtp-search-filters" role="group" aria-label="Result type filter"></div>',
        '  <div class="ugtp-search-status"></div>',
        '  <div class="ugtp-search-results" aria-live="polite"></div>',
        "</section>",
        '<div class="ugtp-info-scrim" hidden></div>',
        '<section class="ugtp-info-panel" hidden aria-label="' + APP_NAME + ' info and settings">',
        '  <div class="ugtp-info-head">',
        '    <div class="ugtp-info-brand">',
        '      <img class="ugtp-info-brand-icon" alt="' + APP_NAME + ' icon" />',
        '      <div>',
        '        <div class="ugtp-info-kicker">' + APP_NAME + "</div>",
        '        <div class="ugtp-info-title">Info &amp; Settings</div>',
        "      </div>",
        "    </div>",
        '    <button class="ugtp-info-close" type="button" data-action="close-info" aria-label="Close info and settings">Close</button>',
        "  </div>",
        '  <div class="ugtp-info-body">',
        '    <section class="ugtp-info-section ugtp-info-section-compact">',
        '      <div class="ugtp-info-section-title">Appearance Mode</div>',
        '      <div class="ugtp-theme-controls" role="group" aria-label="Appearance mode">',
        '        <button class="ugtp-theme-button" type="button" data-action="theme-system" data-theme-preference="system" aria-pressed="true">System</button>',
        '        <button class="ugtp-theme-button" type="button" data-action="theme-light" data-theme-preference="light" aria-pressed="false">Light</button>',
        '        <button class="ugtp-theme-button" type="button" data-action="theme-dark" data-theme-preference="dark" aria-pressed="false">Dark</button>',
        "      </div>",
        "    </section>",
        '    <section class="ugtp-info-section ugtp-info-section-compact">',
        '      <div class="ugtp-info-section-title">Default Instrument</div>',
        '      <div class="ugtp-default-format-controls" role="group" aria-label="Default instrument">',
        '        <button class="ugtp-default-format-button" type="button" data-action="default-format-chords" data-default-format="chords" aria-pressed="true">Guitar Chords</button>',
        '        <button class="ugtp-default-format-button" type="button" data-action="default-format-tabs" data-default-format="tabs" aria-pressed="false">Tabs</button>',
        '        <button class="ugtp-default-format-button" type="button" data-action="default-format-ukulele" data-default-format="ukulele" aria-pressed="false">Ukulele</button>',
        '        <button class="ugtp-default-format-button" type="button" data-action="default-format-bass" data-default-format="bass" aria-pressed="false">Bass</button>',
        '        <button class="ugtp-default-format-button" type="button" data-action="default-format-drums" data-default-format="drums" aria-pressed="false">Drums</button>',
        "      </div>",
        "    </section>",
        '    <section class="ugtp-info-section ugtp-info-section-compact">',
        '      <div class="ugtp-info-section-title">Color Theme</div>',
        '      <div class="ugtp-palette-controls" role="group" aria-label="Color theme">',
        '        <button class="ugtp-palette-button" type="button" data-action="palette-terracotta" data-palette="terracotta" aria-pressed="true"><span>Terracotta</span></button>',
        '        <button class="ugtp-palette-button" type="button" data-action="palette-monokai" data-palette="monokai" aria-pressed="false"><span>Citrus Night</span></button>',
        '        <button class="ugtp-palette-button" type="button" data-action="palette-catppuccin" data-palette="catppuccin" aria-pressed="false"><span>Soft Bloom</span></button>',
        '        <button class="ugtp-palette-button" type="button" data-action="palette-nord" data-palette="nord" aria-pressed="false"><span>Blue Hush</span></button>',
        "      </div>",
        "    </section>",
        '    <section class="ugtp-info-section ugtp-info-section-compact ugtp-info-section-keyboard">',
        '      <div class="ugtp-info-section-title">Keyboard</div>',
        '      <div class="ugtp-info-shortcuts">',
        '        <div class="ugtp-info-shortcut"><span>Toggle ' + APP_NAME + '</span><span>T</span></div>',
        '        <div class="ugtp-info-shortcut"><span>Open info and settings</span><span>I</span></div>',
        '        <div class="ugtp-info-shortcut"><span>Open filtered search</span><span>S</span></div>',
        '        <div class="ugtp-info-shortcut"><span>Transpose down or up</span><span>[ ]</span></div>',
        '        <div class="ugtp-info-shortcut"><span>Reset transpose</span><span>0</span></div>',
        '        <div class="ugtp-info-shortcut"><span>Adjust text size</span><span>+ -</span></div>',
        '        <div class="ugtp-info-shortcut"><span>Refit to screen</span><span>R</span></div>',
        '        <div class="ugtp-info-shortcut"><span>Close current panel</span><span>Esc</span></div>',
        "      </div>",
        "    </section>",
        '    <section class="ugtp-info-section ugtp-info-section-compact ugtp-info-section-support">',
        '      <div class="ugtp-info-section-title">Support</div>',
        '      <div class="ugtp-support-layout">',
        '        <div class="ugtp-support-copy">',
        '          <div class="ugtp-info-copy">TabPrompter was made with love by Jerome Eno at Atelier Trois Rivi&#232;res, a creative technology studio in Pittsburgh, PA. If TabPrompter saves you time, you can support future updates on Venmo.</div>',
        '          <div class="ugtp-support-links">',
        '          <a class="ugtp-info-link ugtp-info-link-secondary" href="' + PORTFOLIO_URL + '" target="_blank" rel="noreferrer noopener">ATELI3R: Portfolio</a>',
        "          </div>",
        "        </div>",
        '        <a class="ugtp-qr-link" href="' + SUPPORT_URL + '" target="_blank" rel="noreferrer noopener" aria-label="Open Venmo for ' + SUPPORT_HANDLE + '">',
        '          <div class="ugtp-qr-handle">@Jerome-Eno</div>',
        '          <img class="ugtp-qr-image" alt="Venmo QR code for @Jerome-Eno" />',
        "        </a>",
        "        </div>",
        "    </section>",
        "  </div>",
        "</section>",
        '<div class="ugtp-overlay" aria-hidden="true">',
        '  <div class="ugtp-label"></div>',
        '  <div class="ugtp-diagrams" hidden></div>',
        '  <div class="ugtp-stage">',
        '    <div class="ugtp-columns" aria-live="polite"></div>',
        "  </div>",
        '  <div class="ugtp-dock">',
        '    <div class="ugtp-dock-left">',
        createIconButtonMarkup("info", "Info & settings (I)", ICONS.info),
        createIconButtonMarkup("search", "Search songs (S)", ICONS.search),
        '      <div class="ugtp-dock-group ugtp-dock-theme-controls" role="group" aria-label="Appearance mode">',
        createIconButtonMarkup("theme-system", "Follow system appearance", ICONS.system, "ugtp-theme-button ugtp-theme-button-dock", "system"),
        createIconButtonMarkup("theme-light", "Use light appearance", ICONS.light, "ugtp-theme-button ugtp-theme-button-dock", "light"),
        createIconButtonMarkup("theme-dark", "Use dark appearance", ICONS.dark, "ugtp-theme-button ugtp-theme-button-dock", "dark"),
        "      </div>",
        '      <div class="ugtp-dock-group ugtp-dock-palette-wrap">',
        createIconButtonMarkup("toggle-palettes", "Color palettes", ICONS.palette, "ugtp-icon-button ugtp-palette-trigger"),
        '        <div class="ugtp-palette-popover" hidden>',
        '          <button class="ugtp-palette-button" type="button" data-action="palette-terracotta" data-palette="terracotta" aria-pressed="true"><span>Terracotta</span></button>',
        '          <button class="ugtp-palette-button" type="button" data-action="palette-monokai" data-palette="monokai" aria-pressed="false"><span>Citrus Night</span></button>',
        '          <button class="ugtp-palette-button" type="button" data-action="palette-catppuccin" data-palette="catppuccin" aria-pressed="false"><span>Soft Bloom</span></button>',
        '          <button class="ugtp-palette-button" type="button" data-action="palette-nord" data-palette="nord" aria-pressed="false"><span>Blue Hush</span></button>',
        "        </div>",
        "      </div>",
        createIconButtonMarkup("diagrams", "Toggle chord shapes", ICONS.shapes, "ugtp-icon-button ugtp-shapes-button", "false"),
        '      <button type="button" data-action="transpose-down" data-tooltip="Transpose down ([)" aria-label="Transpose chords down a semitone">Tr-</button>',
        '      <button class="ugtp-transpose-readout" type="button" data-action="transpose-reset" data-tooltip="Reset transposition (0)" aria-label="Reset extension transposition">',
        '      <span class="ugtp-transpose-value">0</span>',
        '      <span class="ugtp-transpose-reset-icon" aria-hidden="true">↺</span>',
        "      </button>",
        '      <button type="button" data-action="transpose-up" data-tooltip="Transpose up (])" aria-label="Transpose chords up a semitone">Tr+</button>',
        '      <button type="button" data-action="down" data-tooltip="Smaller text (-)" aria-label="Decrease text size">A-</button>',
        '      <button type="button" data-action="up" data-tooltip="Larger text (+)" aria-label="Increase text size">A+</button>',
        '      <button type="button" data-action="refit" data-tooltip="Refit layout (R)" aria-label="Refit song to screen">Refit</button>',
        "    </div>",
        '    <div class="ugtp-dock-right">',
        '      <div class="ugtp-status"></div>',
        createIconButtonMarkup("toggle", "Exit prompter (T or Esc)", ICONS.exit, "ugtp-icon-button ugtp-exit-button"),
        "    </div>",
        "  </div>",
        '  <div class="ugtp-hint" hidden></div>',
        "</div>",
        '<div class="ugtp-measure" aria-hidden="true"></div>'
      ].join("");
      document.documentElement.appendChild(root);
    }

    state.ui.root = root;
    state.ui.deviceNote = root.querySelector(".ugtp-device-note");
    state.ui.searchLaunch = root.querySelector(".ugtp-search-launch");
    state.ui.searchScrim = root.querySelector(".ugtp-search-scrim");
    state.ui.searchPanel = root.querySelector(".ugtp-search-panel");
    state.ui.searchForm = root.querySelector(".ugtp-search-form");
    state.ui.searchInput = root.querySelector(".ugtp-search-input");
    state.ui.searchFilters = root.querySelector(".ugtp-search-filters");
    state.ui.searchStatus = root.querySelector(".ugtp-search-status");
    state.ui.searchResults = root.querySelector(".ugtp-search-results");
    state.ui.infoScrim = root.querySelector(".ugtp-info-scrim");
    state.ui.infoPanel = root.querySelector(".ugtp-info-panel");
    state.ui.infoClose = root.querySelector(".ugtp-info-close");
    state.ui.infoBrandIcon = root.querySelector(".ugtp-info-brand-icon");
    state.ui.infoFields = {
      key: root.querySelector('[data-info-field="key"]'),
      size: root.querySelector('[data-info-field="size"]'),
      columns: root.querySelector('[data-info-field="columns"]'),
      shapes: root.querySelector('[data-info-field="shapes"]'),
      appearance: root.querySelector('[data-info-field="appearance"]'),
      palette: root.querySelector('[data-info-field="palette"]'),
      defaultInstrument: root.querySelector('[data-info-field="default-instrument"]')
    };
    state.ui.themeButtons = Array.from(root.querySelectorAll(".ugtp-theme-button"));
    state.ui.paletteButtons = Array.from(root.querySelectorAll(".ugtp-palette-button"));
    state.ui.defaultFormatButtons = Array.from(root.querySelectorAll(".ugtp-default-format-button"));
    state.ui.palettePopover = root.querySelector(".ugtp-palette-popover");
    state.ui.qrImage = root.querySelector(".ugtp-qr-image");
    state.ui.launch = root.querySelector(".ugtp-launch");
    state.ui.overlay = root.querySelector(".ugtp-overlay");
    state.ui.stage = root.querySelector(".ugtp-stage");
    state.ui.columns = root.querySelector(".ugtp-columns");
    state.ui.diagrams = root.querySelector(".ugtp-diagrams");
    state.ui.measure = root.querySelector(".ugtp-measure");
    state.ui.label = root.querySelector(".ugtp-label");
    state.ui.dock = root.querySelector(".ugtp-dock");
    state.ui.status = root.querySelector(".ugtp-status");
    state.ui.hint = root.querySelector(".ugtp-hint");
    state.ui.diagramToggle = root.querySelector('[data-action="diagrams"]');
    state.ui.transposeReset = root.querySelector('[data-action="transpose-reset"]');
    state.ui.transposeValue = root.querySelector(".ugtp-transpose-value");

    if (state.ui.qrImage) {
      state.ui.qrImage.src = chrome.runtime.getURL(SUPPORT_QR_PATH);
    }

    if (state.ui.infoBrandIcon) {
      state.ui.infoBrandIcon.src = chrome.runtime.getURL("icons/icon128.png");
    }
  }

  function bindEvents() {
    state.ui.searchLaunch.addEventListener("click", () => {
      if (state.device.unsupportedMobile) {
        return;
      }

      openSearch();
    });

    state.ui.searchScrim.addEventListener("click", () => {
      closeSearch();
    });

    state.ui.infoScrim.addEventListener("click", () => {
      closeInfo();
    });

    state.ui.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitSearch();
    });

    state.ui.launch.addEventListener("click", () => {
      if (state.device.unsupportedMobile) {
        return;
      }

      if (!state.song) {
        refreshFromPage("launch-click");
      }

      if (state.song) {
        activate(true);
      }
    });

    state.ui.root.addEventListener("click", (event) => {
      const formatId = event.target.closest("[data-search-format]")?.dataset.searchFormat;

      if (formatId) {
        setSearchFormat(formatId);
        return;
      }

      if (
        state.palette.isOpen &&
        !event.target.closest(".ugtp-palette-popover") &&
        !event.target.closest('[data-action="toggle-palettes"]')
      ) {
        closePalettePopover();
      }

      const action = event.target.closest("[data-action]")?.dataset.action;

      if (!action) {
        return;
      }

      if (action === "toggle") {
        if (state.device.unsupportedMobile) {
          return;
        }

        toggleActive();
        return;
      }

      if (action === "search") {
        if (state.device.unsupportedMobile) {
          return;
        }

        openSearch();
        return;
      }

      if (action === "info") {
        toggleInfo();
        return;
      }

      if (action === "close-search") {
        closeSearch();
        return;
      }

      if (action === "close-info") {
        closeInfo();
        return;
      }

      if (action === "toggle-palettes") {
        togglePalettePopover();
        return;
      }

      if (action === "theme-system" || action === "theme-light" || action === "theme-dark") {
        setThemePreference(action.replace("theme-", ""));
        return;
      }

      if (
        action === "palette-terracotta" ||
        action === "palette-monokai" ||
        action === "palette-catppuccin" ||
        action === "palette-nord"
      ) {
        setPalette(action.replace("palette-", ""));
        return;
      }

      if (
        action === "default-format-chords" ||
        action === "default-format-tabs" ||
        action === "default-format-ukulele" ||
        action === "default-format-bass" ||
        action === "default-format-drums"
      ) {
        setDefaultInstrument(action.replace("default-format-", ""));
        return;
      }

      if (action === "diagrams") {
        if (!state.song?.supportsDiagrams) {
          flashHint("Chord shapes are only available on standard guitar chord pages.");
          return;
        }

        state.showDiagrams = !state.showDiagrams;
        renderPrompter();
        flashHint(state.showDiagrams ? "Chord diagrams visible." : "Chord diagrams hidden.");
        return;
      }

      if (action === "transpose-up") {
        shiftTranspose(1);
        return;
      }

      if (action === "transpose-down") {
        shiftTranspose(-1);
        return;
      }

      if (action === "transpose-reset") {
        resetTranspose();
        return;
      }

      if (action === "refit") {
        state.manualFontSize = null;
        renderPrompter();
        flashHint("Refit to the largest size that fits the screen.");
        return;
      }

      if (action === "up") {
        nudgeFontSize(1);
        return;
      }

      if (action === "down") {
        nudgeFontSize(-1);
      }
    });

    window.addEventListener("keydown", handleKeydown, true);
    window.addEventListener(
      "resize",
      debounce(() => {
        if (state.active) {
          renderPrompter();
        }
      }, 80)
    );
  }

  function handleKeydown(event) {
    if (isEditable(event.target)) {
      return;
    }

    if (state.device.unsupportedMobile) {
      return;
    }

    if (event.key === "Escape" && state.search.isOpen) {
      event.preventDefault();
      closeSearch();
      return;
    }

    if (event.key === "Escape" && state.info.isOpen) {
      event.preventDefault();
      closeInfo();
      return;
    }

    if (event.key === "Escape" && state.palette.isOpen) {
      event.preventDefault();
      closePalettePopover();
      return;
    }

    if (event.key === "Escape" && state.active) {
      event.preventDefault();
      activate(false);
      return;
    }

    if (event.key.toLowerCase() === "t") {
      event.preventDefault();
      toggleActive();
      return;
    }

    if (!state.active) {
      return;
    }

    if (state.info.isOpen) {
      return;
    }

    if (event.key.toLowerCase() === "i") {
      event.preventDefault();
      toggleInfo();
      return;
    }

    if (event.key.toLowerCase() === "s") {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.key === "]" || event.key === "}") {
      event.preventDefault();
      shiftTranspose(1);
      return;
    }

    if (event.key === "[" || event.key === "{") {
      event.preventDefault();
      shiftTranspose(-1);
      return;
    }

    if (event.key === "0") {
      event.preventDefault();
      resetTranspose();
      return;
    }

    if (event.key === "=" || event.key === "+" || event.code === "NumpadAdd") {
      event.preventDefault();
      nudgeFontSize(1);
      return;
    }

    if (event.key === "-" || event.key === "_" || event.code === "NumpadSubtract") {
      event.preventDefault();
      nudgeFontSize(-1);
      return;
    }

    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      state.manualFontSize = null;
      renderPrompter();
      flashHint("Refit to the largest size that fits the screen.");
    }
  }

  function observePage() {
    const observer = new MutationObserver(() => scheduleRefresh("mutation"));
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    window.setInterval(() => {
      if (location.href !== state.currentUrl) {
        state.currentUrl = location.href;
        state.lastSignature = "";
        state.manualFontSize = null;
        state.transposeSteps = 0;
        state.song = null;
        state.search.dismissedUrl = "";
        state.search.allResults = [];
        state.search.format = readSearchFormatParam() || state.settings.defaultInstrument || DEFAULT_SEARCH_FORMAT;
        state.search.availableFormats = getBaseSearchFormats();
        state.search.lastSignature = "";
        state.search.query = "";
        state.search.results = [];
        state.search.totalResults = 0;
        state.search.isOpen = false;
        state.info.isOpen = false;
        scheduleRefresh("url-change");
      }
    }, 750);

    window.addEventListener("resize", debounce(handleDeviceSupportChange, 80));
  }

  function initDeviceSupport() {
    state.device.unsupportedMobile = detectUnsupportedMobileDevice();
    renderDeviceSupport();
  }

  function detectUnsupportedMobileDevice() {
    const coarsePointer =
      typeof window.matchMedia === "function" ? window.matchMedia("(pointer: coarse)").matches : false;
    const viewportWidth = Math.min(window.innerWidth || Infinity, window.screen?.width || Infinity);

    return coarsePointer && viewportWidth <= 820;
  }

  function handleDeviceSupportChange() {
    const nextUnsupportedMobile = detectUnsupportedMobileDevice();

    if (nextUnsupportedMobile === state.device.unsupportedMobile) {
      return;
    }

    state.device.unsupportedMobile = nextUnsupportedMobile;
    renderDeviceSupport();

    if (state.active) {
      renderPrompter();
    }
  }

  function renderDeviceSupport() {
    const isUnsupportedMobile = state.device.unsupportedMobile;

    state.ui.root.dataset.mobileUnsupported = String(isUnsupportedMobile);

    if (state.ui.deviceNote) {
      state.ui.deviceNote.hidden = !isUnsupportedMobile;
    }

    if (state.ui.searchLaunch) {
      state.ui.searchLaunch.disabled = isUnsupportedMobile;
    }

    if (state.ui.launch) {
      state.ui.launch.disabled = isUnsupportedMobile;
    }

    if (!isUnsupportedMobile) {
      return;
    }

    state.search.isOpen = false;
    state.info.isOpen = false;
    closePalettePopover();

    if (state.active) {
      activate(false);
    }

    renderSearchChrome();
    renderInfoChrome();
  }

  function scheduleRefresh(reason) {
    if (state.refreshTimer) {
      clearTimeout(state.refreshTimer);
    }

    state.refreshTimer = window.setTimeout(() => {
      state.refreshTimer = 0;
      refreshFromPage(reason);
    }, 120);
  }

  function refreshFromPage(reason) {
    refreshSearchFromPage();
    const pageTransposeSteps = readPageTransposeSteps();

    if (pageTransposeSteps !== null) {
      state.transposeSteps = pageTransposeSteps;
    }

    const pre = document.querySelector(SONG_SELECTOR);

    if (!pre) {
      state.song = null;
      state.lastSignature = "";
      updateAvailability(false);
      return;
    }

    const signature = pre.innerText.slice(0, 600) + "::" + pre.innerText.length + "::" + location.href;
    const title = readSongTitle();
    const artist = readSongArtist();
    const format = readSongFormat();
    const supportsDiagrams = format === "chords";

    if (signature === state.lastSignature && state.song) {
      updateAvailability(true);

      if (state.active) {
        renderPrompter();
      }

      return;
    }

    const parsedLines = parseSongLines(pre);
    const lines = cleanSongLines(parsedLines);
    const diagrams = supportsDiagrams ? collectChordNames(lines) : [];

    if (!lines.length) {
      updateAvailability(false);
      return;
    }

    state.lastSignature = signature;
    state.song = {
      format,
      supportsDiagrams,
      title,
      artist,
      lines,
      diagrams
    };

    if (!supportsDiagrams) {
      state.showDiagrams = false;
    }

    state.manualFontSize = null;

    updateAvailability(true);
    updateLabel();

    if (state.autoOpenedUrl !== location.href) {
      state.autoOpenedUrl = location.href;
      activate(true);
      flashHint(APP_NAME + " opened automatically for this song.");
      return;
    }

    if (state.active) {
      renderPrompter();
    }

    if (reason === "launch-click") {
      activate(true);
    }
  }

  function updateAvailability(isAvailable) {
    state.ui.launch.hidden = !isAvailable || state.active;

    if (!isAvailable) {
      state.ui.label.textContent = "";
      closeInfo();

      if (state.active) {
        activate(false);
      }
    }
  }

  function updateLabel() {
    if (!state.song) {
      state.ui.label.textContent = "";
      return;
    }

    const parts = [state.song.title, state.song.artist].filter(Boolean);
    const meta = [];

    if (parts.length) {
      meta.push(parts.join(" - "));
    }

    meta.push(formatTransposeDisplay(state.transposeSteps));
    state.ui.label.textContent = meta.join("  |  ");
  }

  function refreshSearchFromPage() {
    const data = readSearchData();

    if (!data) {
      if (isSearchPage() && state.search.dismissedUrl !== location.href) {
        state.search.isOpen = true;
        state.search.query = readSearchQueryParam();
        renderSearchChrome();
        return;
      }

      if (!isSearchPage()) {
        state.search.allResults = [];
        state.search.availableFormats = getBaseSearchFormats();
        state.search.lastSignature = "";
        state.search.query = "";
        state.search.results = [];
        state.search.totalResults = 0;

        if (state.search.isOpen) {
          renderSearchChrome();
        }
      }

      return;
    }

    state.search.availableFormats = getSearchFormatOptions(data.results);
    state.search.allResults = data.results;
    const filteredResults = filterSearchResults(state.search.allResults, state.search.format);
    const signature = [
      data.search_query || "",
      data.results_count || 0,
      state.search.format,
      filteredResults.slice(0, 16).map((result) => result.tab_url).join("|")
    ].join("::");

    if (signature === state.search.lastSignature) {
      return;
    }

    state.search.lastSignature = signature;
    state.search.query = data.search_query || "";
    state.search.results = filteredResults;
    state.search.totalResults = Number(data.results_count) || 0;

    if (isSearchPage() && state.search.dismissedUrl !== location.href) {
      state.search.isOpen = true;
    }

    renderSearchChrome();
  }

  function readSearchData() {
    const article = findSearchResultsArticle();

    if (!article) {
      return null;
    }

    const rowsContainer = article.firstElementChild;

    if (!rowsContainer) {
      return null;
    }

    const rows = Array.from(rowsContainer.children).filter((row) => row.children.length >= 4);

    if (!rows.length) {
      return null;
    }

    const results = [];
    let currentArtist = "";

    rows.forEach((row) => {
      const cells = Array.from(row.children);

      if (cells.length < 4) {
        return;
      }

      const rowLabel = normalizeInlineText(row.textContent).toLowerCase();

      if (rowLabel === "artist song rating type") {
        return;
      }

      const artistLink = cells[0].querySelector('a[href*="/artist/"]');
      const nextArtist = normalizeInlineText(artistLink?.textContent || cells[0].textContent);

      if (nextArtist) {
        currentArtist = nextArtist;
      }

      const songLink = cells[1].querySelector('a[href*="tabs.ultimate-guitar.com/tab/"]');
      const typeText = normalizeInlineText(cells[3].textContent);
      const format = describeSearchFormat(typeText);

      if (!songLink || !songLink.href) {
        return;
      }

      const rawSongName = normalizeInlineText(songLink.textContent).replace(/\*+$/g, "").trim();
      const versionMatch = rawSongName.match(/\(ver\s+(\d+)\)\s*$/i);

      results.push({
        artist_name: currentArtist,
        difficulty: "",
        marketing_type: "",
        part: "",
        rating: 0,
        song_name: rawSongName.replace(/\s*\(ver\s+\d+\)\s*$/i, "").trim(),
        tab_access_type: "public",
        tab_url: songLink.href,
        tonality_name: "",
        type: typeText,
        search_format_id: format.id,
        search_format_label: format.label,
        search_format_blocked: format.blocked,
        version: versionMatch ? Number(versionMatch[1]) : 1,
        votes: parseSearchCount(cells[2].textContent)
      });
    });

    if (!results.length) {
      return null;
    }

    return {
      results,
      results_count: readSearchTotalResultsFromDom(),
      search_query: readSearchQueryParam()
    };
  }

  function findSearchResultsArticle() {
    return Array.from(document.querySelectorAll("main article")).find((article) => {
      const text = normalizeInlineText(article.textContent).toLowerCase();
      return text.includes("artist") && text.includes("song") && text.includes("rating") && text.includes("type");
    }) || null;
  }

  function readSearchQueryParam() {
    const params = new URLSearchParams(location.search);
    return params.get("value") || params.get("title") || "";
  }

  function readSearchTotalResultsFromDom() {
    const text = document.querySelector("main")?.textContent || "";
    const match = text.match(/(\d[\d,]*)\s+tabs found/i);
    return match ? parseSearchCount(match[1]) : 0;
  }

  function normalizeInlineText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function parseSearchCount(value) {
    const match = String(value || "").match(/\d[\d,]*/);
    return match ? Number(match[0].replace(/,/g, "")) : 0;
  }

  function filterSearchResults(results, formatId = DEFAULT_SEARCH_FORMAT) {
    const seen = new Set();

    return (results || []).filter((result) => {
      if (!result || result.search_format_blocked) {
        return false;
      }

      if (result.marketing_type || result.tab_access_type !== "public") {
        return false;
      }

      if (String(result.part || "").trim()) {
        return false;
      }

      if (typeof result.tab_url !== "string" || !/tabs\.ultimate-guitar\.com\/tab\//i.test(result.tab_url)) {
        return false;
      }

      if (formatId !== "all" && result.search_format_id !== formatId) {
        return false;
      }

      if (seen.has(result.tab_url)) {
        return false;
      }

      seen.add(result.tab_url);
      return true;
    });
  }

  function isSearchPage() {
    return location.hostname === "www.ultimate-guitar.com" && location.pathname === "/search.php";
  }

  function getBaseSearchFormats() {
    return Object.values(SEARCH_FORMATS).map((format) => ({ ...format }));
  }

  function readSearchFormatParam() {
    const value = new URLSearchParams(location.search).get(SEARCH_FORMAT_PARAM) || "";
    return normalizeSearchFormatId(value);
  }

  function normalizeSearchFormatId(value) {
    const normalized = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return normalized;
  }

  function slugifySearchFormatLabel(value) {
    return normalizeSearchFormatId(value) || "other";
  }

  function describeSearchFormat(typeText) {
    const raw = normalizeInlineText(typeText) || "Unknown";
    const lower = raw.toLowerCase();

    if (BLOCKED_SEARCH_TYPE_PATTERN.test(lower)) {
      return { id: "blocked", label: raw, blocked: true };
    }

    if (lower.includes("ukulele")) {
      return { ...SEARCH_FORMATS.ukulele, blocked: false };
    }

    if (lower.includes("bass")) {
      return { ...SEARCH_FORMATS.bass, blocked: false };
    }

    if (lower.includes("drum")) {
      return { ...SEARCH_FORMATS.drums, blocked: false };
    }

    if (lower.includes("chord")) {
      return { ...SEARCH_FORMATS.chords, blocked: false };
    }

    if (/\btab\b|\btabs\b/.test(lower)) {
      return { ...SEARCH_FORMATS.tabs, blocked: false };
    }

    return {
      id: "type-" + slugifySearchFormatLabel(raw),
      label: raw,
      order: 50,
      blocked: false
    };
  }

  function getSearchFormatOptions(results) {
    const options = new Map(getBaseSearchFormats().map((format) => [format.id, format]));

    (results || []).forEach((result) => {
      if (!result || result.search_format_blocked) {
        return;
      }

      if (!options.has(result.search_format_id)) {
        options.set(result.search_format_id, {
          id: result.search_format_id,
          label: result.search_format_label || result.type || "Other",
          order: 50
        });
      }
    });

    return Array.from(options.values()).sort((left, right) => {
      const leftOrder = typeof left.order === "number" ? left.order : 50;
      const rightOrder = typeof right.order === "number" ? right.order : 50;
      return leftOrder - rightOrder || left.label.localeCompare(right.label);
    });
  }

  function openSearch(options = {}) {
    const { autoSubmit = true } = options;

    closeInfo();
    closePalettePopover();

    if (state.active) {
      activate(false);
    }

    if (!isSearchPage()) {
      state.search.format = state.settings.defaultInstrument;
    }

    state.search.isOpen = true;
    state.search.dismissedUrl = "";
    const input = state.ui.searchInput;
    const nextValue = state.search.query || readSuggestedSearchQuery();

    if (!input.value.trim()) {
      input.value = nextValue;
    }

    if (!isSearchPage() && autoSubmit && input.value.trim()) {
      state.search.query = input.value.trim();
      submitSearch(state.search.query);
      return;
    }

    renderSearchChrome();
    input.focus();
    input.select();
  }

  function closeSearch(rememberDismissal = true) {
    state.search.isOpen = false;

    if (rememberDismissal && isSearchPage()) {
      state.search.dismissedUrl = location.href;
    }

    renderSearchChrome();
  }

  function toggleInfo() {
    if (!state.active) {
      return;
    }

    if (state.info.isOpen) {
      closeInfo();
      return;
    }

    openInfo();
  }

  function openInfo() {
    if (!state.active) {
      return;
    }

    closePalettePopover();
    state.info.isOpen = true;
    renderInfoPanel();
    renderInfoChrome();
    state.ui.infoClose?.focus();
  }

  function closeInfo() {
    if (!state.info.isOpen) {
      return;
    }

    state.info.isOpen = false;
    renderInfoChrome();
  }

  function togglePalettePopover() {
    state.palette.isOpen ? closePalettePopover() : openPalettePopover();
  }

  function openPalettePopover() {
    state.palette.isOpen = true;
    renderPalettePopover();
  }

  function closePalettePopover() {
    if (!state.palette.isOpen) {
      return;
    }

    state.palette.isOpen = false;
    renderPalettePopover();
  }

  function renderPalettePopover() {
    if (!state.ui.palettePopover) {
      return;
    }

    state.ui.palettePopover.hidden = !state.palette.isOpen;
    const trigger = state.ui.root.querySelector('[data-action="toggle-palettes"]');

    if (trigger) {
      trigger.setAttribute("aria-expanded", String(state.palette.isOpen));
      trigger.setAttribute("aria-pressed", String(state.palette.isOpen));
    }
  }

  function renderInfoChrome() {
    const isOpen = state.info.isOpen;

    state.ui.root.dataset.infoOpen = String(isOpen);
    state.ui.infoScrim.hidden = !isOpen;
    state.ui.infoPanel.hidden = !isOpen;
  }

  function initTheme() {
    state.theme.mediaQuery =
      typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const queryAppearance = readAppearanceQueryOverrides();
    state.theme.preference = "system";
    state.palette.value = "terracotta";

    if (queryAppearance.themePreference) {
      state.theme.preference = queryAppearance.themePreference;
    }

    if (queryAppearance.palette) {
      state.palette.value = queryAppearance.palette;
    }

    if (state.theme.mediaQuery?.addEventListener) {
      state.theme.mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else if (state.theme.mediaQuery?.addListener) {
      state.theme.mediaQuery.addListener(handleSystemThemeChange);
    }

    applyTheme();

    if (queryAppearance.themePreference) {
      persistThemePreference(queryAppearance.themePreference);
    }

    if (queryAppearance.palette) {
      persistPalette(queryAppearance.palette);
    }

    loadStoredAppearancePreferences().then(({ themePreference, palette }) => {
      state.theme.preference = queryAppearance.themePreference || themePreference;
      state.palette.value = queryAppearance.palette || palette;
      applyTheme();
    });
  }

  function initSearchPreferences() {
    loadStoredDefaultInstrument().then((defaultInstrument) => {
      state.settings.defaultInstrument = defaultInstrument;

      if (!readSearchFormatParam()) {
        state.search.format = defaultInstrument;
      }

      updateDefaultInstrumentControls();
      renderInfoPanel();

      if (state.search.isOpen) {
        renderSearchChrome();
      }
    });
  }

  function handleSystemThemeChange() {
    if (state.theme.preference === "system") {
      applyTheme();
    }
  }

  function loadStoredAppearancePreferences() {
    const fallback = {
      themePreference: readLegacyStoredThemePreference(),
      palette: readLegacyStoredPalette()
    };
    const storage = chrome?.storage?.local;

    if (!storage?.get) {
      return Promise.resolve(fallback);
    }

    return new Promise((resolve) => {
      storage.get([THEME_STORAGE_KEY, PALETTE_STORAGE_KEY], (items) => {
        if (chrome.runtime?.lastError) {
          resolve(fallback);
          return;
        }

        resolve({
          themePreference: normalizeStoredThemePreference(items?.[THEME_STORAGE_KEY] ?? fallback.themePreference),
          palette: normalizeStoredPalette(items?.[PALETTE_STORAGE_KEY] ?? fallback.palette)
        });
      });
    });
  }

  function normalizeStoredThemePreference(value) {
    return value === "light" || value === "dark" || value === "system" ? value : "system";
  }

  function normalizeDefaultInstrument(value) {
    return DEFAULT_INSTRUMENT_OPTIONS.includes(value) ? value : DEFAULT_SEARCH_FORMAT;
  }

  function readAppearanceQueryOverrides() {
    const params = new URLSearchParams(location.search);
    const themePreference = params.has(SEARCH_THEME_PARAM)
      ? normalizeStoredThemePreference(params.get(SEARCH_THEME_PARAM))
      : "";
    const palette = params.has(SEARCH_PALETTE_PARAM)
      ? normalizeStoredPalette(params.get(SEARCH_PALETTE_PARAM))
      : "";

    return {
      themePreference: themePreference === "system" || themePreference === "light" || themePreference === "dark"
        ? themePreference
        : "",
      palette: PALETTE_LABELS[palette] ? palette : ""
    };
  }

  function readLegacyStoredThemePreference() {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      return normalizeStoredThemePreference(stored);
    } catch (_error) {
      return "system";
    }
  }

  function persistThemePreference(preference) {
    const storage = chrome?.storage?.local;

    if (storage?.set) {
      storage.set({ [THEME_STORAGE_KEY]: preference });
    }

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch (_error) {
      // Ignore storage issues and keep the session theme in memory.
    }
  }

  function normalizeStoredPalette(value) {
    if (value === "terra") {
      return "terracotta";
    }

    return PALETTE_LABELS[value] ? value : "terracotta";
  }

  function readLegacyStoredPalette() {
    try {
      const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY);
      return normalizeStoredPalette(stored);
    } catch (_error) {
      return "terracotta";
    }
  }

  function persistPalette(palette) {
    const storage = chrome?.storage?.local;

    if (storage?.set) {
      storage.set({ [PALETTE_STORAGE_KEY]: palette });
    }

    try {
      window.localStorage.setItem(PALETTE_STORAGE_KEY, palette);
    } catch (_error) {
      // Ignore storage issues and keep the session palette in memory.
    }
  }

  function loadStoredDefaultInstrument() {
    const fallback = normalizeDefaultInstrument(readLegacyStoredDefaultInstrument());
    const storage = chrome?.storage?.local;

    if (!storage?.get) {
      return Promise.resolve(fallback);
    }

    return new Promise((resolve) => {
      storage.get([DEFAULT_INSTRUMENT_STORAGE_KEY], (items) => {
        if (chrome.runtime?.lastError) {
          resolve(fallback);
          return;
        }

        resolve(normalizeDefaultInstrument(items?.[DEFAULT_INSTRUMENT_STORAGE_KEY] ?? fallback));
      });
    });
  }

  function readLegacyStoredDefaultInstrument() {
    try {
      return normalizeDefaultInstrument(window.localStorage.getItem(DEFAULT_INSTRUMENT_STORAGE_KEY));
    } catch (_error) {
      return DEFAULT_SEARCH_FORMAT;
    }
  }

  function persistDefaultInstrument(formatId) {
    const storage = chrome?.storage?.local;

    if (storage?.set) {
      storage.set({ [DEFAULT_INSTRUMENT_STORAGE_KEY]: formatId });
    }

    try {
      window.localStorage.setItem(DEFAULT_INSTRUMENT_STORAGE_KEY, formatId);
    } catch (_error) {
      // Ignore storage issues and keep the session setting in memory.
    }
  }

  function setThemePreference(preference) {
    if (preference !== "system" && preference !== "light" && preference !== "dark") {
      return;
    }

    state.theme.preference = preference;
    persistThemePreference(preference);
    applyTheme();
    flashHint("Appearance " + describeThemePreference(preference) + ".");
  }

  function setPalette(palette) {
    if (!PALETTE_LABELS[palette]) {
      return;
    }

    state.palette.value = palette;
    persistPalette(palette);
    applyTheme();
    closePalettePopover();
    flashHint("Color theme " + PALETTE_LABELS[palette] + ".");
  }

  function setDefaultInstrument(formatId) {
    const normalized = normalizeDefaultInstrument(formatId);

    if (state.settings.defaultInstrument === normalized) {
      return;
    }

    state.settings.defaultInstrument = normalized;
    persistDefaultInstrument(normalized);

    if (!isSearchPage()) {
      state.search.format = normalized;
    }

    updateDefaultInstrumentControls();
    renderInfoPanel();

    if (state.search.isOpen) {
      renderSearchChrome();
    }

    flashHint("Default instrument " + SEARCH_FORMATS[normalized].label + ".");
  }

  function applyTheme() {
    state.theme.resolved = resolveThemePreference(state.theme.preference);
    state.ui.root.dataset.theme = state.theme.resolved;
    state.ui.root.dataset.themePreference = state.theme.preference;
    state.ui.root.dataset.palette = state.palette.value;
    updateThemeControls();
    updatePaletteControls();
    updateDefaultInstrumentControls();
    renderInfoPanel();
  }

  function resolveThemePreference(preference) {
    if (preference === "light" || preference === "dark") {
      return preference;
    }

    return state.theme.mediaQuery?.matches ? "dark" : "light";
  }

  function updateThemeControls() {
    (state.ui.themeButtons || []).forEach((button) => {
      const isActive = button.dataset.themePreference === state.theme.preference;
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function updatePaletteControls() {
    (state.ui.paletteButtons || []).forEach((button) => {
      const isActive = button.dataset.palette === state.palette.value;
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function updateDefaultInstrumentControls() {
    (state.ui.defaultFormatButtons || []).forEach((button) => {
      const isActive = button.dataset.defaultFormat === state.settings.defaultInstrument;
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function describeThemePreference(preference) {
    if (preference === "system") {
      return "now follows system " + state.theme.resolved + " mode";
    }

    return "set to " + preference + " mode";
  }

  function readSuggestedSearchQuery() {
    const titleBits = [state.song?.title, state.song?.artist].filter(Boolean);

    if (titleBits.length) {
      return titleBits.join(" ");
    }

    return new URLSearchParams(location.search).get("value") || "";
  }

  function submitSearch(forcedQuery = "") {
    const query = String(forcedQuery || state.ui.searchInput.value || "").trim();

    if (!query) {
      state.ui.searchInput.focus();
      return;
    }

    const params = new URLSearchParams({
      search_type: "title",
      value: query,
      [SEARCH_FORMAT_PARAM]: state.search.format,
      [SEARCH_THEME_PARAM]: state.theme.preference,
      [SEARCH_PALETTE_PARAM]: state.palette.value
    });

    location.href = "https://www.ultimate-guitar.com/search.php?" + params.toString();
  }

  function renderSearchChrome() {
    const isOpen = state.search.isOpen;

    state.ui.root.dataset.searchOpen = String(isOpen);
    state.ui.searchScrim.hidden = !isOpen;
    state.ui.searchPanel.hidden = !isOpen;
    document.documentElement.classList.toggle(SEARCH_ACTIVE_CLASS, isOpen);
    document.body?.classList.toggle(SEARCH_ACTIVE_CLASS, isOpen);

    if (!isOpen) {
      return;
    }

    renderSearchFormatControls();
    renderSearchResults();
  }

  function renderSearchFormatControls() {
    if (!state.ui.searchFilters) {
      return;
    }

    state.ui.searchFilters.textContent = "";

    const formats = state.search.availableFormats?.length ? state.search.availableFormats : getBaseSearchFormats();

    formats.forEach((format) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ugtp-search-filter";
      button.dataset.searchFormat = format.id;
      button.setAttribute("aria-pressed", String(format.id === state.search.format));
      button.textContent = format.label;
      state.ui.searchFilters.appendChild(button);
    });
  }

  function setSearchFormat(formatId) {
    const normalized = normalizeSearchFormatId(formatId);

    if (!normalized || state.search.format === normalized) {
      return;
    }

    state.search.format = normalized;
    state.search.results = filterSearchResults(state.search.allResults, state.search.format);
    state.search.lastSignature = "";
    renderSearchFormatControls();
    renderSearchResults();
    syncSearchFormatUrl();
  }

  function syncSearchFormatUrl() {
    if (!isSearchPage()) {
      return;
    }

    try {
      const url = new URL(location.href);
      url.searchParams.set(SEARCH_FORMAT_PARAM, state.search.format);
      history.replaceState(null, "", url.toString());
    } catch (_error) {
      // Ignore URL sync issues and keep the in-memory search format.
    }
  }

  function getActiveSearchFormatLabel() {
    const formats = state.search.availableFormats?.length ? state.search.availableFormats : getBaseSearchFormats();
    return formats.find((format) => format.id === state.search.format)?.label || "Results";
  }

  function getActiveSearchResultNoun() {
    switch (state.search.format) {
      case "all":
        return "public result";
      case "chords":
        return "guitar chord chart";
      case "tabs":
        return "tab";
      case "ukulele":
        return "ukulele chart";
      case "bass":
        return "bass tab";
      case "drums":
        return "drum tab";
      default:
        return getActiveSearchFormatLabel().toLowerCase() + " result";
    }
  }

  function renderSearchResults() {
    const query = state.search.query || state.ui.searchInput.value.trim();
    const results = state.search.results;
    const hasSearchData = Boolean(state.search.lastSignature);
    const activeResultNoun = getActiveSearchResultNoun();

    if (!state.ui.searchInput.value && query) {
      state.ui.searchInput.value = query;
    }

    state.ui.searchResults.textContent = "";

    if (!query) {
      state.ui.searchStatus.textContent = "Search Ultimate Guitar, then filter down to the formats you actually want.";
      state.ui.searchResults.appendChild(createSearchEmptyState("Type a song or artist, then pick chords, tabs, ukulele, bass, drums, or all."));
      return;
    }

    if (!hasSearchData && isSearchPage()) {
      state.ui.searchStatus.textContent = 'Loading ' + activeResultNoun + 's for "' + query + '"...';
      state.ui.searchResults.appendChild(createSearchEmptyState("Waiting for Ultimate Guitar to finish loading this search."));
      return;
    }

    if (!results.length) {
      state.ui.searchStatus.textContent =
        'No ' +
        activeResultNoun +
        "s" +
        ' matched "' +
        query +
        '" after removing Pro, Official, MuseScore, Vocal, Video, and Power entries. UG returned ' +
        state.search.totalResults +
        " total results.";
      state.ui.searchResults.appendChild(createSearchEmptyState("Try a broader query, or switch formats above."));
      return;
    }

    state.ui.searchStatus.textContent =
      'Showing ' +
      results.length +
      " " +
      activeResultNoun +
      (results.length === 1 ? "" : "s") +
      ' for "' +
      query +
      '" out of ' +
      state.search.totalResults +
      " total UG results.";

    const fragment = document.createDocumentFragment();

    results.forEach((result, index) => {
      fragment.appendChild(createSearchCard(result, index === 0));
    });

    state.ui.searchResults.appendChild(fragment);
  }

  function createSearchEmptyState(message) {
    const empty = document.createElement("div");
    empty.className = "ugtp-search-empty";
    empty.textContent = message;
    return empty;
  }

  function createSearchCard(result, isTopMatch) {
    const link = document.createElement("a");
    link.className = "ugtp-search-card";
    link.href = result.tab_url;
    link.target = "_self";

    const titleRow = document.createElement("div");
    titleRow.className = "ugtp-search-title-row";

    const title = document.createElement("div");
    title.className = "ugtp-search-title";
    title.textContent = result.song_name || "Untitled";

    titleRow.appendChild(title);

    if (result.version > 1) {
      const version = document.createElement("div");
      version.className = "ugtp-search-badge";
      version.textContent = "Ver " + result.version;
      titleRow.appendChild(version);
    } else if (isTopMatch) {
      const version = document.createElement("div");
      version.className = "ugtp-search-badge";
      version.textContent = "Top";
      titleRow.appendChild(version);
    }

    const artist = document.createElement("div");
    artist.className = "ugtp-search-artist";
    artist.textContent = result.artist_name || "Unknown artist";

    const meta = document.createElement("div");
    meta.className = "ugtp-search-meta";
    meta.textContent = formatSearchMeta(result);

    const cta = document.createElement("div");
    cta.className = "ugtp-search-cta";
    cta.textContent = "Open in " + APP_NAME;

    link.appendChild(titleRow);
    link.appendChild(artist);
    link.appendChild(meta);
    link.appendChild(cta);

    return link;
  }

  function formatSearchMeta(result) {
    const parts = [];

    if (result.type) {
      parts.push(result.type);
    }

    if (typeof result.rating === "number" && result.rating > 0) {
      parts.push(result.rating.toFixed(2) + " rating");
    }

    if (typeof result.votes === "number" && result.votes > 0) {
      parts.push(formatCount(result.votes) + " votes");
    }

    if (result.tonality_name) {
      parts.push("Key " + result.tonality_name);
    }

    if (result.difficulty) {
      parts.push(result.difficulty);
    }

    return parts.join("  |  ") || "Public result";
  }

  function formatCount(value) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  function toggleActive() {
    if (!state.song) {
      refreshFromPage("toggle");
    }

    if (!state.song) {
      return;
    }

    activate(!state.active);
  }

  function activate(nextState) {
    state.active = Boolean(nextState && state.song);
    state.ui.root.dataset.active = String(state.active);
    state.ui.overlay.setAttribute("aria-hidden", String(!state.active));
    document.documentElement.classList.toggle(ACTIVE_CLASS, state.active);
    document.body?.classList.toggle(ACTIVE_CLASS, state.active);
    state.ui.launch.hidden = state.active || !state.song;

    if (state.active) {
      closeSearch(false);
      renderPrompter();
      return;
    }

    closePalettePopover();
    closeInfo();
  }

  function renderPrompter() {
    if (!state.active || !state.song) {
      return;
    }

    syncOverlayChrome();

    const preferredLayout =
      state.manualFontSize !== null ? layoutForFont(state.manualFontSize) : null;

    if (state.manualFontSize !== null && !preferredLayout) {
      state.manualFontSize = null;
    }

    let layout = preferredLayout || findBestLayout();

    if (!layout) {
      layout = layoutForFont(SETTINGS.minFontSize, true);
    }

    applyLayout(layout);
    layout = shrinkUntilDomFits(layout);
    updateStatus(layout);
    syncOverlayChrome();
    layout = shrinkUntilDomFits(layout);
    updateStatus(layout);
  }

  function updateStatus(layout) {
    const size = roundTo(layout.fontSize, 1);
    const cols = layout.columns;
    const linesPerColumn = layout.linesPerColumn;
    state.ui.status.textContent =
      cols +
      " col" +
      (cols === 1 ? "" : "s") +
      "  |  " +
      size +
      "px  |  " +
      linesPerColumn +
      " lines/col";
    renderInfoPanel(layout);
  }

  function nudgeFontSize(delta) {
    if (!state.active || !state.song) {
      return;
    }

    const baseSize = state.manualFontSize ?? findBestLayout()?.fontSize ?? SETTINGS.minFontSize;
    const nextSize = clamp(baseSize + delta, SETTINGS.minFontSize, SETTINGS.maxFontSize);
    const nextLayout = layoutForFont(nextSize);

    if (!nextLayout) {
      flashHint("That size will not fit on the current screen.");
      return;
    }

    state.manualFontSize = nextLayout.fontSize;
    applyLayout(nextLayout);

    const fitted = shrinkUntilDomFits(nextLayout);
    state.manualFontSize = fitted.fontSize;
    updateStatus(fitted);
  }

  function shrinkUntilDomFits(layout) {
    let working = layout;
    let safety = 80;

    while (!domFits() && safety > 0 && working.fontSize > SETTINGS.minFontSize) {
      safety -= 1;
      const next = layoutForFont(working.fontSize - 0.5, true);

      if (!next) {
        break;
      }

      working = next;
      applyLayout(working);
    }

    return working;
  }

  function domFits() {
    const stageRect = state.ui.stage.getBoundingClientRect();
    const contentRect = state.ui.columns.getBoundingClientRect();
    const widthFits = Math.ceil(contentRect.width) <= Math.ceil(stageRect.width) + 1;
    const heightFits = Math.ceil(contentRect.height) <= Math.ceil(stageRect.height) + 1;
    return widthFits && heightFits;
  }

  function applyLayout(layout) {
    state.ui.root.style.setProperty("--ugtp-font-size", layout.fontSize + "px");
    state.ui.root.style.setProperty("--ugtp-line-height", layout.lineHeight.toFixed(4));
    state.ui.root.style.setProperty("--ugtp-column-gap", layout.columnGap + "px");
    state.ui.columns.textContent = "";

    layout.columnsData.forEach((columnLines) => {
      const column = document.createElement("div");
      column.className = "ugtp-column";

      columnLines.forEach((line) => {
        column.appendChild(renderLine(line));
      });

      state.ui.columns.appendChild(column);
    });

    renderDiagrams(layout);
  }

  function renderLine(line) {
    const row = document.createElement("div");
    row.className = "ugtp-line";

    if (line.kind === "section") {
      row.classList.add("ugtp-line-section");
    } else if (line.kind === "blank") {
      row.classList.add("ugtp-line-blank");
    } else if (line.kind === "chords") {
      row.classList.add("ugtp-line-chords");
    } else if (line.kind === "tab") {
      row.classList.add("ugtp-line-tab");
    }

    if (line.kind === "blank") {
      row.textContent = " ";
      return row;
    }

    line.segments.forEach((segment) => {
      if (segment.type === "chord") {
        const chord = document.createElement("span");
        chord.className = "ugtp-chord";
        chord.textContent = transposeChordText(segment.text, getRenderTransposeSteps());
        row.appendChild(chord);
        return;
      }

      row.appendChild(document.createTextNode(segment.text));
    });

    return row;
  }

  function findBestLayout() {
    let low = SETTINGS.minFontSize;
    let high = SETTINGS.maxFontSize;
    let best = null;

    for (let i = 0; i < 18; i += 1) {
      const mid = (low + high) / 2;
      const layout = layoutForFont(mid);

      if (layout) {
        best = layout;
        low = mid;
      } else {
        high = mid;
      }
    }

    return best;
  }

  function layoutForFont(fontSize, allowOverflowColumns = false) {
    if (!state.song?.lines.length) {
      return null;
    }

    const usableWidth = window.innerWidth - SETTINGS.horizontalPadding * 2;
    const usableHeight = window.innerHeight - getTopPadding() - getBottomPadding();
    const lineHeight = SETTINGS.lineHeightRatio;
    const linePixelHeight = fontSize * lineHeight;
    const linesPerColumn = Math.max(1, Math.floor(usableHeight / linePixelHeight));
    const diagramsVisible = shouldShowDiagramColumn();
    const diagramPanelWidth = diagramsVisible ? getDiagramPanelWidth() : 0;
    const diagramReserveLines = diagramsVisible ? getDiagramReserveLines(linePixelHeight) : 0;
    const columnsData = splitLinesIntoColumns(state.song.lines, linesPerColumn, diagramReserveLines);
    const columns = columnsData.length;

    if (!allowOverflowColumns && columns > SETTINGS.maxColumns) {
      return null;
    }

    const charWidth = measureCharWidth(fontSize);
    const columnGap = SETTINGS.columnGap;
    let estimatedWidth = 0;

    columnsData.forEach((columnLines, index) => {
      const longest = columnLines.reduce((max, line) => Math.max(max, getRenderedLineLength(line)), 1);
      let columnWidth = longest * charWidth;

      if (diagramsVisible && index === columnsData.length - 1) {
        columnWidth = Math.max(columnWidth, diagramPanelWidth);
      }

      estimatedWidth += columnWidth;
    });

    estimatedWidth += Math.max(0, columns - 1) * columnGap;

    if (!allowOverflowColumns && estimatedWidth > usableWidth) {
      return null;
    }

    return {
      columns,
      columnsData,
      columnGap,
      estimatedWidth,
      fontSize: roundTo(fontSize, 2),
      lineHeight,
      linesPerColumn
    };
  }

  function splitLinesIntoColumns(lines, linesPerColumn, trailingReserveLines = 0) {
    const columns = [];
    let start = 0;

    while (start < lines.length) {
      const remainingLines = lines.length - start;
      const reservedLines = trailingReserveLines > 0 && remainingLines <= linesPerColumn ? trailingReserveLines : 0;
      const capacity = Math.max(1, linesPerColumn - reservedLines);
      let end = Math.min(start + capacity, lines.length);

      if (end < lines.length) {
        end = adjustColumnBreak(lines, start, end);

        if (end === start) {
          end = expandProtectedGroupFromStart(lines, start);
        }
      }

      columns.push(lines.slice(start, end));
      start = end;
    }

    return columns;
  }

  function shouldWrapLineToNextColumn(line) {
    return line?.kind === "section" || line?.kind === "chords";
  }

  function shouldShowDiagramColumn() {
    return state.active && state.showDiagrams && state.song?.supportsDiagrams && Boolean(state.song?.diagrams?.length);
  }

  function adjustColumnBreak(lines, start, end) {
    let nextEnd = end;

    while (nextEnd > start && shouldWrapLineToNextColumn(lines[nextEnd - 1])) {
      nextEnd -= 1;
    }

    nextEnd = moveTrailingTabBlockToNextColumn(lines, start, nextEnd);

    while (nextEnd > start && lines[nextEnd - 1]?.kind === "blank") {
      nextEnd -= 1;
    }

    return nextEnd;
  }

  function moveTrailingTabBlockToNextColumn(lines, start, end) {
    let nextEnd = end;
    const tabBlockId = lines[nextEnd - 1]?.tabBlockId;

    if (tabBlockId == null) {
      return nextEnd;
    }

    while (nextEnd > start && lines[nextEnd - 1]?.tabBlockId === tabBlockId) {
      nextEnd -= 1;
    }

    if (nextEnd > start && lines[nextEnd - 1]?.kind === "section") {
      nextEnd -= 1;
    }

    return nextEnd;
  }

  function expandProtectedGroupFromStart(lines, start) {
    let end = Math.min(start + 1, lines.length);
    const currentLine = lines[start];

    if (currentLine?.kind === "section" && lines[start + 1]?.tabBlockId != null) {
      const tabBlockId = lines[start + 1].tabBlockId;
      end = Math.min(start + 2, lines.length);

      while (end < lines.length && lines[end]?.tabBlockId === tabBlockId) {
        end += 1;
      }

      return end;
    }

    if (currentLine?.tabBlockId != null) {
      const tabBlockId = currentLine.tabBlockId;

      while (end < lines.length && lines[end]?.tabBlockId === tabBlockId) {
        end += 1;
      }

      return end;
    }

    while (end < lines.length && shouldWrapLineToNextColumn(lines[end - 1])) {
      end += 1;
    }

    return end;
  }

  function getDiagramPanelWidth() {
    if (window.innerWidth <= 900) {
      return Math.min(178, Math.max(144, window.innerWidth * 0.4));
    }

    return 178;
  }

  function getDiagramReserveLines(linePixelHeight) {
    const diagramCount = state.song?.diagrams?.length || 0;
    const rows = Math.max(1, Math.ceil(diagramCount / 2));
    const headingHeight = 18;
    const rowHeight = 104;
    const gapHeight = 10;
    const totalHeight = headingHeight + rows * rowHeight + Math.max(0, rows - 1) * gapHeight + 14;
    return Math.max(1, Math.ceil(totalHeight / Math.max(1, linePixelHeight)));
  }

  function measureCharWidth(fontSize) {
    const probe = state.ui.measure;
    probe.style.fontSize = fontSize + "px";
    probe.style.lineHeight = SETTINGS.lineHeightRatio;
    probe.textContent = "M".repeat(48);
    return probe.getBoundingClientRect().width / 48;
  }

  function parseSongLines(pre) {
    const lines = [createLine()];

    const appendSegment = (type, rawText) => {
      if (!rawText) {
        return;
      }

      const normalized = rawText.replace(/\u00a0/g, " ");
      const parts = normalized.split(/\r?\n/);

      parts.forEach((part, index) => {
        if (part) {
          const current = lines[lines.length - 1];
          const previous = current.segments[current.segments.length - 1];

          if (previous?.type === type) {
            previous.text += part;
          } else {
            current.segments.push({ type, text: part });
          }

          current.plainText += part;
        }

        if (index < parts.length - 1) {
          lines.push(createLine());
        }
      });
    };

    pre.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        appendSegment("text", node.textContent || "");
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const type = node.matches?.("[data-name]") ? "chord" : "text";
        appendSegment(type, node.textContent || "");
      }
    });

    return lines.map(trimLine).filter(Boolean);
  }

  function cleanSongLines(lines) {
    let working = lines.map(classifyLine);

    working = trimOuterBlankLines(working);
    working = working.filter((line) => !isSeparatorLine(line.plainText));

    const songStartIndex = findSongStartIndex(working);

    if (songStartIndex >= 0) {
      working = working.slice(songStartIndex);
    } else {
      working = dropPreamble(working);
    }

    while (working.length && isTrailingNoise(working[working.length - 1].plainText)) {
      working.pop();
    }

    working = stitchWrappedTabLines(working);
    working = collapseBlankLines(working);
    working = trimOuterBlankLines(working);

    return assignTabBlockMetadata(working.map(classifyLine));
  }

  function createLine() {
    return {
      segments: [],
      plainText: ""
    };
  }

  function trimLine(line) {
    const trimmedText = line.plainText.replace(/[ \t]+$/g, "");
    let remaining = trimmedText.length;
    const segments = [];

    for (const segment of line.segments) {
      if (remaining <= 0) {
        break;
      }

      if (segment.text.length <= remaining) {
        segments.push(segment);
        remaining -= segment.text.length;
      } else {
        segments.push({
          type: segment.type,
          text: segment.text.slice(0, remaining)
        });
        remaining = 0;
      }
    }

    return {
      segments,
      plainText: trimmedText
    };
  }

  function classifyLine(line) {
    const normalizedLine = normalizeChordLine(line);
    const text = normalizedLine.plainText.trim();
    let kind = "text";

    if (!text) {
      kind = "blank";
    } else if (isSectionHeading(text)) {
      kind = "section";
    } else if (isTabNotationLine(normalizedLine.plainText)) {
      kind = "tab";
    } else if (normalizedLine.segments.some((segment) => segment.type === "chord") && !hasLyricsText(normalizedLine)) {
      kind = "chords";
    }

    return {
      ...normalizedLine,
      charCount: Math.max(1, normalizedLine.plainText.length),
      kind
    };
  }

  function assignTabBlockMetadata(lines) {
    let nextBlockId = 0;

    return lines.map((line, index) => {
      if (line.kind !== "tab") {
        return {
          ...line,
          tabBlockId: null
        };
      }

      const previous = lines[index - 1];

      if (previous?.kind !== "tab") {
        nextBlockId += 1;
      }

      return {
        ...line,
        tabBlockId: nextBlockId
      };
    });
  }

  function stitchWrappedTabLines(lines) {
    const stitched = [];
    let index = 0;

    while (index < lines.length) {
      if (lines[index]?.kind !== "tab") {
        stitched.push(lines[index]);
        index += 1;
        continue;
      }

      const start = index;

      while (index < lines.length && lines[index]?.kind === "tab") {
        index += 1;
      }

      stitched.push(...mergeTabRun(lines.slice(start, index)));
    }

    return stitched;
  }

  function mergeTabRun(run) {
    if (!run.length) {
      return run;
    }

    const merged = [];
    let index = 0;

    while (index < run.length) {
      const descriptorSeed = getTabLineDescriptor(run[index]);

      if (!descriptorSeed.label) {
        merged.push(run[index]);
        index += 1;
        continue;
      }

      const descriptors = [];
      let stringCount = 0;

      while (index + stringCount < run.length) {
        const descriptor = getTabLineDescriptor(run[index + stringCount]);

        if (!descriptor.label) {
          break;
        }

        descriptors.push(descriptor);
        stringCount += 1;

        if (stringCount >= 6) {
          break;
        }
      }

      if (stringCount < 2) {
        merged.push(run[index]);
        index += 1;
        continue;
      }

      const mergedRows = run.slice(index, index + stringCount).map((line) => ({
        ...line,
        segments: line.segments.map((segment) => ({ ...segment }))
      }));

      index += stringCount;

      while (index + stringCount <= run.length) {
        const chunk = run.slice(index, index + stringCount);

        if (!canMergeTabChunk(descriptors, chunk)) {
          break;
        }

        for (let rowIndex = 0; rowIndex < stringCount; rowIndex += 1) {
          const descriptor = getTabLineDescriptor(chunk[rowIndex]);
          appendTextToLine(mergedRows[rowIndex], descriptor.appendText);
        }

        index += stringCount;
      }

      merged.push(...mergedRows);
    }

    return merged;
  }

  function canMergeTabChunk(baseDescriptors, chunk) {
    if (!baseDescriptors.length || chunk.length !== baseDescriptors.length) {
      return false;
    }

    return chunk.every((line, index) => {
      const descriptor = getTabLineDescriptor(line);

      if (descriptor.label) {
        return descriptor.label.toLowerCase() === baseDescriptors[index].label.toLowerCase();
      }

      return descriptor.isTabBody;
    });
  }

  function getTabLineDescriptor(line) {
    const plainText = String(line?.plainText || "");
    const labeledMatch = plainText.match(/^(\s*[A-Za-z][A-Za-z#b]{0,2})(\|.*)$/);

    if (labeledMatch) {
      return {
        label: labeledMatch[1].trim(),
        appendText: labeledMatch[2],
        isTabBody: true
      };
    }

    return {
      label: "",
      appendText: plainText.replace(/^\s+/, ""),
      isTabBody: /[-0-9|]/.test(plainText)
    };
  }

  function appendTextToLine(line, text) {
    if (!text) {
      return;
    }

    line.plainText += text;

    if (line.segments?.length && line.segments.every((segment) => segment.type === "text")) {
      line.segments[line.segments.length - 1].text += text;
      return;
    }

    line.segments = [{ type: "text", text: line.plainText }];
  }

  function normalizeChordLine(line) {
    const text = line.plainText;
    const trimmed = text.trim();

    if (!trimmed || isSectionHeading(trimmed) || !isChordOnlyTextLine(text)) {
      return line;
    }

    const segments = tokenizeChordLine(text);

    if (!segments.some((segment) => segment.type === "chord")) {
      return line;
    }

    return {
      ...line,
      segments
    };
  }

  function hasLyricsText(line) {
    return line.segments.some((segment) => segment.type === "text" && /[A-Za-z0-9]/.test(segment.text));
  }

  function isTabNotationLine(text) {
    const trimmed = String(text || "").trim();

    if (!trimmed || isSectionHeading(trimmed) || isMetadataLine(trimmed)) {
      return false;
    }

    if (
      /^\s*(?:[A-Ga-g](?:#|b)?|[A-Za-z]{1,3})\|[0-9A-Za-zhHpPbBrRvVtTxX\\/~().[\]{}*:=<>|\- ]+\|?\s*$/.test(trimmed)
    ) {
      return /-{3,}/.test(trimmed);
    }

    if (/^\s*[0-9A-Za-zhHpPbBrRvVtTxX\\/~().[\]{}*:=<>|\- ]+\|?\s*$/.test(trimmed)) {
      return /-{3,}/.test(trimmed) && /[0-9|]/.test(trimmed);
    }

    return false;
  }

  function isChordOnlyTextLine(text) {
    const trimmed = text.trim();

    if (!trimmed) {
      return false;
    }

    const tokens = trimmed.split(/\s+/).filter(Boolean);
    let chordCount = 0;

    for (const token of tokens) {
      if (isChordToken(token)) {
        chordCount += 1;
        continue;
      }

      if (/^[|:%*~]+$/.test(token)) {
        continue;
      }

      return false;
    }

    return chordCount > 0;
  }

  function tokenizeChordLine(text) {
    const segments = [];
    const chunks = text.split(/(\s+)/);

    chunks.forEach((chunk) => {
      if (!chunk) {
        return;
      }

      if (/^\s+$/.test(chunk)) {
        pushSegment(segments, "text", chunk);
        return;
      }

      const parts = chunk.split(/([|:%*~]+)/).filter(Boolean);

      parts.forEach((part) => {
        if (isChordToken(part)) {
          pushSegment(segments, "chord", part);
          return;
        }

        pushSegment(segments, "text", part);
      });
    });

    return segments;
  }

  function pushSegment(segments, type, text) {
    if (!text) {
      return;
    }

    const previous = segments[segments.length - 1];

    if (previous?.type === type) {
      previous.text += text;
      return;
    }

    segments.push({ type, text });
  }

  function isChordToken(token) {
    const cleaned = String(token || "")
      .trim()
      .replace(/^[([{]+/, "")
      .replace(/[)\]},.;!?]+$/g, "");

    if (!cleaned) {
      return false;
    }

    return /^(?:N\.?C\.?|[A-G](?:#|b)?(?:[a-z0-9+#().-]{0,12})?(?:\/[A-G](?:#|b)?)?)$/.test(cleaned);
  }

  function trimOuterBlankLines(lines) {
    let start = 0;
    let end = lines.length;

    while (start < end && !lines[start].plainText.trim()) {
      start += 1;
    }

    while (end > start && !lines[end - 1].plainText.trim()) {
      end -= 1;
    }

    return lines.slice(start, end);
  }

  function collapseBlankLines(lines) {
    const collapsed = [];
    let previousBlank = false;

    lines.forEach((line) => {
      const blank = !line.plainText.trim();

      if (blank && previousBlank) {
        return;
      }

      collapsed.push(line);
      previousBlank = blank;
    });

    return collapsed;
  }

  function dropPreamble(lines) {
    let start = 0;

    while (start < lines.length) {
      const text = lines[start].plainText.trim();

      if (!text) {
        start += 1;
        continue;
      }

      if (isMetadataLine(text)) {
        start += 1;
        continue;
      }

      break;
    }

    return lines.slice(start);
  }

  function isSectionHeading(text) {
    return /^\[[^[\]]+\]$/.test(text);
  }

  function isStructuralSectionHeading(text) {
    return /^\[(intro|verse(?:\s*\d+)?|pre[- ]?chorus|post[- ]?chorus|chorus(?:\s*\d+)?|bridge|outro|interlude|instrumental|refrain|hook|solo|ending|break)\]$/i.test(
      text
    );
  }

  function findSongStartIndex(lines) {
    for (let index = 0; index < lines.length; index += 1) {
      const text = lines[index].plainText.trim();

      if (isStructuralSectionHeading(text)) {
        return index;
      }
    }

    const fallbackSectionIndex = lines.findIndex(
      (line) => line.kind === "section" && !isMetadataLine(line.plainText.trim())
    );

    return fallbackSectionIndex;
  }

  function isSeparatorLine(text) {
    return /^[-=]{8,}$/.test(text.replace(/\s+/g, ""));
  }

  function isTrailingNoise(text) {
    return /^[xX]$/.test(text.trim());
  }

  function isMetadataLine(text) {
    return (
      /^(capo|play|key|tuning|tempo|difficulty|artist|author|tabbed by|strumming)\s*:/i.test(text) ||
      /^for chords in original key/i.test(text) ||
      /^play this song/i.test(text) ||
      /^or use the ones that can be heard/i.test(text) ||
      /^the "%" signs mean/i.test(text) ||
      /^https?:\/\//i.test(text) ||
      /^\[(coda|notes?)\]$/i.test(text) ||
      /^[A-G][#b0-9a-z/()+-]*\s{2,}[x0-9-].*[x0-9-]/.test(text) ||
      /^e[-\s]a[-\s]d[-\s]g[-\s]b[-\s]e$/i.test(text.replace(/\s+/g, "-"))
    );
  }

  function readSongTitle() {
    const headingTitle = document.querySelector("h1")?.textContent?.trim();

    if (headingTitle) {
      return sanitizeSongTitle(headingTitle);
    }

    const pageTitle = document.title
      .replace(/\s*@\s*Ultimate-Guitar.*$/i, "")
      .replace(/\s+by\s+.+$/i, "")
      .trim();
    return sanitizeSongTitle(pageTitle);
  }

  function sanitizeSongTitle(title) {
    return String(title || "")
      .replace(/\s+/g, " ")
      .replace(/\s+(?:official\s+)?(?:chords?|tabs?|tab|ukulele\s+chords?|bass\s+tab|pro)\s*$/i, "")
      .trim();
  }

  function readSongArtist() {
    const heading = document.querySelector("h1");
    const nearbyArtists = Array.from(heading?.parentElement?.querySelectorAll('a[href*="/artist/"]') || [])
      .map((link) => link.textContent?.trim())
      .filter(Boolean);

    if (nearbyArtists.length) {
      return nearbyArtists.join(" ");
    }

    return document.querySelector('a[href*="/artist/"]')?.textContent?.trim() || "";
  }

  function readSongFormat() {
    const slug = location.pathname.split("/").filter(Boolean).pop() || "";
    const match = slug.match(/-(ukulele-chords|bass-tab|drum-tab|drums|tabs|tab|chords|bass)-\d+$/i);
    const rawFormat = match ? match[1].toLowerCase() : "";

    switch (rawFormat) {
      case "chords":
        return "chords";
      case "ukulele-chords":
        return "ukulele";
      case "bass-tab":
      case "bass":
        return "bass";
      case "drum-tab":
      case "drums":
        return "drums";
      case "tabs":
      case "tab":
        return "tabs";
      default:
        return "unknown";
    }
  }

  function shiftTranspose(delta) {
    if (!state.song) {
      return;
    }

    if (syncPageTranspose(delta)) {
      return;
    }

    state.transposeSteps = normalizeTransposeSteps(state.transposeSteps + delta);
    state.manualFontSize = null;
    updateLabel();

    if (state.active) {
      renderPrompter();
    }

    flashHint("Extension transpose " + formatTransposeDisplay(state.transposeSteps) + ".");
  }

  function resetTranspose() {
    if (!state.song) {
      return;
    }

    if (syncPageTranspose(-state.transposeSteps)) {
      return;
    }

    if (state.transposeSteps === 0) {
      if (state.song) {
        flashHint("Extension transpose already reset.");
      }

      return;
    }

    state.transposeSteps = 0;
    state.manualFontSize = null;
    updateLabel();

    if (state.active) {
      renderPrompter();
    }

    flashHint("Extension transpose reset.");
  }

  function normalizeTransposeSteps(value) {
    const normalized = value % 12;
    return Object.is(normalized, -0) ? 0 : normalized;
  }

  function formatTransposeDisplay(steps) {
    if (!steps) {
      return "0";
    }

    return steps > 0 ? "+" + steps : String(steps);
  }

  function getRenderedLineLength(line) {
    if (!line?.segments?.length) {
      return 1;
    }

    const renderTransposeSteps = getRenderTransposeSteps();
    const total = line.segments.reduce((length, segment) => {
      if (segment.type === "chord") {
        return length + transposeChordText(segment.text, renderTransposeSteps).length;
      }

      return length + segment.text.length;
    }, 0);

    return Math.max(1, total);
  }

  function getRenderTransposeSteps() {
    return hasPageTransposeControls() ? 0 : state.transposeSteps;
  }

  function syncPageTranspose(delta) {
    if (!delta || !hasPageTransposeControls()) {
      return false;
    }

    const button = findPageTransposeButton(delta > 0 ? "up" : "down");

    if (!button) {
      return false;
    }

    for (let step = 0; step < Math.abs(delta); step += 1) {
      button.click();
    }

    const nextSteps = readPageTransposeSteps();

    if (nextSteps !== null) {
      state.transposeSteps = nextSteps;
      updateLabel();
    }

    state.manualFontSize = null;
    scheduleRefresh("page-transpose");
    window.setTimeout(() => refreshFromPage("page-transpose-settle"), 220);
    flashHint("Page transpose " + formatTransposeDisplay(state.transposeSteps) + ".");
    return true;
  }

  function hasPageTransposeControls() {
    return Boolean(findPageTransposeButton("up") && findPageTransposeButton("down"));
  }

  function findPageTransposeButton(direction) {
    const label = direction === "up" ? "Transpose Up" : "Transpose Down";
    return document.querySelector('button[aria-label="' + label + '"]');
  }

  function readPageTransposeSteps() {
    const control =
      findPageTransposeButton("up")?.closest('[role="spinbutton"]') ||
      findPageTransposeButton("down")?.closest('[role="spinbutton"]');

    if (!control) {
      return null;
    }

    const ariaRaw = control.getAttribute("aria-valuenow");
    const ariaValue = ariaRaw === null ? Number.NaN : Number(ariaRaw);

    if (Number.isFinite(ariaValue)) {
      return normalizeTransposeSteps(ariaValue);
    }

    const text = control.textContent || "";
    const match = text.match(/([+-]?\d+)/);
    return match ? normalizeTransposeSteps(Number(match[1])) : 0;
  }

  function transposeChordText(chordText, steps) {
    if (!steps) {
      return chordText;
    }

    const match = String(chordText || "").match(/^([A-G](?:#|b)?)([^/]*)(?:\/([A-G](?:#|b)?))?$/);

    if (!match) {
      return chordText;
    }

    const [, root, suffix = "", bass] = match;
    const nextRoot = transposeNote(root, steps);
    const nextBass = bass ? transposeNote(bass, steps) : "";

    if (!nextRoot) {
      return chordText;
    }

    return nextRoot + suffix + (nextBass ? "/" + nextBass : "");
  }

  function transposeNote(note, steps) {
    const normalized = normalizeNoteName(note);
    const startIndex = SHARP_NOTES.indexOf(normalized);

    if (startIndex < 0) {
      return note;
    }

    const nextIndex = (startIndex + steps + SHARP_NOTES.length * 8) % SHARP_NOTES.length;
    const next = SHARP_NOTES[nextIndex];
    const prefersFlat = /b/.test(note);

    return prefersFlat ? FLAT_NOTES[next] || next : next;
  }

  function normalizeNoteName(note) {
    if (!note) {
      return "";
    }

    const normalized = note[0].toUpperCase() + note.slice(1);
    return ENHARMONIC_NOTES[normalized] || normalized;
  }

  function flashHint(message) {
    if (!state.ui.hint) {
      return;
    }

    state.ui.hint.hidden = false;
    state.ui.hint.textContent = message;
    state.ui.hint.dataset.flash = "true";

    clearTimeout(flashHint.timeoutId);
    flashHint.timeoutId = window.setTimeout(() => {
      state.ui.hint.hidden = true;
      state.ui.hint.textContent = "";
      delete state.ui.hint.dataset.flash;
    }, FLASH_HINT_DURATION);
  }

  function isEditable(target) {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(target.closest("input, textarea, [contenteditable='true'], [role='textbox']"));
  }

  function debounce(callback, wait) {
    let timeoutId = 0;

    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => callback(...args), wait);
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function roundTo(value, precision) {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
  }

  function syncOverlayChrome() {
    renderDiagrams();
    const topPadding = getTopPadding();
    const bottomPadding = getBottomPadding();
    const diagramsSupported = Boolean(state.song?.supportsDiagrams);

    state.ui.root.style.setProperty("--ugtp-stage-top", topPadding + "px");
    state.ui.root.style.setProperty("--ugtp-stage-bottom", bottomPadding + "px");
    state.ui.diagramToggle.setAttribute("aria-pressed", String(diagramsSupported && state.showDiagrams));
    state.ui.diagramToggle.disabled = !diagramsSupported;
    state.ui.diagramToggle.setAttribute("aria-disabled", String(!diagramsSupported));
    state.ui.diagramToggle.dataset.tooltip = diagramsSupported
      ? "Toggle chord shapes"
      : "Chord shapes only work on standard guitar chord charts";
    state.ui.diagramToggle.setAttribute(
      "aria-label",
      diagramsSupported ? "Toggle chord shapes" : "Chord shapes only work on standard guitar chord charts"
    );
    if (state.ui.transposeValue) {
      state.ui.transposeValue.textContent = formatTransposeDisplay(state.transposeSteps);
    }
    if (state.ui.transposeReset) {
      state.ui.transposeReset.setAttribute(
        "aria-label",
        state.transposeSteps === 0
          ? "Transpose is currently reset"
          : "Reset extension transposition from " + formatTransposeDisplay(state.transposeSteps)
      );
    }
    renderInfoPanel();
  }

  function renderInfoPanel(layout) {
    if (!state.ui.infoFields) {
      return;
    }

    const computedFontSize =
      layout?.fontSize ??
      Number.parseFloat(getComputedStyle(state.ui.root).getPropertyValue("--ugtp-font-size")) ??
      SETTINGS.minFontSize;
    const columnCount = layout?.columns ?? Math.max(1, state.ui.columns.childElementCount || 1);
    const shapesEnabled = shouldShowDiagramColumn();

    if (state.ui.infoFields.key) {
      state.ui.infoFields.key.textContent = formatTransposeDisplay(state.transposeSteps);
    }

    if (state.ui.infoFields.size) {
      state.ui.infoFields.size.textContent = roundTo(computedFontSize, 1) + "px";
    }

    if (state.ui.infoFields.columns) {
      state.ui.infoFields.columns.textContent = String(columnCount);
    }

    if (state.ui.infoFields.shapes) {
      state.ui.infoFields.shapes.textContent = !state.song
        ? "Off"
        : !state.song.supportsDiagrams
          ? "Standard guitar only"
          : shapesEnabled
            ? "On"
            : "Off";
    }

    if (state.ui.infoFields.appearance) {
      state.ui.infoFields.appearance.textContent =
        state.theme.preference === "system"
          ? "Following system " + state.theme.resolved + " mode."
          : "Override active: " + capitalizeWord(state.theme.preference) + " mode.";
    }

    if (state.ui.infoFields.palette) {
      state.ui.infoFields.palette.textContent = PALETTE_LABELS[state.palette.value] + " selected.";
    }

    if (state.ui.infoFields.defaultInstrument) {
      state.ui.infoFields.defaultInstrument.textContent =
        "New searches open on " + (SEARCH_FORMATS[state.settings.defaultInstrument]?.label || SEARCH_FORMATS.chords.label) + ".";
    }
  }

  function capitalizeWord(value) {
    if (!value) {
      return "";
    }

    return value[0].toUpperCase() + value.slice(1);
  }

  function getTopPadding() {
    return SETTINGS.topStageInset;
  }

  function getBottomPadding() {
    return Math.max(
      measureBottomInset(state.ui.label),
      measureBottomInset(state.ui.dock)
    );
  }

  function createIconButtonMarkup(action, label, icon, className = "ugtp-icon-button", pressedValue = null) {
    const pressedAttribute = pressedValue === null ? "" : ' aria-pressed="' + pressedValue + '"';
    return (
      '<button class="' +
      className +
      '" type="button" data-action="' +
      action +
      '" aria-label="' +
      label +
      '"' +
      ' data-tooltip="' +
      label +
      '"' +
      pressedAttribute +
      '><span class="ugtp-icon" aria-hidden="true">' +
      icon +
      "</span></button>"
    );
  }

  function measureTopInset(element) {
    if (!element || element.hidden) {
      return 0;
    }

    const rect = element.getBoundingClientRect();

    if (!rect.height && !rect.width) {
      return 0;
    }

    return Math.ceil(rect.bottom + SETTINGS.railGap);
  }

  function measureBottomInset(element) {
    if (!element || element.hidden) {
      return 0;
    }

    const rect = element.getBoundingClientRect();

    if (!rect.height && !rect.width) {
      return 0;
    }

    return Math.ceil(window.innerHeight - rect.top + SETTINGS.railGap);
  }

  function renderDiagrams(layout) {
    const diagrams = state.song?.diagrams || [];
    const shouldShow = shouldShowDiagramColumn();

    state.ui.diagrams.hidden = !shouldShow;
    state.ui.diagrams.textContent = "";

    if (!shouldShow) {
      state.ui.diagrams.remove();
      return;
    }

    const columns = state.ui.columns.querySelectorAll(".ugtp-column");
    const hostColumn = columns[columns.length - 1] || state.ui.columns;

    if (state.ui.diagrams.parentElement !== hostColumn) {
      hostColumn.appendChild(state.ui.diagrams);
    }

    const heading = document.createElement("div");
    heading.className = "ugtp-diagrams-heading";
    heading.textContent = "Chord Shapes";
    state.ui.diagrams.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "ugtp-diagrams-grid";
    state.ui.diagrams.appendChild(grid);

    diagrams.forEach((diagramName) => {
      const displayName = transposeChordText(diagramName, getRenderTransposeSteps());
      const fingering = buildDiagramFingering(displayName);

      if (!fingering) {
        return;
      }

      const card = document.createElement("div");
      card.className = "ugtp-diagram-card";

      const name = document.createElement("div");
      name.className = "ugtp-diagram-name";
      name.textContent = displayName;

      const svg = createChordDiagramSvg(fingering, displayName);

      card.appendChild(name);
      card.appendChild(svg);
      grid.appendChild(card);
    });
  }

  function diagramSignature(diagrams = []) {
    return diagrams.join("|");
  }

  function collectChordNames(lines) {
    const names = [];
    const seen = new Set();

    lines.forEach((line) => {
      line.segments.forEach((segment) => {
        if (segment.type !== "chord") {
          return;
        }

        const symbol = String(segment.text || "").trim();

        if (!symbol || seen.has(symbol)) {
          return;
        }

        seen.add(symbol);
        names.push(symbol);
      });
    });

    return names;
  }

  function buildDiagramFingering(chordName) {
    const parsed = parseChordForDiagram(chordName);

    if (!parsed) {
      return null;
    }

    const exact = EXACT_DIAGRAMS[parsed.lookupName];

    if (exact) {
      return normalizeDiagramDefinition(exact);
    }

    const movable = MOVABLE_DIAGRAMS[parsed.family]?.[parsed.root];

    if (!movable) {
      if (parsed.family === "sus2" || parsed.family === "add9") {
        return buildDiagramFingering(parsed.root + (parsed.isMinorLike ? "m" : ""));
      }

      return buildDiagramFingering(parsed.root + (parsed.isMinorLike ? "m" : ""));
    }

    return createMovableFingering(movable.template, movable.fret);
  }

  function parseChordForDiagram(chordName) {
    const match = String(chordName || "").match(/^([A-G](?:#|b)?)([^/]*)/);

    if (!match) {
      return null;
    }

    const root = DIAGRAM_NOTE_ALIASES[match[1]] || match[1];
    const suffix = match[2] || "";
    const lower = suffix.toLowerCase();
    let family = "major";

    if (/maj7/.test(lower)) {
      family = "maj7";
    } else if (/m7|min7/.test(lower)) {
      family = "minor7";
    } else if (/^m(?!aj)|min/.test(lower)) {
      family = "minor";
    } else if (/sus2/.test(lower)) {
      family = "sus2";
    } else if (/sus4|sus/.test(lower)) {
      family = "sus4";
    } else if (/add9/.test(lower)) {
      family = "add9";
    } else if (/7/.test(lower)) {
      family = "dominant7";
    }

    return {
      family,
      isMinorLike: family === "minor" || family === "minor7",
      lookupName: root + normalizedDiagramSuffix(family),
      root
    };
  }

  function normalizedDiagramSuffix(family) {
    switch (family) {
      case "minor":
        return "m";
      case "minor7":
        return "m7";
      case "dominant7":
        return "7";
      case "maj7":
        return "maj7";
      case "sus2":
        return "sus2";
      case "sus4":
        return "sus4";
      case "add9":
        return "add9";
      default:
        return "";
    }
  }

  function normalizeDiagramDefinition(definition) {
    const frets = definition.frets.slice();
    const numericFrets = frets.filter((fret) => typeof fret === "number" && fret > 0);
    const minFret = numericFrets.length ? Math.min(...numericFrets) : 1;
    const hasOpenStrings = frets.includes(0);
    const baseFret = hasOpenStrings || minFret <= 1 ? 1 : minFret;

    return {
      barres: (definition.barres || []).map((barre) => ({ ...barre })),
      baseFret,
      frets
    };
  }

  function createMovableFingering(template, fret) {
    const shapes = {
      "A-7": { frets: ["x", fret, fret + 2, fret, fret + 2, fret], barres: [{ fromString: 5, toString: 1, fret }] },
      "A-major": { frets: ["x", fret, fret + 2, fret + 2, fret + 2, fret], barres: [{ fromString: 5, toString: 1, fret }] },
      "A-maj7": { frets: ["x", fret, fret + 2, fret + 1, fret + 2, fret], barres: [{ fromString: 5, toString: 1, fret }] },
      "A-minor": { frets: ["x", fret, fret + 2, fret + 2, fret + 1, fret], barres: [{ fromString: 5, toString: 1, fret }] },
      "A-m7": { frets: ["x", fret, fret + 2, fret, fret + 1, fret], barres: [{ fromString: 5, toString: 1, fret }] },
      "A-sus4": { frets: ["x", fret, fret + 2, fret + 2, fret + 3, fret], barres: [{ fromString: 5, toString: 1, fret }] },
      "E-7": { frets: [fret, fret + 2, fret, fret + 1, fret, fret], barres: [{ fromString: 6, toString: 1, fret }] },
      "E-major": { frets: [fret, fret + 2, fret + 2, fret + 1, fret, fret], barres: [{ fromString: 6, toString: 1, fret }] },
      "E-maj7": { frets: [fret, fret + 2, fret + 1, fret + 1, fret, fret], barres: [{ fromString: 6, toString: 1, fret }] },
      "E-minor": { frets: [fret, fret + 2, fret + 2, fret, fret, fret], barres: [{ fromString: 6, toString: 1, fret }] },
      "E-m7": { frets: [fret, fret + 2, fret, fret, fret, fret], barres: [{ fromString: 6, toString: 1, fret }] },
      "E-sus4": { frets: [fret, fret + 2, fret + 2, fret + 2, fret, fret], barres: [{ fromString: 6, toString: 1, fret }] }
    };

    return normalizeDiagramDefinition(shapes[template]);
  }

  function createChordDiagramSvg(fingering, chordName) {
    const ns = "http://www.w3.org/2000/svg";
    const width = 126;
    const height = 148;
    const titleHeight = 0;
    const padding = { top: 20 + titleHeight, right: 20, bottom: 18, left: 20 };
    const numStrings = 6;
    const numFrets = 5;
    const diagramWidth = width - padding.left - padding.right;
    const diagramHeight = height - padding.top - padding.bottom;
    const stringSpacing = diagramWidth / (numStrings - 1);
    const fretSpacing = diagramHeight / numFrets;
    const baseFret = fingering.baseFret || 1;
    const colors = getDiagramColors();

    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("aria-label", chordName + " chord diagram");
    svg.setAttribute("class", "ugtp-diagram-svg");
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));

    const getStringX = (stringNum) => padding.left + (numStrings - stringNum) * stringSpacing;
    const getFretY = (fret) => {
      if (fret === 0) {
        return padding.top - 13;
      }

      return padding.top + (fret - baseFret + 0.5) * fretSpacing;
    };

    for (let fretIndex = 0; fretIndex <= numFrets; fretIndex += 1) {
      const line = document.createElementNS(ns, "line");
      line.setAttribute("x1", String(padding.left));
      line.setAttribute("x2", String(padding.left + diagramWidth));
      line.setAttribute("y1", String(padding.top + fretIndex * fretSpacing));
      line.setAttribute("y2", String(padding.top + fretIndex * fretSpacing));
      line.setAttribute("stroke", colors.grid);
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("stroke-width", fretIndex === 0 && baseFret === 1 ? "4.2" : "1.9");
      svg.appendChild(line);
    }

    for (let stringIndex = 1; stringIndex <= numStrings; stringIndex += 1) {
      const line = document.createElementNS(ns, "line");
      line.setAttribute("x1", String(getStringX(stringIndex)));
      line.setAttribute("x2", String(getStringX(stringIndex)));
      line.setAttribute("y1", String(padding.top));
      line.setAttribute("y2", String(padding.top + diagramHeight));
      line.setAttribute("stroke", colors.grid);
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("stroke-width", "1.8");
      svg.appendChild(line);
    }

    if (baseFret > 1) {
      const label = document.createElementNS(ns, "text");
      label.setAttribute("x", String(padding.left + diagramWidth + 9));
      label.setAttribute("y", String(padding.top + fretSpacing * 0.86));
      label.setAttribute("fill", colors.label);
      label.setAttribute("font-size", "13");
      label.setAttribute("font-weight", "700");
      label.textContent = String(baseFret) + "fr";
      svg.appendChild(label);
    }

    (fingering.barres || []).forEach((barre) => {
      const rect = document.createElementNS(ns, "rect");
      const x1 = getStringX(barre.fromString);
      const x2 = getStringX(barre.toString);
      const y = getFretY(barre.fret);
      rect.setAttribute("x", String(Math.min(x1, x2) - 6));
      rect.setAttribute("y", String(y - 7));
      rect.setAttribute("width", String(Math.abs(x2 - x1) + 12));
      rect.setAttribute("height", "14");
      rect.setAttribute("rx", "7");
      rect.setAttribute("fill", colors.fill);
      rect.setAttribute("opacity", "0.98");
      svg.appendChild(rect);
    });

    fingering.frets.forEach((fret, index) => {
      const stringNum = 6 - index;
      const x = getStringX(stringNum);

      if (fret === "x") {
        const markA = document.createElementNS(ns, "line");
        markA.setAttribute("x1", String(x - 5));
        markA.setAttribute("y1", String(padding.top - 16));
        markA.setAttribute("x2", String(x + 5));
        markA.setAttribute("y2", String(padding.top - 6));
        markA.setAttribute("stroke", colors.marker);
        markA.setAttribute("stroke-width", "2");
        markA.setAttribute("stroke-linecap", "round");
        svg.appendChild(markA);

        const markB = document.createElementNS(ns, "line");
        markB.setAttribute("x1", String(x - 5));
        markB.setAttribute("y1", String(padding.top - 6));
        markB.setAttribute("x2", String(x + 5));
        markB.setAttribute("y2", String(padding.top - 16));
        markB.setAttribute("stroke", colors.marker);
        markB.setAttribute("stroke-width", "2");
        markB.setAttribute("stroke-linecap", "round");
        svg.appendChild(markB);
        return;
      }

      if (fret === 0) {
        const circle = document.createElementNS(ns, "circle");
        circle.setAttribute("cx", String(x));
        circle.setAttribute("cy", String(padding.top - 11));
        circle.setAttribute("r", "4.4");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", colors.marker);
        circle.setAttribute("stroke-width", "2");
        svg.appendChild(circle);
        return;
      }

      const circle = document.createElementNS(ns, "circle");
      circle.setAttribute("cx", String(x));
      circle.setAttribute("cy", String(getFretY(fret)));
      circle.setAttribute("r", "5.8");
      circle.setAttribute("fill", colors.fill);
      svg.appendChild(circle);
    });

    return svg;
  }

  function getDiagramColors() {
    const styles = getComputedStyle(state.ui.root);

    return {
      fill: readCssThemeValue(styles, "--ugtp-accent", "#4a7c59"),
      grid: readCssThemeValue(styles, "--ugtp-muted-soft", "#7d7365"),
      label: readCssThemeValue(styles, "--ugtp-text", "#2f3b31"),
      marker: readCssThemeValue(styles, "--ugtp-accent", "#4a7c59")
    };
  }

  function readCssThemeValue(styles, name, fallback) {
    const value = styles.getPropertyValue(name).trim();
    return value || fallback;
  }

  init();
})();
