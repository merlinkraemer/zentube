const toggle = document.getElementById("toggle");

chrome.storage.local.get("enabled", ({ enabled = true }) => {
  toggle.checked = enabled;
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "toggle", enabled });
    }
  });
});
