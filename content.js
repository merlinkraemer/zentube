const HIDDEN_SELECTORS = [
  "ytd-menu-renderer #flexible-item-buttons",
  "ytd-menu-renderer #button-shape",
  'ytd-menu-renderer button[aria-label="Teilen"]',
  'ytd-masthead ytd-button-renderer:has(button[aria-label="Erstellen"])',
  "#voice-search-button",
  "yt-related-chip-cloud-renderer",
  "ytd-comments-header-renderer",
  "ytd-mini-guide-renderer",
  "#frosted-glass",
  "ytd-statement-banner-renderer",
];

const STYLED_SELECTORS = [
  'button[aria-label="Search"] { background-color: #121212 !important; }',
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
