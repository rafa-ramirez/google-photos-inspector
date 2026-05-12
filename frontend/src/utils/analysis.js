
export function validateFilename(filename) {
  // Expected format: YYYYMMDD_HHMMSS.ext
  const regex = /^\d{8}_\d{6}\.\w+$/;
  
  if (!regex.test(filename)) {
    return {
      isValid: false,
      issues: identifyIssues(filename)
    };
  }

  return {
    isValid: true,
    issues: []
  };
}

function identifyIssues(filename) {
  const issues = [];
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  
  // Check for common patterns
  if (nameWithoutExt.includes('(')) {
    issues.push('has_parentheses');
  }
  if (nameWithoutExt.match(/_\d+$/)) {
    issues.push('has_numeric_suffix');
  }
  if (nameWithoutExt.includes('_edited')) {
    issues.push('has_edited_suffix');
  }
  if (nameWithoutExt.includes('copy')) {
    issues.push('has_copy_suffix');
  }
  if (!nameWithoutExt.match(/^\d{8}_\d{6}$/)) {
    issues.push('wrong_format');
  }

  return issues;
}

/**
 * Analyzes a list of files from a Google Takeout folder.
 * @param {File[]} fileList - The list of files from the input element.
 * @param {Object} options - Analysis options
 * @param {boolean} options.ignoreMetadata - If true, only analyze filenames without checking metadata files
 */
export async function analyzeFiles(fileList, options = {}) {
  const results = [];
  const fileArray = Array.from(fileList).filter(f => !f.name.startsWith('.'));
  
  // Filter JSON files and Media files
  const jsonFiles = fileArray.filter(f => f.name.endsWith('.json'));
  const mediaFiles = fileArray.filter(f => 
    !f.name.endsWith('.json') && 
    !f.name.endsWith('.html') && 
    !f.name.endsWith('.txt')
  );

  // Create a map of JSON contents for fast lookup
  const jsonMap = new Map();
  if (!options.ignoreMetadata) {
    for (const file of jsonFiles) {
      try {
        const text = await file.text();
        jsonMap.set(file.name, JSON.parse(text));
      } catch (e) {
        console.warn(`Skipping invalid JSON file: ${file.name} - ${e.message}`);
      }
    }
  }

  // Process each media file
  for (const mediaFile of mediaFiles) {
    const mediaFileName = mediaFile.name;
    const validation = validateFilename(mediaFileName);
    let hasFilenameIssues = !validation.isValid;
    
    // Try to find the matching JSON file
    let metadata = null;
    let jsonKey = null;
    
    // Logic to match media file to JSON (matching backend logic)
    if (jsonMap.has(`${mediaFileName}.json`)) {
      jsonKey = `${mediaFileName}.json`;
    } else if (jsonMap.has(`${mediaFileName}.supplemental-metadata.json`)) {
      jsonKey = `${mediaFileName}.supplemental-metadata.json`;
    } else {
      const baseName = mediaFileName.substring(0, mediaFileName.lastIndexOf('.'));
      if (jsonMap.has(`${baseName}.json`)) {
        jsonKey = `${baseName}.json`;
      } else if (jsonMap.has(`${baseName}.supplemental-metadata.json`)) {
        jsonKey = `${baseName}.supplemental-metadata.json`;
      }
    }

    if (jsonKey) {
      metadata = jsonMap.get(jsonKey);
    }

    let hasExifLocation = options.ignoreMetadata ? true : true;
    let exifLat = null;
    let exifLng = null;
    let formattedPhotoTakenTime = null;
    let photoLink = `https://photos.google.com/search/${encodeURIComponent(`"${mediaFileName}"`)}`;

    if (metadata && !options.ignoreMetadata) {
      if (metadata.geoDataExif) {
        exifLat = metadata.geoDataExif.latitude;
        exifLng = metadata.geoDataExif.longitude;
        if ((exifLat === 0 && exifLng === 0) || (exifLat == null && exifLng == null)) {
          hasExifLocation = false;
        }
      } else {
        hasExifLocation = false;
      }

      if (metadata.photoTakenTime) {
        if (metadata.photoTakenTime.timestamp) {
          formattedPhotoTakenTime = parseInt(metadata.photoTakenTime.timestamp, 10) * 1000;
        } else {
          formattedPhotoTakenTime = metadata.photoTakenTime;
        }
      }
      
      if (hasFilenameIssues && metadata.url) {
        photoLink = metadata.url;
      } else {
        photoLink = `https://photos.google.com/search/${encodeURIComponent(`"${metadata.title || mediaFileName}"`)}`;
      }
    }

    const issues = [...validation.issues];
    if (!options.ignoreMetadata && !hasExifLocation) {
      issues.push(metadata ? 'missing_exif_location_data' : 'missing_metadata_file');
    }

    if (issues.length > 0) {
      results.push({
        id: crypto.randomUUID(),
        filename: metadata?.title || mediaFileName,
        hasLocation: hasExifLocation,
        location: { latitude: exifLat, longitude: exifLng },
        metadata: {
          photoTakenTime: formattedPhotoTakenTime,
          geoData: metadata?.geoData || null
        },
        issues: issues,
        photoLink: photoLink
      });
    }
  }

  return {
    totalFiles: mediaFiles.length,
    missingLocationCount: results.length,
    results: results,
    analysisDate: new Date().toISOString()
  };
}
