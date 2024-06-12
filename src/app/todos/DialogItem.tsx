import { ReactNode } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type DialogItemProps = {
  triggerChildren: ReactNode;
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
};

const DialogItem = (props: DialogItemProps) => {
  const { triggerChildren, children, onOpenChange, ...itemProps } = props;
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          onSelect={(event) => {
            event.preventDefault();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogItem;
