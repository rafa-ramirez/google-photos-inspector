import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Settings() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        ⚙️ Settings
      </Typography>
      <Typography variant="body1">
        Settings page coming soon.
      </Typography>
    </Container>
  );
}
