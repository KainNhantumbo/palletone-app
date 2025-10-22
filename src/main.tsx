import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Loader } from './components/loader';
import { ThemeProvider } from './components/theme-provider';
import './styles/index.css';

const AppRouter = React.lazy(() => import('./router'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <React.Suspense fallback={<Loader />}>
          <AppRouter />
        </React.Suspense>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');
