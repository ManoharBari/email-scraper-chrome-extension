// Register context menu for scanning selected text for emails.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "scanSelectedText",
    title: "Scan selected text for emails",
    contexts: ["selection"],
  });
});

// Listen for context menu clicks.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "scanSelectedText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scanSelectedText,
      args: [info.selectionText, tab.url],
    });
  }
});

// Function injected into the page to scan selected text.
function scanSelectedText(selectedText, pageUrl) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
  const foundEmails = selectedText.match(emailRegex);
  if (foundEmails) {
    chrome.runtime.sendMessage({
      action: "storeEmails",
      emails: foundEmails,
      url: pageUrl,
    });
  }
}

// Listen for messages from content scripts or context menu
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "storeEmails") {
    storeEmails(message.emails, message.url);
  }
});

// Function to store emails in chrome.storage.sync with duplicate prevention.
function storeEmails(emails, sourceUrl) {
  chrome.storage.sync.get({ collectedEmails: [] }, (data) => {
    let stored = data.collectedEmails;
    const timestamp = new Date().toISOString();
    emails.forEach((email) => {
      // Check if email is already stored
      if (!stored.some((item) => item.email === email)) {
        stored.push({ email, source: sourceUrl, timestamp });
      }
    });
    chrome.storage.sync.set({ collectedEmails: stored }, () => {
      // Update badge count
      chrome.action.setBadgeText({ text: String(stored.length) });
      chrome.action.setBadgeBackgroundColor({ color: "#4688F1" });
    });
  });
}
