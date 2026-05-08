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

## Common Commands

```bash
# Start application
docker-compose up

# Start in background
docker-compose up -d

# Stop application
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart backend

# Stop and remove all data
docker-compose down -v
```

## Troubleshooting

**Orbstack not running?**
→ Launch OrbStack from Applications folder, wait 30 seconds

**Port already in use?**
→ Change ports in `docker-compose.yml` or close other apps

**Need more help?**
→ Check [FAQ.md](docs/FAQ.md) or [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## File Format Guide

### Expected Format: YYYYMMDD_HHMMSS.ext

| Format | Example | ✅ Valid | ❌ Invalid |
|--------|---------|---------|-----------|
| Standard | `20260507_212000.jpg` | ✓ | |
| With suffix | `20260507_212000 (1).jpg` | | ✗ |
| Edited | `20260507_212000_edited.jpg` | | ✗ |
| Old photo | `DSC_0001.jpg` | | ✗ |
| Android | `IMG-20260507-WA0001.jpg` | | ✗ |

## Architecture

```
Frontend (React + Material UI)
    ↓
Backend API (Node.js + Express)
    ↓
SQLite Database (Local caching)
```

All runs in Docker containers via Orbstack. No dependencies on your Mac!

## Privacy & Security

🔒 **Your data is safe:**
- All processing happens 100% locally and offline
- No APIs, no logins, no cloud uploads
- You can delete everything anytime

## Support the Project

- ⭐ Star on GitHub
- 🐛 Report bugs with details
- 💡 Suggest improvements
- 📝 Contribute code
- 📢 Share with others

---

**Happy validating! 🔎**

For questions or issues, check the documentation folder or GitHub issues.
