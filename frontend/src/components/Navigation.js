import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { useAnalysisStore } from '../store';

export default function Navigation() {
  const { clearResults, language, setLanguage } = useAnalysisStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    
    // Update URL logic
    let newPath = location.pathname;
    if (newLang === 'es') {
      if (!newPath.startsWith('/es')) {
        newPath = `/es${newPath === '/' ? '' : newPath}`;
      }
    } else {
      if (newPath.startsWith('/es')) {
        newPath = newPath.replace('/es', '') || '/';
      }
    }
    navigate(newPath);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to={language === 'es' ? '/es' : '/'} 
          onClick={clearResults}
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', cursor: 'pointer' }}
        >
          🔎 Google Photos Inspector
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageIcon sx={{ mr: 1 }} />
          <Button 
            color="inherit" 
            onClick={() => handleLanguageChange('en')}
            sx={{ fontWeight: language === 'en' ? 'bold' : 'normal', minWidth: 'auto', p: 1 }}
          >
            EN
          </Button>
          <Typography color="inherit">|</Typography>
          <Button 
            color="inherit" 
            onClick={() => handleLanguageChange('es')}
            sx={{ fontWeight: language === 'es' ? 'bold' : 'normal', minWidth: 'auto', p: 1 }}
          >
            ES
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
