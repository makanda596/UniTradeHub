import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
console.log(import.meta.env);

createRoot(document.getElementById('root')).render(
    <StrictMode >
    <App />
    </StrictMode>
)
//delte the strictmode so as to render once