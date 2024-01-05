import { ReactNode, useEffect } from 'react';

type Props = { children: ReactNode };

export default function AppContext({ children }: Props) {
  return <>{children}</>;
}
