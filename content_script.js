// Listen for messages to scan the entire page when activated from the popup.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scanPage") {
    const emails = scanPageForEmails();
    // Send found emails back to background for storage.
    chrome.runtime.sendMessage({
      action: "storeEmails",
      emails: emails,
      url: window.location.href,
    });
    sendResponse({ count: emails.length });
  }
});

// Function to scan the page content using regex.
function scanPageForEmails() {
  const bodyText = document.body.innerText;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
  let foundEmails = bodyText.match(emailRegex) || [];
  // Remove duplicate emails from this scan
  foundEmails = Array.from(new Set(foundEmails));
  return foundEmails;
}
