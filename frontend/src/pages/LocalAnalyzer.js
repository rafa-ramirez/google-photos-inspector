import React from 'react';
import { Container, Box, Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { useAnalysisStore } from '../store';
import { analyzeFiles } from '../utils/analysis';
import { translations } from '../translations';

export default function LocalAnalyzer() {
  const {
    language,
    analysisResults,
    analysisSummary,
    isAnalyzing,
    analysisError,
    setAnalysisResults,
    setAnalysisSummary,
    setIsAnalyzing,
    setAnalysisError
  } = useAnalysisStore();

  const t = translations[language];

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleAnalyze(files);
    }
  };

  const handleAnalyze = async (filesToAnalyze) => {
    if (!filesToAnalyze || filesToAnalyze.length === 0) {
      setAnalysisError(t.selectFilesError);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisSummary(null);
    useAnalysisStore.getState().clearResults();

    try {
      const data = await analyzeFiles(filesToAnalyze);
      const sortedResults = (data.results || []).sort((a, b) => b.filename.localeCompare(a.filename));
      setAnalysisResults(sortedResults);
      setAnalysisSummary({
        totalFiles: data.totalFiles,
        totalSelectedFiles: filesToAnalyze.length,
        missingLocationCount: data.results?.length || 0
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisError(error.message || t.analysisFailed);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getIssueLabel = (issue) => {
    return t.issues[issue] || issue;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t.analyzerTitle}
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t.uploadTitle}
          </Typography>

          <Typography variant="body2" color="textSecondary" paragraph>
            {t.uploadDescription}
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>{t.privacyNote}</strong> {t.privacyText}
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
                {isAnalyzing ? t.analyzing : t.chooseFolder}
              </Button>
            </label>
          </Box>

          {analysisSummary && !isAnalyzing && analysisSummary.missingLocationCount > 0 && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {t.processedFiles
                .replace('{total}', analysisSummary.totalFiles)
                .replace('{selected}', analysisSummary.totalSelectedFiles)}
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
          {t.successMessage.replace('{total}', analysisSummary.totalFiles)}
        </Alert>
      )}

      {analysisResults.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            {t.foundIssues.replace('{count}', analysisResults.length)}
          </Typography>

          {analysisResults.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{item.filename}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {t.metadataIssues} {item.issues.map(getIssueLabel).join(', ')}
                </Typography>
                {item.metadata?.photoTakenTime && (
                  <Typography variant="body2">
                    {t.taken} {new Date(item.metadata.photoTakenTime).toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}
                  </Typography>
                )}
                {item.photoLink && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <a href={item.photoLink} target="_blank" rel="noopener noreferrer">
                      {t.viewInGooglePhotos}
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
