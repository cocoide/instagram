import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Router from './pages/Router'

const container = document.getElementById('index')
const root = createRoot(container!)

root.render(
  <StrictMode>
    <Router />
  </StrictMode>
)
