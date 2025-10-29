import { useDocumentTitle } from '@uidotdev/usehooks';
import { ColorExtractorTabsContainer } from './_components';

export default function ColorExtractor() {
  useDocumentTitle('Palletone - Color Extractor');

  return (
    <main className="mx-auto w-full max-w-5xl pb-24 pt-20">
      <ColorExtractorTabsContainer />
    </main>
  );
}
