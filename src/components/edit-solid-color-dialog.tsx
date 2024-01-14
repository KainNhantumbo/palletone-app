import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Modal } from './ui/modal';
import { Input } from './ui/input';
import { InputEvent } from '@/types';

export type EditSolidColorDialogProps = {
  title: string;
  description: string;
  isOpen: boolean;
  inputPlaceholder: string;
  currentInputValue: string;
  onClose: () => void;
  onConfirm: () => void;
  onChange: (e: InputEvent) => void;
};

export const EditSolidColorDialog = ({
  title,
  description,
  isOpen,
  onClose,
  onChange,
  onConfirm,
  inputPlaceholder,
  currentInputValue
}: EditSolidColorDialogProps) => {
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}>
      <div className=''>
        <Input
          type='text'
          value={currentInputValue}
          onChange={onChange}
          placeholder={inputPlaceholder}
          className='w-full rounded-3xl border-font/15'
        />
      </div>
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button
          variant='ghost'
          onClick={onClose}
          className='group flex items-center gap-2 rounded-3xl'>
          <XIcon className='group-hover:stroke-red-500 group-active:stroke-red-500 transition-colors w-4' />
          <span className='group-hover:text-red-500 transition-colors font-medium capitalize'>
            Cancel
          </span>
        </Button>
        <Button
          variant='outline'
          onClick={onConfirm}
          className='group flex items-center gap-2 rounded-3xl'>
          <CheckIcon className='group-hover:stroke-blue-400 group-active:stroke-blue-400 transition-colors w-4' />
          <span className='group-hover:text-blue-400 transition-colors capitalize'>
            Apply
          </span>
        </Button>
      </div>
    </Modal>
  );
};
