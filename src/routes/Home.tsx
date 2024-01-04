import Layout from '@/components/Layout';
import { _home as Container } from '@/styles/routes/_home';

export default function Home() {
  return (
    <Layout renderHeader renderFooter>
      <Container>
        <div className='wrapper-container'>
          <article>
            <h1 className=''>Vite App Template</h1>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
