import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Persona = "client" | "recruiter" | "curious" | null;
export type PersonaView = "VIEW_SHOWCASE" | "VIEW_TECHNICAL" | null;

interface PersonaContextValue {
  persona: Persona;
  view: PersonaView;
  isIntroComplete: boolean;
  shouldAnimateIntroExit: boolean;
  selectPersona: (persona: Exclude<Persona, null>) => void;
  reopenIntro: () => void;
}

const PersonaContext = createContext<PersonaContextValue | undefined>(
  undefined,
);
const STORAGE_KEY = "user_persona";
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function getStoredPersona(): Exclude<Persona, null> | null {
  if (typeof window === "undefined") return null;
  const storedPersona = sessionStorage.getItem(STORAGE_KEY);
  return storedPersona === "client" ||
    storedPersona === "recruiter" ||
    storedPersona === "curious"
    ? storedPersona
    : null;
}

function getViewForPersona(persona: Persona): PersonaView {
  return persona === "recruiter"
    ? "VIEW_TECHNICAL"
    : persona
      ? "VIEW_SHOWCASE"
      : null;
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [shouldAnimateIntroExit, setShouldAnimateIntroExit] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const storedPersona = getStoredPersona();
    if (storedPersona) {
      setPersona(storedPersona);
      setIsIntroComplete(true);
      setShouldAnimateIntroExit(false);
    }
  }, []);

  const selectPersona = useCallback((nextPersona: Exclude<Persona, null>) => {
    setPersona(nextPersona);
    setIsIntroComplete(true);
    setShouldAnimateIntroExit(true);
    sessionStorage.setItem(STORAGE_KEY, nextPersona);
  }, []);

  // Preserves current persona so background state doesn't flash to null
  const reopenIntro = useCallback(() => {
    setIsIntroComplete(false);
    setShouldAnimateIntroExit(true);
  }, []);

  const value = useMemo(
    () => ({
      persona,
      view: getViewForPersona(persona),
      isIntroComplete,
      shouldAnimateIntroExit,
      selectPersona,
      reopenIntro,
    }),
    [isIntroComplete, persona, reopenIntro, selectPersona, shouldAnimateIntroExit],
  );

  return (
    <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);

  if (!context) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }

  return context;
}
