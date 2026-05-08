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
      default: '#f8fafc', // Softer background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16, // M3 rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // M3 doesn't use all-caps buttons
          fontWeight: 600,
          padding: '10px 24px',
          borderRadius: 24, // Pill-shaped buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Softer, wider shadows
          border: '1px solid rgba(0, 0, 0, 0.05)',
          elevation: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
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
