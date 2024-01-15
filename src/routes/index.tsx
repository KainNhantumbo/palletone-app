import { useDocumentTitle } from '@uidotdev/usehooks';
import { InitialColors } from '@/components/initial-colors';

export default function Home() {
  useDocumentTitle('Palletone - Colors');

  return (
    <main>
      <article className='w-full pb-24 pt-20'>
        <InitialColors />
      </article>
    </main>
  );
}
