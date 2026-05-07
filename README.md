# 🔎 Google Photos Inspector

A powerful tool to validate and analyze your local Google Takeout backups with advanced metadata checking. Built with React, Node.js, and containerized with Orbstack—**no installation needed on your Mac!**

**[⚡ Quick Start →](GETTING_STARTED.md) | [📖 Full Docs →](docs/USAGE.md)**

## Features

### 📋 Local Takeout Analyzer
- **Analyze Google Takeout folders** entirely offline
- **Validate filenames** against standard format: `YYYYMMDD_HHMMSS.ext`
- **Detect missing location data** in JSON metadata
- **Identify issues**: suffixes, duplicates, wrong formats, parentheses
- **Direct Google Photos links** for easy download and fixing
- **Comprehensive reports** with audit trails
- **Batch processing** for large libraries (gigabytes of data)
- **Fast execution** – only parses filenames and JSON files, avoiding heavy image reading

### 🎨 Modern User Interface
- **Material Design 3** - Beautiful, responsive UI
- **Intuitive workflow** - Minimal learning curve
- **Real-time results** - See issues as they're found
- **Export options** - JSON and CSV formats
- **Mobile-friendly** - Works on tablets too

## 🚀 Get Started in 5 Minutes

### Step 1: Install Orbstack (One-time)
```bash
# Download from: https://orbstack.dev
# Drag to Applications folder
# Launch OrbStack
```

### Step 2: Start the App
```bash
cd /Users/rafa/projects/google-photos-inspector

# Start the application
docker-compose up -d
```

### Step 3: Use the App
Open **http://localhost:3000** → Click "Go to Analyzer" → Start validating!

## 📚 Documentation

| Guide | Purpose |
|-------|---------|
| **[GETTING_STARTED.md](GETTING_STARTED.md)** | 📍 Start here! Overview & quick setup |
| **[docs/USAGE.md](docs/USAGE.md)** | 📖 Complete feature guide |
| **[docs/INSTALLATION.md](docs/INSTALLATION.md)** | 🐳 Detailed Docker/Orbstack setup |
| **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** | 🔧 Common issues & fixes |
| **[docs/FAQ.md](docs/FAQ.md)** | ❓ Questions & answers |

## What's Included

```
google-photos-inspector/
├── 🔙 backend/              Node.js + Express API
│   ├── src/
│   │   ├── routes/         Analysis endpoints
│   │   └── services/       Database, EXIF/JSON processing
│   └── Dockerfile
├── 🎨 frontend/            React + Material Design 3 UI
│   ├── src/
│   │   ├── pages/         Analyzer, Results
│   │   ├── components/    Navigation, shared UI
│   │   └── App.js
│   └── Dockerfile
├── 📚 docs/                Complete guides
├── 🐳 docker-compose.yml   Container orchestration
└── 📋 .env.example         Configuration template
```

## How It Works

### Local Analyzer
```
You → Select Google Takeout Folder → Auto Analysis
       ↓
   Frontend sends JSON files & media filenames to Backend
       ↓
   Backend pairs each media file with its JSON metadata
       ↓
   Validates filename format & Checks JSON for EXIF coordinates
       ↓
   Displays items with missing locations or filename issues
       ↓
   Export report for manual geolocation / fixing
```

**Identifies:**
- No location in EXIF or metadata
- Location in metadata but not EXIF
- Complete missing location data
- Duplicate files (ending in `(1)`, `(2)`, etc.)
- Edited versions (`_edited` suffix)
- Wrong format (doesn't match `YYYYMMDD_HHMMSS.ext`)

## File Format Reference

The tool validates this format: `YYYYMMDD_HHMMSS.ext`

### ✅ Valid Examples
```
20260507_212000.jpg       May 7, 2026 at 9:20 PM
20230115_143022.mp4       January 15, 2023 at 2:30 PM + 22 seconds
20200630_085500.png       June 30, 2020 at 8:55 AM
20201225_000000.heic      December 25, 2020 at midnight
```

### ❌ Invalid Examples
```
20260507_212000 (1).jpg           Has suffix (space + number)
20260507_212000_edited.jpg        Has "_edited" suffix
photo_20260507_212000.jpg         Has prefix
20260507-212000.jpg               Wrong separator (dash vs underscore)
DSC_0001.jpg                      Completely wrong format
IMG-20260507-WA0001.jpg          WhatsApp format
```

## Requirements

- **Orbstack** - Free lightweight container platform ([Download](https://orbstack.dev))
- **Google Takeout Export** - To scan your metadata
- **No other software** needed on macOS!

## Privacy & Security

✅ **Your data stays entirely on your computer**
- 100% Offline processing. No APIs, no logins.
- All processing happens locally in containers.
- Does not upload your photos to any server.
- Delete everything anytime: `docker-compose down -v`

## Technology Stack

| Component | Tech | Why |
|-----------|------|-----|
| **Frontend** | React 18 + Material-UI 3 | Beautiful, responsive UI |
| **Backend** | Node.js + Express | Lightweight, fast API |
| **Database** | SQLite | No external database needed |
| **Containers** | Docker + Orbstack | Zero local dependencies |

## Common Tasks

### Find Photos Missing Location Data & Bad Filenames
1. Download Google Takeout with Google Photos
2. Extract the .zip file
3. Open app → Click "Analyze"
4. Click "Choose Folder" and select your Takeout folder
5. The analysis will run automatically and display results below!
6. Review missing location items and filename formatting errors
7. Manually add location or rename files

### Export Results for Spreadsheet
1. After validation/analysis completes
2. Click "Export JSON" or "Export CSV"
3. Open in Excel, Google Sheets, etc.
4. Sort, filter, manually process

## Common Commands

```bash
# Start application
docker-compose up

# Start in background
docker-compose up -d

# View logs (helpful for debugging)
docker-compose logs -f

# Stop application
docker-compose down

# Stop and delete all data
docker-compose down -v

# Restart backend service
docker-compose restart backend
```

## License

This project is open source. See [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is **not affiliated with Google**. Always maintain backups of your original files before making any modifications.

---

## Next Steps

1. 📖 Read [**GETTING_STARTED.md**](GETTING_STARTED.md)
2. 🚀 Run: `docker-compose up -d`
3. 🎉 Visit: http://localhost:3000

**Made with ❤️ for Google Photos enthusiasts**
