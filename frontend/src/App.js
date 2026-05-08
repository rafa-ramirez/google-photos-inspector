import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import LocalAnalyzer from './pages/LocalAnalyzer';
import Results from './pages/Results';
import Settings from './pages/Settings';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<LocalAnalyzer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
