import './styles/index.css'
import 'rc-dropdown/assets/index.css';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import Loader from './components/Loader';
import { store } from './state/store';
import { Provider } from 'react-redux';

const AppRouter = lazy(() => import('./AppRouter'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
          <Suspense fallback={<Loader />}>
            <AppRouter />
          </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);
