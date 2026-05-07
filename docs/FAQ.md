# FAQ - Frequently Asked Questions

## General Questions

### What is Google Photos Inspector?
Google Photos Inspector is a local, offline-first tool that helps you analyze your Google Takeout exports to:
1. Validate that all photos follow a consistent naming format (`YYYYMMDD_HHMMSS.ext`)
2. Analyze JSON metadata for missing location (GPS) data

### Do I need to install anything on my Mac?
No! The tool runs entirely in Docker containers via Orbstack (or Docker Desktop). You only need:
- Docker or Orbstack installed
- A Google Takeout export

### Is my data safe?
Yes. 100% of the processing happens locally on your computer. Your photos, metadata, and filenames are **never** sent to any external servers. The tool is completely offline and does not require Google Account access.

### Does this modify my Google Takeout files?
No. This tool only **reads** your local files. It cannot modify or delete anything.

## Analysis Questions

### What filename format should I use?
The standard format is: `YYYYMMDD_HHMMSS.ext`

Examples:
- `20260507_212000.jpg` (May 7, 2026 at 9:20 PM)
- `20230115_143022.mp4` (January 15, 2023 at 2:30 PM)

### What issues does the tool find?
- `wrong_format` - Doesn't match `YYYYMMDD_HHMMSS` pattern
- `has_numeric_suffix` - Ends with `(1)`, `_1`, etc. (duplicates)
- `has_edited_suffix` - Contains "_edited" or similar
- `has_copy_suffix` - Contains "copy" in the name
- `missing_exif_location_data` - The JSON file indicates the photo has no GPS coordinates
- `missing_metadata_file` - The media file has no corresponding JSON file

### How do I fix the issues?
1. The tool provides a "View in Google Photos" link for every problematic file.
2. If the filename is malformed, the tool will open the exact photo directly using the internal URL found in the supplemental JSON file.
3. If the filename is correct but missing location data, it will search Google Photos for that exact filename in quotes.
4. You can then rename the photo or add the location directly in the Google Photos web interface.

### Why do some photos lack location data?
Normal reasons:
- Location services were disabled on your phone
- Very old photos (before phones had GPS)
- Photos taken indoors (GPS unreliable)
- Screenshots or downloaded memes

### Can I add location data after the fact?
Yes, you can click the "View in Google Photos" link and use Google Photos' web interface to edit the location data manually.

## Technical Questions

### What is Orbstack?
Orbstack is a lightweight container platform for Mac that runs Docker containers. Benefits:
- Lightweight (uses less RAM than Docker Desktop)
- Free
- Fully compatible with Docker

### What technology is this built with?
- **Backend**: Node.js + Express
- **Frontend**: React + Material-UI 3
- **Containers**: Docker + Orbstack

### Why do I see "Processed 8,000 items from 16,000 files"?
When you select a Google Takeout folder, it contains both your media files (photos/videos) and their corresponding `.json` metadata files. The analyzer smartly filters out the JSON files and only processes the actual media items, matching them to their metadata internally. This naturally cuts the number of "items" in half compared to the raw file count.

## Troubleshooting

### It's not working or stuck spinning
1. **Too many files**: Browsers have memory limits. If you try to upload a folder with 500,000 files, the browser may crash or hang. Try analyzing one sub-folder (e.g., a specific year) at a time.
2. **Missing JSON files**: Make sure the folder you selected actually contains the `.json` files alongside the media files.
3. Restart everything: `docker-compose down && docker-compose up -d`

### How do I see logs?
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### How do I update the app?
```bash
# Pull latest code (if using git)
git pull

# Rebuild containers
docker-compose down
docker-compose up -d --build
```

## Privacy & Legal

### What happens to my data?
- Stored and analyzed locally only
- Not shared with anyone
- Completely under your control

### Can you access my photos?
No. This tool runs entirely on your computer. We have no access to anything.

