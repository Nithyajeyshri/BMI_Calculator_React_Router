import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BMI from './bmi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BMI />
  </StrictMode>,
)
