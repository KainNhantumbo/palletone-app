import { metadata } from '@/shared/constants';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="grid h-[100vh] w-full place-content-center place-items-center">
      <section className="logo-container">
        <div className="font-sans-display text-3xl">
          <span>{metadata.appName}</span>
        </div>
      </section>
      <section className="flex flex-col items-center gap-5">
        <h1 className="text-center font-sans-display text-6xl font-bold leading-tight text-primary-default">
          404
        </h1>
        <h2 className="font-sans font-bold uppercase text-error">Page not found</h2>
        <p className="max-w-screen-mobile text-center font-sans font-medium normal-case">
          But if you don&apos;t change your direction, and if you keep looking, you may end
          up where you are heading.
        </p>
        <Link
          to={'/'}
          replace
          className="mt-5 rounded-lg border-[2px] border-solid border-font p-3 px-5 font-sans font-medium transition-colors hover:border-primary hover:text-primary ">
          Take me home
        </Link>
      </section>
    </main>
  );
}
