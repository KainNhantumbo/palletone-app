import { Layout } from '@/components/layout';
import { InitialColors } from '@/components/initial-colors';

export default function Home() {
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
