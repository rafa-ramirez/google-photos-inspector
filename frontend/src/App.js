import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Link as MuiLink } from '@mui/material';

import Navigation from './components/Navigation';
import LocalAnalyzer from './pages/LocalAnalyzer';
import { useAnalysisStore } from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green primary color
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function LanguageHandler({ children }) {
  const { setLanguage } = useAnalysisStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/es')) {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  }, [location.pathname, setLanguage]);

  return children;
}

function Footer() {
  return (
    <Box sx={{ py: 4, textAlign: 'center', mt: 'auto' }}>
      <Typography variant="body2" color="textSecondary">
        Built with ❤️ by{' '}
        <MuiLink href="https://github.com/rafa-ramirez" target="_blank" rel="noopener">
          Rafa Ramírez
        </MuiLink>
        {' '}•{' '}
        <MuiLink href="https://github.com/rafa-ramirez/google-photos-inspector" target="_blank" rel="noopener">
          View on GitHub
        </MuiLink>
      </Typography>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Router>
          <LanguageHandler>
            <Navigation />
            <Box sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<LocalAnalyzer />} />
                <Route path="/es" element={<LocalAnalyzer />} />
                <Route path="/local-analyzer" element={<LocalAnalyzer />} />
                <Route path="/es/local-analyzer" element={<LocalAnalyzer />} />
              </Routes>
            </Box>
            <Footer />
          </LanguageHandler>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
