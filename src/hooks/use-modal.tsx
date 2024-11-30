import React from 'react';
import { ModalContext, ModalParams } from '@/contexts/modal-context';

export function useConfirm() {
  const dialog = React.useContext(ModalContext);

  return React.useCallback(
    (params: ModalParams<'confirm'>) => {
      return dialog({
        ...(typeof params === 'string' ? { title: params } : params),
        type: 'confirm',
      });
    },
    [dialog]
  );
}
export function usePrompt() {
  const dialog = React.useContext(ModalContext);

  return (params: ModalParams<'prompt'>) =>
    dialog({
      ...(typeof params === 'string' ? { title: params } : params),
      type: 'prompt',
    });
}
export function useAlert() {
  const dialog = React.useContext(ModalContext);
  return (params: ModalParams<'alert'>) =>
    dialog({
      ...(typeof params === 'string' ? { title: params } : params),
      type: 'alert',
    });
}
