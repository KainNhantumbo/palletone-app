import type { JSX } from 'react';
import Home from './routes';
import SavedColors from './routes/saved-colors';
import ColorExtractor from './routes/color-extractor';
import Palettes from './routes/palettes';
import Preferences from './routes/preferences';
import NotFoundPage from './routes/404';
import HarmonyColors from './routes/harmony-colors';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';

type RouteType = { path: string; element: JSX.ElementType };

const routes: RouteType[] = [
  { path: '/', element: Home },
  { path: '/color-extractor', element: ColorExtractor },
  { path: '/preferences', element: Preferences },
  { path: '/harmony-colors', element: HarmonyColors },
  { path: '/palettes', element: Palettes },
  { path: '/saved', element: SavedColors },
  { path: '*', element: NotFoundPage }
];

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
