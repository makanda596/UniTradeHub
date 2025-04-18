import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

createRoot(document.getElementById('root')).render(
    <StrictMode >
    <App />
    </StrictMode>
)
//delte the strictmode so as to render once
serviceWorkerRegistration.register();