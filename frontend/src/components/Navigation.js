import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAnalysisStore } from '../store';

export default function Navigation() {
  const { clearResults } = useAnalysisStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          onClick={clearResults}
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', cursor: 'pointer' }}
        >
          🔎 Google Photos Inspector
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
