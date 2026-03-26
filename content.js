const HIDDEN_SELECTORS = [
  "ytd-menu-renderer #flexible-item-buttons",
  "ytd-menu-renderer #button-shape",
  'ytd-menu-renderer button[aria-label="Teilen"]',
  'ytd-masthead ytd-button-renderer:has(button[aria-label="Erstellen"])',
  "#voice-search-button",
  'ytd-notification-topbar-button-renderer',
  "ytd-comments-header-renderer",
  "ytd-mini-guide-renderer",
  "#frosted-glass",
  "ytd-statement-banner-renderer",
  "ytd-feed-filter-chip-bar-renderer",
  "yt-related-chip-cloud-renderer",
  "#guide-button",
  "#guide",
];

const STYLED_SELECTORS = [
  'button[aria-label="Search"] { background-color: #121212 !important; }',
  'ytd-app[guide-persistent-and-visible] ytd-page-manager.ytd-app { margin-left: 0 !important; }',
  'ytd-masthead { background-color: #0F0F0F !important; }',
  'ytd-page-manager { padding-left: var(--ytd-rich-grid-gutter-margin, 48px) !important; padding-right: var(--ytd-rich-grid-gutter-margin, 48px) !important; }',
];

const CSS =
  HIDDEN_SELECTORS.join(",\n") +
  "\n{ display: none !important; }\n" +
  STYLED_SELECTORS.join("\n");

function apply(enabled) {
  let el = document.getElementById("zentube-hide");
  if (enabled && !el) {
    el = document.createElement("style");
    el.id = "zentube-hide";
    el.textContent = CSS;
    document.documentElement.appendChild(el);
  } else if (!enabled && el) {
    el.remove();
  }
}

chrome.storage.local.get("enabled", ({ enabled = true }) => apply(enabled));

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "toggle") apply(msg.enabled);
});
