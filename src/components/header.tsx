import { UserNav } from "@/components/user-nav"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <UserNav />
    </header>
  )
}
