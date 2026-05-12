# Usage Guide

## Overview

Google Photos Inspector is a **100% local, offline-first tool** designed to analyze your Google Takeout exports. It checks both:
1. **Filename Formats**: Ensures media files match the `YYYYMMDD_HHMMSS.ext` format (finding duplicates, WhatsApp formats, etc.).
2. **Metadata Location Data**: Checks if the files are missing EXIF GPS location data by inspecting their accompanying JSON files.

## Getting Started

### Prerequisites

- [Orbstack](https://orbstack.dev) or Docker installed on your macOS
- A Google Takeout export of your Google Photos

### Starting the Application

```bash
# Navigate to project directory
cd /path/to/google-photos-inspector

# Start the application
docker-compose up -d

# Open your browser and navigate to:
# http://localhost:3000
```

## How to Get Google Takeout Files

1. Go to [Google Takeout](https://takeout.google.com)
2. Sign in with your Google account
3. Click "Deselect all"
4. Search for "Google Photos"
5. Select only "Google Photos"
6. Scroll down and click "Next step"
7. Choose:
   - **Export format**: .zip
   - **Frequency**: "Export once"
8. Click "Create export"
9. Wait for email confirmation and download the .zip file
10. Extract the files locally on your computer

### File Structure Expected

Your Google Takeout folder will have media files accompanied by their JSON metadata equivalents:
```text
Takeout/Google Photos/2026/
├── 20260507_212000.jpg
├── 20260507_212000.jpg.json
├── photo_123.mp4
└── photo_123.mp4.json
```

## Using the Analyzer

1. **Open the Application**: Go to `http://localhost:3000`.
2. **Configure Analysis Options** (optional):
   - **Ignore metadata files**: Check this option if you only want to validate filename formats without checking EXIF location data. This speeds up analysis by skipping JSON metadata file parsing.
3. **Select Folder**: Click the "Choose Folder" button.
4. **Pick the Directory**: Select your extracted Google Takeout folder (or a specific year/album folder inside it).
5. **Automatic Analysis**: The application will instantly begin analyzing the folder structure based on your selected options.

### Understanding the Analysis

The tool automatically pairs your media files with their corresponding JSON metadata (unless you enabled "Ignore metadata files"). It then filters out the noise (like hidden `.DS_Store` files or random text files) and provides a clear summary:

- **Processed Counts**: It will explicitly tell you how many actual media items were processed out of the total files you selected (since roughly half the files are usually JSONs when checking metadata).
- **Analysis Mode**: 
  - If "Ignore metadata files" is **OFF**: Both filename formats and EXIF location data are checked.
  - If "Ignore metadata files" is **ON**: Only filename formats are validated.
- **Sorting**: The results are sorted by filename in descending order, meaning your newest files (e.g. `202608...`) will appear at the top.
- **Resetting**: If you want to clear the results, simply click the "🔎 Google Photos Inspector" title at the top, or just click "Choose Folder" again.

### Reviewing Issues

If any items have issues, they will be listed on the screen. The issues can vary based on your analysis options:

**When checking filenames** (always analyzed):
- `wrong_format`: The filename doesn't match the `YYYYMMDD_HHMMSS` structure.
- `has_numeric_suffix`: The file is a duplicate ending with `(1)` or `_1`.
- `has_parentheses`: The filename contains parentheses.
- `has_edited_suffix`: The filename contains `_edited` suffix.
- `has_copy_suffix`: The filename contains `copy` suffix.

**When checking metadata** (only if "Ignore metadata files" is OFF):
- `missing_exif_location_data`: The JSON file indicates the photo lacks GPS coordinates.
- `missing_metadata_file`: The media file has no corresponding JSON file.

### Fixing Issues

For any problematic file, you can click the **View in Google Photos** link. 
- If the filename is correct but missing location data, it will search Google Photos for that exact filename (using quotes to ensure an exact match).
- If the filename is malformed, it will directly open the photo using the internal URL found inside its supplemental JSON file.

You can then manually fix the date/time or location directly within the Google Photos web interface!

## Troubleshooting

**"Analysis failed" or Infinite Spinner**
- If you select an extremely large folder (e.g., 500,000 files), your browser might run out of memory. Try analyzing one sub-folder (e.g., a specific year) at a time.
- Check backend logs: `docker-compose logs backend`

**Files aren't showing up**
- Make sure you selected the folder containing both the images and the `.json` files.

## Data Privacy
- ✅ **100% Offline**: No images, metadata, or filenames are ever sent to any external server.
- ✅ **Local Only**: Everything is processed in your browser and local Docker container.
- ✅ **No Google Login Required**: We analyze the Takeout files directly from your hard drive without needing access to your Google Account.
