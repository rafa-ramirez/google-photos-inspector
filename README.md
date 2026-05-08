# 🔎 Google Photos Inspector

A powerful, **privacy-first** tool to validate and analyze your local Google Takeout backups with advanced metadata checking. 

**[🚀 Open the App →](https://rafa-ramirez.github.io/google-photos-inspector/)**

## Why use this tool?

Google Takeout often gives you a mess of files. This tool helps you:
- **Validate filenames** against the standard format: `YYYYMMDD_HHMMSS.ext`
- **Detect missing location data** in Google's JSON sidecar files.
- **Pair media with metadata** automatically in your browser.
- **100% Privacy**: No files are ever uploaded. Everything happens in your browser's memory.

## 🚀 Get Started (No Installation!)

1.  **Open the Tool**: Visit [rafa-ramirez.github.io/google-photos-inspector/](https://rafa-ramirez.github.io/google-photos-inspector/)
2.  **Select Folder**: Click "Choose Folder" and select your extracted Google Takeout folder.
3.  **Analyze**: The tool will instantly scan filenames and JSON metadata.
4.  **Fix**: Use the direct Google Photos links to find and fix missing location data or rename files.

## Key Features

### 📋 Local Takeout Analyzer
- **Analyze folders** entirely offline in your browser.
- **Identify issues**: suffixes (e.g., `(1)`), duplicates, wrong formats, `_edited` tags.
- **Direct Google Photos links** for easy access to the original photo for fixing.
- **Fast execution** – only parses filenames and JSON metadata, avoiding heavy image reading.

### 🎨 Modern User Interface
- **Material Design 3** - Beautiful, responsive UI.
- **Real-time results** - See issues as they're found.
- **Export options** - Download your report as JSON or CSV.

## Privacy & Security

✅ **Your data stays 100% on your computer**
- This is a **serverless** application. 
- When the browser asks to "Upload", it is only granting the app permission to **read** the files locally.
- No data is ever sent to GitHub, Google, or any external server.

## File Format Reference

The tool validates this format: `YYYYMMDD_HHMMSS.ext`

### ✅ Valid Examples
- `20260507_212000.jpg`
- `20230115_143022.mp4`

### ❌ Invalid Examples
- `20260507_212000 (1).jpg` (Has suffix)
- `20260507_212000_edited.jpg` (Has "_edited" suffix)
- `IMG-20260507-WA0001.jpg` (WhatsApp format)

### 🌍 Multi-Language Support
- **English** and **Spanish** are fully supported.
- Use the language toggle in the navigation bar to switch instantly, or visit the `/es` URL directly.

---

**Made with ❤️ for Google Photos enthusiasts**
