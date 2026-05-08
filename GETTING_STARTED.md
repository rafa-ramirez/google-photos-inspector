# 🚀 Getting Started
 
 This tool is now a **purely static web application**. This means you don't need to install anything or run any commands.
 
 ## 1. Open the Tool
 
 Simply visit the live application:
 **[https://rafa-ramirez.github.io/google-photos-inspector/](https://rafa-ramirez.github.io/google-photos-inspector/)**
 
 ## 2. Prepare your Data
 
 1.  Go to [Google Takeout](https://takeout.google.com/).
 2.  Select **only** "Google Photos".
 3.  Download and extract the resulting `.zip` file on your computer.
 
 ## 3. Analyze your Photos
 
 1.  Click the **"Go to Analyzer"** button.
 2.  Click **"Choose Folder"**.
 3.  Select the folder named `Google Photos` (or a specific subfolder) from your extracted Takeout.
 4.  The tool will automatically scan for:
     -   **Filename issues**: Duplicates, wrong formats, or `_edited` versions.
     -   **Metadata issues**: Missing location data in the accompanying `.json` files.
 
 ## 4. Review and Fix
 
 -   Items with issues will appear in a list.
 -   Click the **"View in Google Photos"** link to find the original photo and fix its location or download it.
 -   You can export the list as **CSV** or **JSON** for further processing.
 
 ---
 
 ### 🔒 Privacy Note
 Analysis happens 100% in your browser. Your photos never leave your computer.

## Key Features

✅ **Easy Setup** - No configuration required  
✅ **No Installation** - Everything runs in your browser  
✅ **Modern UI** - Material Design 3  
✅ **Detailed Reports** - Export JSON/CSV  
✅ **Privacy First** - All processing is 100% offline, no data sharing  
✅ **Free** - Open source

## Documentation

| Document | Purpose |
|----------|---------|
| [INSTALLATION.md](docs/INSTALLATION.md) | Detailed installation instructions |
| [USAGE.md](docs/USAGE.md) | Complete feature guide |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common issues and fixes |
| [FAQ.md](docs/FAQ.md) | Frequently asked questions |

## 🌍 Multi-Language Support

The application fully supports English and Spanish.
- Use the language toggle in the top navigation bar.
- Or visit directly: `https://rafa-ramirez.github.io/google-photos-inspector/#/es`

## File Format Guide

### Expected Format: YYYYMMDD_HHMMSS.ext

| Format | Example | ✅ Valid | ❌ Invalid |
|--------|---------|---------|-----------|
| Standard | `20260507_212000.jpg` | ✓ | |
| With suffix | `20260507_212000 (1).jpg` | | ✗ |
| Edited | `20260507_212000_edited.jpg` | | ✗ |
| Old photo | `DSC_0001.jpg` | | ✗ |
| Android | `IMG-20260507-WA0001.jpg` | | ✗ |

## Privacy & Security

🔒 **Your data is safe:**
- All processing happens 100% locally and offline in your browser's memory.
- No APIs, no logins, no cloud uploads.
- We never see your files.

## Support the Project

- ⭐ Star on GitHub
- 🐛 Report bugs with details
- 💡 Suggest improvements
- 📝 Contribute code
- 📢 Share with others

---

**Happy validating! 🔎**

For questions or issues, check the documentation folder or GitHub issues.
