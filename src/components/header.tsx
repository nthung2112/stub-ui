import { ReactNode } from 'react';

export function Header({ title }: { title: ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b px-4 py-3">
      <div className="text-md font-semibold">{title}</div>
    </header>
  );
}
