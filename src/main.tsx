import './styles/index.css';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Loader } from './components/loader';
import { store } from './state/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/theme-provider';

const AppRouter = lazy(() => import('./AppRouter'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<Loader />}>
            <AppRouter />
          </Suspense>
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
