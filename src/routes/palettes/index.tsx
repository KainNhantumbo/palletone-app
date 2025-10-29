import { useDocumentTitle } from '@uidotdev/usehooks';
import { PalettesTabsContainer } from './_components/tabs';

export default function Palettes() {
  useDocumentTitle('Palletone - Palettes');

  return (
    <main className="mx-auto w-full max-w-5xl pb-24 pt-20">
      <PalettesTabsContainer />
    </main>
  );
}
