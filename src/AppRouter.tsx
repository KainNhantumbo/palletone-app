import type { JSX } from 'react';
import Home from './routes';
import Saved from './routes/saved';
import ColorExtrator from './routes/color-extractor';
import Palletes from './routes/palletes';
import Preferences from './routes/preferences';
import NotFoundError from './routes/404';
import HarmonyColors from './routes/harmony-colors';
import { Route, Routes } from 'react-router-dom';

type RouteType = { path: string; element: JSX.ElementType };

const routes: RouteType[] = [
  { path: '/', element: Home },
  { path: '/color-extractor', element: ColorExtrator },
  { path: '/preferences', element: Preferences },
  { path: '/harmony-colors', element: HarmonyColors },
  { path: '/palettes', element: Palletes },
  { path: '/saved', element: Saved },
  { path: '*', element: NotFoundError }
];

export default function AppRouter() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}
