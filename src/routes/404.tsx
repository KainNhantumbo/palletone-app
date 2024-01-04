import { metadata } from '../shared/data';
import { _error as Container } from '../styles/routes/_error';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function NotFoundError() {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{metadata.appName}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>404</h1>
        <h2>Oops! Lost in {metadata.appName}?</h2>
        <p>The page you were looking for does not exist</p>
        <button onClick={() => navigate('/', { replace: true })}>
          Get back!
        </button>
      </section>
    </Container>
  );
}
