# Getting Started

Welcome! This guide will get you up and running in minutes.

## 1️⃣ Install Orbstack (One-time)

Orbstack is a lightweight container platform that runs all the code. No installation needed on your Mac!

1. Download Orbstack: [orbstack.dev](https://orbstack.dev)
2. Drag to Applications folder
3. Launch OrbStack
4. Done! ✅

## 2️⃣ Quick Start (5 minutes)

```bash
# Navigate to project
cd /Users/rafa/projects/google-photos-inspector

# Make startup script executable (one time)
chmod +x quick-start.sh

# Run quick start
./quick-start.sh
```

This will:
- Check Orbstack is running ✓
- Start all containers
- Create `.env` file if needed

## 3️⃣ Launch Application

```bash
# Start the app
docker-compose up -d

# Open in browser
open http://localhost:3000
```

You should see the welcome screen. Click "Go to Analyzer"!

## What You Can Do

### 📋 Local Takeout Analyzer  
Find photos missing GPS location data and identify poorly formatted filenames in Google Takeout exports:
- Select an entire Takeout Folder
- Instantly identify missing location data in EXIF metadata
- Validates that all photos follow format: `YYYYMMDD_HHMMSS.ext`
- Finds naming issues (duplicates, suffixes, etc.)
- Export report for manual fixes
- Batch operations for large libraries (gigabytes of data processed in seconds)

## Key Features

✅ **Easy Setup** - No configuration required  
✅ **No Installation** - Everything runs in containers  
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
