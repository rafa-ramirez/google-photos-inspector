import React, { useState } from 'react';
import { Container, Box, Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { useAnalysisStore } from '../store';
import { analysisAPI } from '../api';

export default function LocalAnalyzer() {
  const { 
    analysisResults, 
    analysisSummary,
    isAnalyzing, 
    analysisError, 
    setAnalysisResults, 
    setAnalysisSummary,
    setIsAnalyzing, 
    setAnalysisError 
  } = useAnalysisStore();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    if (files && files.length > 0) {
      handleAnalyze(files);
    }
  };

  const handleAnalyze = async (filesToAnalyze) => {
    if (!filesToAnalyze || filesToAnalyze.length === 0) {
      setAnalysisError('Please select files to analyze');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisSummary(null);
    useAnalysisStore.getState().clearResults();

    try {
      const fileArray = Array.from(filesToAnalyze).filter(f => !f.name.startsWith('.'));
      const jsonFiles = fileArray.filter(f => f.name.endsWith('.json'));
      const mediaFiles = fileArray
        .filter(f => !f.name.endsWith('.json') && !f.name.endsWith('.html') && !f.name.endsWith('.txt'))
        .map(f => f.name); // Send only names for media files

      const { data } = await analysisAPI.uploadFiles(jsonFiles, mediaFiles);
      
      const sortedResults = (data.results || []).sort((a, b) => b.filename.localeCompare(a.filename));
      setAnalysisResults(sortedResults);
      
      setAnalysisSummary({
        totalFiles: data.totalFiles || mediaFiles.length,
        totalSelectedFiles: fileArray.length,
        missingLocationCount: data.results?.length || 0
      });
    } catch (error) {
      setAnalysisError(error.response?.data?.error || 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📝 Local EXIF Metadata and Filename Analyzer
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload Google Takeout Folder
          </Typography>

          <Typography variant="body2" color="textSecondary" paragraph>
            Select your Google Takeout export folder. The tool will instantly analyze all media filenames for formatting issues and check their JSON metadata for missing location data.
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>Privacy Note:</strong> When your browser asks to "Upload files", it simply means granting this app permission to read them. <strong>No files are ever sent to the internet or stored anywhere.</strong> All analysis happens 100% offline on your computer.
          </Alert>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <input
              type="file"
              multiple
              webkitdirectory=""
              directory=""
              onChange={handleFileSelect}
              onClick={() => useAnalysisStore.getState().clearResults()}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? <CircularProgress size={24} sx={{ mr: 2 }} /> : null}
                {isAnalyzing ? 'Analyzing...' : 'Choose Folder'}
              </Button>
            </label>
          </Box>

          {analysisSummary && !isAnalyzing && analysisSummary.missingLocationCount > 0 && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Processed {analysisSummary.totalFiles} media item(s) from {analysisSummary.totalSelectedFiles} selected files.
            </Typography>
          )}
        </CardContent>
      </Card>

      {analysisError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {analysisError}
        </Alert>
      )}

      {analysisSummary && analysisSummary.missingLocationCount === 0 && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Successfully processed {analysisSummary.totalFiles} media item(s) from {analysisSummary.totalSelectedFiles} selected files. All items have valid filenames and EXIF location data!
        </Alert>
      )}

      {analysisResults.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Found {analysisResults.length} items with issues
          </Typography>

          {analysisResults.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.filename}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Metadata issues: {item.issues.join(', ')}
                </Typography>
                {item.metadata?.photoTakenTime && (
                  <Typography variant="body2">
                    Taken: {new Date(item.metadata.photoTakenTime).toLocaleString()}
                  </Typography>
                )}
                {item.photoLink && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <a href={item.photoLink} target="_blank" rel="noopener noreferrer">
                      View in Google Photos
                    </a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
