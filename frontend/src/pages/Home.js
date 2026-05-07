import React from 'react';
import { Container, Box, Button, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 2 }}>
          🔎 Google Photos Inspector
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph sx={{ mb: 4 }}>
          Analyze your local Google Takeout metadata. Ensure your photos are properly organized and tagged with location data.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          Key Features:
        </Typography>
        <Box component="ul" sx={{ textAlign: 'left', display: 'inline-block', mb: 4 }}>
          <Typography component="li">✅ Validate photo filename formats</Typography>
          <Typography component="li">🔗 Direct Google Photos links for easy access</Typography>
          <Typography component="li">📊 Analyze EXIF metadata for location data</Typography>
          <Typography component="li">📥 Support for Google Takeout exports</Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/local-analyzer')}
            sx={{ mt: 4 }}
          >
            Go to Analyzer
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
