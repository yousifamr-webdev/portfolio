import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { PersonaProvider } from './context/PersonaContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <PersonaProvider>
        <App />
      </PersonaProvider>
    </ThemeProvider>
  </StrictMode>,
)
