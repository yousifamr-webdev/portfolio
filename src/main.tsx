import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { PersonaProvider } from './context/PersonaContext'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PersonaProvider>
          <App />
        </PersonaProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
