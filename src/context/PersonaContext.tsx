import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Persona = 'client' | 'recruiter' | 'curious' | null
export type PersonaView = 'VIEW_SHOWCASE' | 'VIEW_TECHNICAL' | null

interface PersonaContextValue {
  persona: Persona
  view: PersonaView
  isIntroComplete: boolean
  selectPersona: (persona: Exclude<Persona, null>) => void
  reopenIntro: () => void
}

const PersonaContext = createContext<PersonaContextValue | undefined>(undefined)
const STORAGE_KEY = 'user_persona'

export function getStoredPersona(): Exclude<Persona, null> | null {
  const storedPersona = sessionStorage.getItem(STORAGE_KEY)
  return storedPersona === 'client' || storedPersona === 'recruiter' || storedPersona === 'curious'
    ? storedPersona
    : null
}

function getViewForPersona(persona: Persona): PersonaView {
  return persona === 'recruiter' ? 'VIEW_TECHNICAL' : persona ? 'VIEW_SHOWCASE' : null
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>(getStoredPersona)
  const [isIntroComplete, setIsIntroComplete] = useState(() => getStoredPersona() !== null)

  const selectPersona = useCallback((nextPersona: Exclude<Persona, null>) => {
    setPersona(nextPersona)
    setIsIntroComplete(true)
    sessionStorage.setItem(STORAGE_KEY, nextPersona)
  }, [])

  const reopenIntro = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    setPersona(null)
    setIsIntroComplete(false)
  }, [])

  const value = useMemo(
    () => ({
      persona,
      view: getViewForPersona(persona),
      isIntroComplete,
      selectPersona,
      reopenIntro,
    }),
    [isIntroComplete, persona, reopenIntro, selectPersona],
  )

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
}

export function usePersona() {
  const context = useContext(PersonaContext)

  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider')
  }

  return context
}
