const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { analyzeLocalMetadata, getAnalysisHistory } = require('../services/exifService');

const fs = require('fs');

const uploadDir = process.env.UPLOAD_DIR || '/app/uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const sessionUploadDir = path.join(uploadDir, req.sessionID || 'anonymous');
    if (!fs.existsSync(sessionUploadDir)) {
      fs.mkdirSync(sessionUploadDir, { recursive: true });
    }
    cb(null, sessionUploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


// Analyze local metadata
router.post('/upload', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedDir = path.dirname(req.files[0].path);
    const mediaFiles = req.body.mediaFiles ? JSON.parse(req.body.mediaFiles) : [];
    
    const results = await analyzeLocalMetadata(req.sessionID, uploadedDir, mediaFiles);

    res.json(results);
  } catch (error) {
    console.error('Error analyzing metadata:', error);
    res.status(500).json({ error: 'Failed to analyze metadata' });
  }
});

// Get analysis history
router.get('/history', async (req, res) => {
  try {
    const history = await getAnalysisHistory(req.sessionID);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get missing location items
router.get('/missing-location', async (req, res) => {
  try {
    const { allQuery } = require('../services/database');
    const results = await allQuery(
      'SELECT * FROM exif_analysis WHERE session_id = ? AND has_location = 0 ORDER BY created_at DESC',
      [req.sessionID]
    );

    res.json(results);
  } catch (error) {
    console.error('Error fetching missing location:', error);
    res.status(500).json({ error: 'Failed to fetch missing location items' });
  }
});

module.exports = router;
