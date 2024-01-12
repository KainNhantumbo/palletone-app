import { Layout } from '@/components/layout';
import { InitialColors } from '@/components/initial-colors';
import { useDocumentTitle } from '@uidotdev/usehooks';

export default function Home() {
  useDocumentTitle('Palletone | Colors');

  return (
    <Layout>
      <main>
        <article className='w-full pb-24 pt-20'>
          <InitialColors />
        </article>
      </main>
    </Layout>
  );
}
