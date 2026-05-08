import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navigation from './components/Navigation';
import LocalAnalyzer from './pages/LocalAnalyzer';
import { useAnalysisStore } from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f51ff',
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LanguageHandler>
          <Navigation />
          <Routes>
            <Route path="/" element={<LocalAnalyzer />} />
            <Route path="/es" element={<LocalAnalyzer />} />
            <Route path="/local-analyzer" element={<LocalAnalyzer />} />
            <Route path="/es/local-analyzer" element={<LocalAnalyzer />} />
          </Routes>
        </LanguageHandler>
      </Router>
    </ThemeProvider>
  );
}

export default App;
