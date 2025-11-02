import { TooltipWrapper } from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { ArrowLeftIcon, PocketIcon } from 'lucide-react';
import { SavedColorsTabsContainer } from './_components';

export default function SavedColors() {
  useDocumentTitle('Palletone - Saved colors');

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
          <PocketIcon className="h-auto w-6" />
          <span className="text-lg">Saved Colors</span>
        </h1>
      </div>

      <Separator decorative />

      <SavedColorsTabsContainer />
    </main>
  );
}
