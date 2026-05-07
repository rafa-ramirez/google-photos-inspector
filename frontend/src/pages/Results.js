import React from 'react';
import { Container, Box, Typography } from '@mui/material';

export default function Results() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📊 Results & History
      </Typography>
      <Typography variant="body1">
        Results will appear here after running validations or analyses.
      </Typography>
    </Container>
  );
}
