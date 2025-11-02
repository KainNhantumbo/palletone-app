import logoImage from '@/assets/favicon.png';
import { ThemeToggle } from '@/components/theme-toggle';
import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { metadata } from '@/shared/constants';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { ArrowLeftIcon, Settings2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Preferences() {
  useDocumentTitle('Palletone - Preferences');

  return (
    <main className="mx-auto flex w-full  max-w-5xl flex-col gap-3 pb-24 pt-20">
      <div className=" flex items-center gap-4 ">
        <TooltipWrapper content="Get back">
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={() => history.back()}
            className="rounded-full">
            <ArrowLeftIcon />
          </Button>
        </TooltipWrapper>
        <h1 className="flex items-center gap-2">
          <Settings2Icon className="h-auto w-6" />
          <span className="text-lg">Preferences</span>
        </h1>
      </div>

      <Separator decorative />

      <section className="mt-3 flex w-full flex-col gap-3">
        <div className="base-border flex w-full flex-col gap-2 rounded-2xl bg-foreground-default p-3">
          <h2 className="text-md">Donate</h2>
          <p>
            Thank your for trying this app. If you enjoy or find this something useful,
            please consider donating to support my development.
          </p>

          <p>
            Feel free to contact me to report a bug or even request to implement your
            desired feature.
          </p>

          <div className="mt-2 flex w-full flex-wrap gap-2">
            {metadata.contacts.map((contact, idx) => (
              <Button
                key={idx}
                className="base-border group flex items-center gap-2 rounded-full bg-background-default px-4 py-1"
                asChild>
                <Link to={contact.url} target="_blank" rel="noreferrer noopener">
                  <contact.icon className="h-auto w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400" />
                  <span className="font-medium transition-colors group-hover:text-blue-400">
                    {contact.name}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="base-border flex w-full flex-col gap-2 rounded-2xl bg-foreground-default p-3">
          <h2 className="text-md">Dark Theme</h2>

          <div className=" flex w-full items-center justify-between gap-3">
            <p className="md:max-w-[calc(100%_-_200px)]">
              Improves visibility for users with low vision condition and those who are
              sensitive to bright light.
            </p>

            <ThemeToggle />
          </div>
        </div>

        <div className="mt-3 flex w-full flex-col items-center justify-center gap-2">
          <div className="flex w-full items-center justify-center gap-2">
            <img
              src={logoImage}
              loading="lazy"
              decoding="async"
              className="h-auto w-[24px] "
            />

            <h3>
              <span className="text-center">
                {metadata.appName} {metadata.version}
              </span>
            </h3>
          </div>
          <p className="text-center">
            &copy; {new Date().getFullYear()} {metadata.appName} - Distributed under{' '}
            {metadata.license}.
          </p>
        </div>
      </section>
    </main>
  );
}
