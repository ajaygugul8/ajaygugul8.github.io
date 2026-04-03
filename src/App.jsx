import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { NAV_VIEWS } from './components/navViews'
const WelcomeFlow = lazy(() => import('./components/WelcomeFlow'))
import { PORTFOLIO_ONBOARDING_KEY } from './components/onboardingKey'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3498DB] dark:border-[#38bdf8]"></div>
    </div>
  )
}

function readOnboardingDone() {
  try {
    return sessionStorage.getItem(PORTFOLIO_ONBOARDING_KEY) === '1'
  } catch {
    return false
  }
}

function getActiveNavFromURL() {
  if (typeof window === 'undefined') return 'Home'
  const hash = window.location.hash.slice(1)
  const validNavs = Object.keys(NAV_VIEWS)
  return validNavs.includes(hash) ? hash : 'Home'
}

function App() {
  const [onboardingDone, setOnboardingDone] = useState(readOnboardingDone)
  const [activeNav, setActiveNav] = useState(getActiveNavFromURL)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveNav(getActiveNavFromURL())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavChange = useCallback((nav) => {
    setActiveNav(nav)
    if (nav === 'Home') {
      window.location.hash = ''
      window.history.replaceState(null, '', window.location.pathname)
    } else {
      window.location.hash = nav
    }
  }, [])

  if (!onboardingDone) {
    return (
      <Suspense fallback={null}>
        <WelcomeFlow onComplete={() => setOnboardingDone(true)} />
      </Suspense>
    )
  }

  const ActiveView = NAV_VIEWS[activeNav] ?? NAV_VIEWS.Home

  return (
    <div className="min-h-svh bg-[#fff9f5] dark:bg-neutral-950 flex flex-col">
      <Navbar activeNav={activeNav} onNavChange={handleNavChange} />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 outline-none flex-1 pt-20"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <div className="animate-fadeIn">
            <ActiveView key={activeNav} />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App