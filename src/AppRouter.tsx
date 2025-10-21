import type { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import Home from './routes';
import ColorExtractor from './routes/color-extractor';
import ConverterPage from './routes/converter';
import HarmonyColors from './routes/harmony-colors';
import Palettes from './routes/palettes';
import Preferences from './routes/preferences';
import SavedColors from './routes/saved-colors';
import type { RouteType } from './types';

const routes: RouteType[] = [
  { path: '/', element: Home },
  { path: '/color-extractor', element: ColorExtractor },
  { path: '/preferences', element: Preferences },
  { path: '/harmony-colors', element: HarmonyColors },
  { path: '/palettes', element: Palettes },
  { path: '/saved', element: SavedColors },
  { path: '/converter', element: ConverterPage },
  { path: '*', element: Redirect }
];

function Redirect() {
  return <Navigate to="/" replace />;
}

const AppRouter = (): JSX.Element => (
  <Layout>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  </Layout>
);

export default AppRouter;
