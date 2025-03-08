# Email Scraper Chrome Extension

## Overview

The **Email Scraper Chrome Extension** allows users to extract email addresses from any webpage quickly and efficiently. This tool is designed for marketers, recruiters, and researchers who need to gather email contacts with ease.

## Features

- Extracts all email addresses from the currently opened webpage.
- Export collected emails to a CSV file.
- Displays extracted emails in a clean and user-friendly interface.
- Allows users to copy the extracted emails with a single click.
- Lightweight and fast performance.
- Works on most websites.

## Installation

1. **Download or Clone the Repository**
   ```sh
   git clone https://github.com/ManoharBari/email-scraper-chrome-extension.git
   ```
2. **Open Chrome and Navigate to Extensions Page**
   - Go to `chrome://extensions/` in your browser.
   - Enable **Developer Mode** (toggle switch in the top right corner).
3. **Load the Extension**
   - Click on **Load unpacked**.
   - Select the downloaded/cloned project folder.
   - The extension should now appear in your Chrome toolbar.

## Usage

1. Navigate to any webpage where you want to scrape emails.
2. Click on the **Email Scraper Extension** icon in the Chrome toolbar.
3. The extension will scan the page and list all extracted emails.

## Permissions

This extension requires the following permissions:

- **Active Tab**: To scan the content of the currently open webpage.
- **Storage**: To store user preferences if needed.

## Technologies Used

- **JavaScript** (for extracting emails from the DOM)
- **HTML/CSS** (for the extension popup UI)
- **Chrome Extension APIs** (for page interaction and data handling)

## Development & Contribution

1. **Modify the Code**: If you want to improve the extension, edit the files inside the `src` directory.
2. **Test Locally**: Reload the unpacked extension in Chrome after making changes.
3. **Submit a Pull Request**: If you have improvements, feel free to submit a PR.