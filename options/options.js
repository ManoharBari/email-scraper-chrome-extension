document.getElementById("clear-history").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all stored emails?")) {
    chrome.storage.sync.set({ collectedEmails: [] }, () => {
      chrome.action.setBadgeText({ text: "" });
      alert("Stored emails cleared.");
    });
  }
});
