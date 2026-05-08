import React, { useState } from 'react';
import { Container, Box, Button, Card, CardContent, Typography, CircularProgress, Alert, Tabs, Tab, TablePagination } from '@mui/material';
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
  const [selectedTab, setSelectedTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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

  const uniqueIssues = Array.from(
    new Set(analysisResults.flatMap((item) => item.issues))
  ).sort();

  const filteredResults = selectedTab === 'all'
    ? analysisResults
    : analysisResults.filter((item) => item.issues.includes(selectedTab));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
    setPage(0);
  };

  const paginatedResults = filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

          <Alert severity="success" sx={{ mb: 3 }}>
            <strong>{t.privacyNote}</strong> {t.privacyText}
          </Alert>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
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
                variant="contained"
                disableElevation
                size="large"
                component="span"
                disabled={isAnalyzing}
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                {isAnalyzing ? <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} /> : null}
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={`${t.allIssues} (${analysisResults.length})`} value="all" />
              {uniqueIssues.map(issue => (
                <Tab 
                  key={issue} 
                  label={`${getIssueLabel(issue)} (${analysisResults.filter(r => r.issues.includes(issue)).length})`} 
                  value={issue} 
                />
              ))}
            </Tabs>
          </Box>

          <Typography variant="h6" gutterBottom>
            {t.foundIssues.replace('{count}', filteredResults.length)}
          </Typography>

          {paginatedResults.map((item) => (
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

          <TablePagination
            component="div"
            count={filteredResults.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 50, 100, 200]}
            labelRowsPerPage={language === 'es' ? 'Filas por página:' : 'Rows per page:'}
          />
        </>
      )}
    </Container>
  );
}
