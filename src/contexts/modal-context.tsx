'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

export const ModalContext = React.createContext<
  <T extends ModalAction>(
    params: T
  ) => Promise<T['type'] extends 'alert' | 'confirm' ? boolean : null | string>
>(() => null!);

export type ModalAction =
  | { type: 'alert'; title: string; body?: string; cancelButton?: string }
  | {
      type: 'confirm';
      title: string;
      body?: string;
      cancelButton?: string;
      actionButton?: string;
    }
  | {
      type: 'prompt';
      title: string;
      body?: string;
      cancelButton?: string;
      actionButton?: string;
      defaultValue?: string;
      inputProps?: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
    }
  | { type: 'close' };

interface ModalState {
  open: boolean;
  title: string;
  body: string;
  type: 'alert' | 'confirm' | 'prompt';
  cancelButton: string;
  actionButton: string;
  defaultValue?: string;
  inputProps?: React.PropsWithoutRef<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >;
}

export function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'close':
      return { ...state, open: false };
    case 'alert':
    case 'confirm':
    case 'prompt':
      return {
        ...state,
        open: true,
        ...action,
        cancelButton: action.cancelButton || (action.type === 'alert' ? 'Okay' : 'Cancel'),
        actionButton: ('actionButton' in action && action.actionButton) || 'Okay',
      };
    default:
      return state;
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(modalReducer, {
    open: false,
    title: '',
    body: '',
    type: 'alert',
    cancelButton: 'Cancel',
    actionButton: 'Okay',
  });

  const resolveRef = React.useRef<(tf: any) => void>();

  function close() {
    dispatch({ type: 'close' });
    resolveRef.current?.(false);
  }

  function confirm(value?: string) {
    dispatch({ type: 'close' });
    resolveRef.current?.(value ?? true);
  }

  const dialog = React.useCallback(async <T extends ModalAction>(params: T) => {
    dispatch(params);

    return new Promise<T['type'] extends 'alert' | 'confirm' ? boolean : null | string>(
      (resolve) => {
        resolveRef.current = resolve;
      }
    );
  }, []);

  return (
    <ModalContext.Provider value={dialog}>
      {children}
      <AlertDialog
        open={state.open}
        onOpenChange={(open) => {
          if (!open) close();
          return;
        }}
      >
        <AlertDialogContent asChild>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              confirm(event.currentTarget.prompt?.value);
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>{state.title}</AlertDialogTitle>
              {state.body ? <AlertDialogDescription>{state.body}</AlertDialogDescription> : null}
            </AlertDialogHeader>
            {state.type === 'prompt' && (
              <Input name="prompt" defaultValue={state.defaultValue} {...state.inputProps} />
            )}
            <AlertDialogFooter>
              <Button type="button" onClick={close} variant="outline">
                {state.cancelButton}
              </Button>
              {state.type === 'alert' ? null : <Button type="submit">{state.actionButton}</Button>}
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </ModalContext.Provider>
  );
}

export type ModalParams<T extends 'alert' | 'confirm' | 'prompt'> =
  | Omit<Extract<ModalAction, { type: T }>, 'type'>
  | string;
