import { metadata } from '../shared/constants';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function NotFoundError() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <main>
      <section className=''>
        <div className=''>
          <span>{metadata.appName}</span>
        </div>
      </section>
      <section className=''>
        <h1>404</h1>
        <h2>Oops! Lost in {metadata.appName}?</h2>
        <p>The page you were looking for does not exist</p>
        <button onClick={() => navigate('/', { replace: true })}>Get back!</button>
      </section>
    </main>
  );
}
