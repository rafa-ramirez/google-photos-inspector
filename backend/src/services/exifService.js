const { exiftool } = require('exiftool-vendored');
const fs = require('fs').promises;
const path = require('path');
const { runQuery, allQuery } = require('./database');
const { v4: uuidv4 } = require('uuid');
function validateFilename(filename) {
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

async function analyzeLocalMetadata(sessionId, uploadDirPath, mediaFilenames = []) {
  try {
    const results = [];
    const files = await fs.readdir(uploadDirPath);
    
    // Filter JSON files
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    // Create a map of JSON contents for fast lookup
    const jsonMap = new Map();
    for (const jsonFile of jsonFiles) {
      const filePath = path.join(uploadDirPath, jsonFile);
      try {
        const jsonContent = await fs.readFile(filePath, 'utf-8');
        jsonMap.set(jsonFile, JSON.parse(jsonContent));
      } catch (e) {
        console.warn(`Skipping invalid JSON file: ${jsonFile} - ${e.message}`);
      }
    }

    // Process each media file
    for (const mediaFileName of mediaFilenames) {
      const validation = validateFilename(mediaFileName);
      let hasFilenameIssues = !validation.isValid;
      
      // Try to find the matching JSON file
      let metadata = null;
      let jsonKey = null;
      
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

      let hasExifLocation = true;
      let exifLat = null;
      let exifLng = null;
      let formattedPhotoTakenTime = null;
      let photoLink = `https://photos.google.com/search/${encodeURIComponent(`"${mediaFileName}"`)}`;

      if (metadata) {
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
      } else {
        // No metadata file found, assume location is missing
        hasExifLocation = false;
      }

      const issues = [...validation.issues];
      if (!hasExifLocation) {
        issues.push(metadata ? 'missing_exif_location_data' : 'missing_metadata_file');
      }

      if (issues.length > 0) {
        const result = {
          id: uuidv4(),
          filename: metadata?.title || mediaFileName,
          hasLocation: hasExifLocation,
          location: { latitude: exifLat, longitude: exifLng },
          metadata: {
            photoTakenTime: formattedPhotoTakenTime,
            geoData: metadata?.geoData || null
          },
          issues: issues,
          photoLink: photoLink
        };
        
        results.push(result);
        
        // Cache to database
        await runQuery(
          `INSERT INTO exif_analysis (id, session_id, file_path, has_location, latitude, longitude, location_string)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            result.id,
            sessionId,
            mediaFileName,
            hasExifLocation ? 1 : 0,
            exifLat || null,
            exifLng || null,
            (exifLat != null && exifLng != null) ? `${exifLat},${exifLng}` : null
          ]
        );
      }
    }

    return {
      totalFiles: mediaFilenames.length,
      missingLocationCount: results.length,
      results: results,
      analysisDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error analyzing metadata:', error);
    throw error;
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getAnalysisHistory(sessionId) {
  try {
    const results = await allQuery(
      'SELECT * FROM exif_analysis WHERE session_id = ? ORDER BY created_at DESC LIMIT 100',
      [sessionId]
    );
    return results;
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    throw error;
  }
}

module.exports = {
  analyzeLocalMetadata,
  getAnalysisHistory
};
