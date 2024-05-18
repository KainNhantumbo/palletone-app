import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftIcon, RefreshCwIcon } from 'lucide-react';

export default function ConverterPage() {
  return (
    <main className="w-full pb-24 pt-20">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-2">
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
            <RefreshCwIcon className="h-auto w-6" />
            <span className="text-lg">Color Converter</span>
          </h1>
        </div>

        <Separator decorative />
      </section>
    </main>
  );
}
