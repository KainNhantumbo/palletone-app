import { JSX } from 'react';
import Home from './routes/Home';
import NotFoundError from './routes/404';
import PrivacyPolicy from './routes/PrivacyPolicy';
import { Route, Routes } from 'react-router-dom';

type RouteType = { path: string; element: JSX.ElementType };

const routes: RouteType[] = [
  { path: '/', element: Home },
  { path: '/docs/privacy-policy', element: PrivacyPolicy },
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
