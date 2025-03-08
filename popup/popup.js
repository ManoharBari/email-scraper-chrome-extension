// On DOM load, retrieve stored emails and update the UI.
document.addEventListener("DOMContentLoaded", () => {
  loadEmails();
  document
    .getElementById("scan-page")
    .addEventListener("click", scanCurrentPage);
  document.getElementById("export-csv").addEventListener("click", exportCSV);
  document
    .getElementById("clear-history")
    .addEventListener("click", clearHistory);
});

function loadEmails() {
  chrome.storage.sync.get({ collectedEmails: [] }, (data) => {
    const emailList = document.getElementById("emails");
    emailList.innerHTML = "";
    data.collectedEmails.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.email}</strong><br><small>Source: ${item.source}<br>Time: ${item.timestamp}</small>`;
      emailList.appendChild(li);
    });
  });
}

function scanCurrentPage() {
  // Execute the content script's scan function.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scanPage" }, (response) => {
      if (response && response.count !== undefined) {
        alert(`Found ${response.count} email(s) on this page.`);
        loadEmails();
      } else {
        alert("No emails found or unable to scan page.");
      }
    });
  });
}

function exportCSV() {
  chrome.storage.sync.get({ collectedEmails: [] }, (data) => {
    if (data.collectedEmails.length === 0) {
      alert("No emails to export.");
      return;
    }
    let csvContent = "Email,Source URL,Timestamp\n";
    data.collectedEmails.forEach((item) => {
      csvContent += `"${item.email}","${item.source}","${item.timestamp}"\n`;
    });
    // Create a downloadable CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "collected_emails.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
}

function clearHistory() {
  if (confirm("Are you sure you want to clear all stored emails?")) {
    chrome.storage.sync.set({ collectedEmails: [] }, () => {
      chrome.action.setBadgeText({ text: "" });
      loadEmails();
    });
  }
}
