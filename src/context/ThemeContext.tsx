import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'portfolio-theme'
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [hasRestoredTheme, setHasRestoredTheme] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY)
    const restoredTheme =
      storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark'
    setTheme(restoredTheme)
    document.documentElement.classList.toggle('dark', restoredTheme === 'dark')
    document.documentElement.classList.toggle('light', restoredTheme === 'light')
    setHasRestoredTheme(true)
  }, [])

  useEffect(() => {
    if (!hasRestoredTheme) return
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [hasRestoredTheme, theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <div className="min-h-screen">{children}</div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
