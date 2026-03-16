import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { darkTheme, lightTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { useThemeStore } from './store/themeStore';
import App from './App';

const Root = () => {
  const isDark = useThemeStore((s) => s.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme.colors.surface,
            color: theme.colors.textPrimary,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '12px',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: { primary: theme.colors.primary, secondary: theme.colors.surface },
            style: { borderLeft: `3px solid ${theme.colors.primary}` },
          },
          error: {
            iconTheme: { primary: theme.colors.error, secondary: theme.colors.surface },
            style: { borderLeft: `3px solid ${theme.colors.error}` },
          },
        }}
      />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);