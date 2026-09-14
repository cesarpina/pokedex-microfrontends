import { History } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { Pokeball } from './Pokeball'
import { ThemeToggle } from './ThemeToggle'
import { UserMenu } from './UserMenu'

export function Header() {
  return (
    <header className="glass sticky top-0 z-30 border-b border-line">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-[0.18em] uppercase"
        >
          <Pokeball className="h-8 w-8 transition-transform duration-500 ease-spring hover:rotate-180" />
          Pokedex
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-surface-2 ${
                isActive ? 'bg-surface-2 text-ink' : 'text-muted'
              }`
            }
          >
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Ver historial</span>
          </NavLink>
          <UserMenu />
        </nav>
      </div>
    </header>
  )
}
