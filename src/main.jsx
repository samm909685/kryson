import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


// Support old HashRouter QR codes
if (
  window.location.hash.startsWith("#/verify/") &&
  !window.location.pathname.startsWith("/verify/")
) {
  const token = window.location.hash.replace("#/verify/", "");
  window.history.replaceState({}, "", `/verify/${token}`);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
