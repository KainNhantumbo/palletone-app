import { useDocumentTitle } from '@uidotdev/usehooks';
import { HarmonyColorsTabsContainer } from './_components';

export default function HarmonyColors() {
  useDocumentTitle('Palletone - Harmony Colors');

  return (
    <main className="mx-auto w-full max-w-5xl pb-24 pt-20">
      <HarmonyColorsTabsContainer />
    </main>
  );
}
