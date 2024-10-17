import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WeatherApp } from './WeatherApp'
import './styles/weater.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherApp />
  </StrictMode>,
)
