import { useEffect, useRef, useState, memo, useCallback, useMemo } from 'react'
import {
  Menu,
  Moon,
  Search as SearchIcon,
  Sun,
  X,
} from 'lucide-react'
import { NAV_LINKS } from '../config/nav'
import Magnet from './Magnet'
import { preloadComponent } from './navViews'

function GoogleMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function runGoogleSearch(query) {
  const q = query.trim()
  if (!q) return
  const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}


export default memo(function Navbar({ activeNav, onNavChange }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then fallback to DOM state
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) {
        return saved === 'dark'
      }
    }
    return document.documentElement.classList.contains('dark')
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const searchPopoverRef = useRef(null)
  const searchInputRef = useRef(null)

  const navButtonClassMemo = useCallback((isActive, layout) => {
    const base =
      layout === 'drawer'
        ? 'w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-[box-shadow,background-color,color]'
        : 'rounded-lg px-3 py-2 text-sm font-medium transition-[box-shadow,background-color,color] md:px-3.5 dark:rounded-xl'

    if (isActive) {
      return `${base} bg-[#3498DB] text-white shadow-[0_0_14px_rgba(52,152,219,0.45),0_4px_14px_rgba(52,152,219,0.12)] hover:bg-[#2d87c3] dark:bg-[#38bdf8] dark:shadow-[0_0_14px_rgba(56,189,248,0.65),0_0_28px_rgba(56,189,248,0.35)] dark:hover:bg-[#2cb3ef] md:px-4`
    }

    return `${base} text-[#555555] hover:text-[#333333] dark:border dark:border-[#3f3f3f] dark:bg-[#252525] dark:text-white dark:hover:border-[#505050] dark:hover:bg-[#2a2a2a]`
  }, [])

  const goHome = useCallback((e) => {
    e.preventDefault()
    onNavChange('Home')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const main = document.getElementById('main-content')
    main?.focus({ preventScroll: true })
  }, [onNavChange])

  const activateNav = useCallback((label) => {
    onNavChange(label)
    if (label === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [onNavChange])

  const preloadNav = useCallback((label) => {
    preloadComponent(label)
  }, [])

  const toggleTheme = useCallback(() => {
    const newIsDark = !isDark
    document.documentElement.classList.toggle('dark')
    setIsDark(newIsDark)
    
    // Save preference to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    }
  }, [isDark])

  const toggleSearch = useCallback(() => {
    setSearchOpen((o) => !o)
  }, [])

  const submitSearch = useCallback(() => {
    runGoogleSearch(searchQuery)
    setSearchOpen(false)
  }, [searchQuery])

  const selectNav = useCallback((label) => {
    activateNav(label)
    setMenuOpen(false)
  }, [activateNav])

  useEffect(() => {
    if (!searchOpen) return

    const onPointerDown = (e) => {
      if (
        searchPopoverRef.current &&
        !searchPopoverRef.current.contains(e.target)
      ) {
        setSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [searchOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return
      if (searchOpen) {
        setSearchOpen(false)
        return
      }
      if (menuOpen) setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [searchOpen, menuOpen])

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <header className="border-b border-neutral-200/90 bg-[#fff9f5] dark:border-[#2a2a2a] dark:bg-[#1a1a1a] fixed top-0 left-0 right-0 z-50">
      <nav
        className="relative mx-auto flex h-[4.25rem] max-w-[1400px] items-center justify-between gap-3 px-5 sm:gap-4 sm:px-8 lg:px-10"
        aria-label="Main"
      >
        {/* Mobile: hamburger + brand */}
        <div className="flex min-w-0 flex-1 items-center gap-2 md:contents">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200/90 bg-white/90 text-[#333] shadow-[0_2px_14px_rgba(0,0,0,0.06)] transition-colors hover:bg-white md:hidden dark:border-[#3f3f3f] dark:bg-neutral-900 dark:text-white dark:shadow-none dark:hover:bg-neutral-800"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X className="h-5 w-5 stroke-[2]" />
            ) : (
              <Menu className="h-5 w-5 stroke-[2]" />
            )}
          </button>

          <div className="relative z-10 min-w-0 md:shrink-0">
            <Magnet padding={50} magnetStrength={50}>
              <a
                href="/"
                onClick={goHome}
                className="block truncate text-lg font-bold tracking-tight transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3498DB] dark:focus-visible:outline-[#38bdf8] sm:text-xl"
              >
                <span className="text-[#A366FF] dark:text-[#e8a090]">G.</span>
                <span className="text-[#A366FF] dark:text-[#7dd3fc]">Ajay</span>
              </a>
            </Magnet>
          </div>
        </div>

        {/* Desktop nav links */}
        <ul className="relative z-10 hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto py-1 md:flex md:gap-1.5 lg:gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NAV_LINKS.map((label) => {
            const isActive = activeNav === label
            return (
              <li key={label} className="shrink-0">
                <Magnet padding={50} magnetStrength={50}>
                  <button
                    type="button"
                    onClick={() => activateNav(label)}
                    onMouseEnter={() => preloadNav(label)}
                    className={navButtonClassMemo(isActive, 'bar')}
                  >
                    {label}
                  </button>
                </Magnet>
              </li>
            )
          })}
        </ul>

        {/* Utilities */}
        <div className="relative z-20 flex shrink-0 items-center gap-2 sm:gap-3.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/90 bg-white/90 text-amber-500 shadow-[0_2px_14px_rgba(0,0,0,0.06)] transition-[background-color,box-shadow] hover:bg-white dark:border-[#3f3f3f] dark:bg-neutral-900 dark:text-white dark:shadow-none dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Moon className="h-[1.15rem] w-[1.15rem] stroke-[1.75]" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] stroke-[1.75]" />
            )}
          </button>

          <div className="relative" ref={searchPopoverRef}>
            <Magnet padding={50} magnetStrength={50}>
              <button
                type="button"
                onClick={toggleSearch}
                aria-expanded={searchOpen}
                aria-haspopup="dialog"
                aria-controls="navbar-search-popover"
                className="flex h-10 items-center gap-2 rounded-full border border-neutral-100 bg-white px-3 text-sm font-medium text-[#333333] shadow-[0_2px_14px_rgba(0,0,0,0.06)] transition-[opacity,box-shadow] hover:opacity-95 sm:pl-3 sm:pr-5 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-sm"
              >
                <GoogleMark className="h-[18px] w-[18px] shrink-0" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </Magnet>

            {searchOpen ? (
              <div
                id="navbar-search-popover"
                role="dialog"
                aria-label="Search the web"
                className="absolute right-0 top-[calc(100%+0.5rem)] z-30 w-[min(calc(100vw-2rem),22rem)] rounded-xl border border-white/40 bg-white/35 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/35 dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)] max-[380px]:fixed max-[380px]:left-4 max-[380px]:right-4 max-[380px]:top-[4.5rem] max-[380px]:w-auto"
              >
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    submitSearch()
                  }}
                >
                  <div className="relative min-w-0 flex-1">
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Google…"
                      autoComplete="off"
                      className="w-full rounded-lg border border-neutral-200/60 bg-white/50 py-2.5 pl-3 pr-3 text-sm text-[#333] placeholder:text-neutral-500 outline-none ring-[#3498DB]/30 focus:border-[#3498DB]/50 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-400 dark:ring-[#38bdf8]/25 dark:focus:border-[#38bdf8]/40"
                    />
                  </div>
                  <Magnet
                    padding={50}
                    magnetStrength={50}
                    disabled={!searchQuery.trim()}
                  >
                    <button
                      type="submit"
                      disabled={!searchQuery.trim()}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3498DB] text-white shadow-sm transition-[background-color,opacity] hover:bg-[#2d87c3] disabled:pointer-events-none disabled:opacity-40 dark:bg-[#38bdf8] dark:hover:bg-[#2cb3ef]"
                      aria-label="Search"
                    >
                      <SearchIcon className="h-[18px] w-[18px] stroke-2" />
                    </button>
                  </Magnet>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Mobile drawer: slides from left */}
      <div
        className={`fixed inset-0 z-[70] md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        inert={!menuOpen ? true : undefined}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          className={`absolute inset-0 bg-black/45 transition-opacity duration-200 ease-out dark:bg-black/60 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />

        <aside
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute left-0 top-0 flex h-full w-[min(20rem,88vw)] max-w-full flex-col border-r border-neutral-200/80 bg-[#fff9f5]/95 shadow-[4px_0_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-300 ease-out dark:border-[#2a2a2a] dark:bg-[#1a1a1a]/95 dark:shadow-[4px_0_32px_rgba(0,0,0,0.5)] ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-neutral-200/80 px-4 dark:border-[#2a2a2a]">
            <span className="text-sm font-semibold text-[#333] dark:text-neutral-200">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#555] transition-colors hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 stroke-[2]" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            <ul className="flex flex-col gap-1.5">
              {NAV_LINKS.map((label) => {
                const isActive = activeNav === label
                return (
                  <li key={label}>
                    <Magnet padding={50} magnetStrength={50}>
                      <button
                        type="button"
                        onClick={() => selectNav(label)}
                        onMouseEnter={() => preloadNav(label)}
                        className={navButtonClassMemo(isActive, 'drawer')}
                      >
                        {label}
                      </button>
                    </Magnet>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </header>
  )
})
