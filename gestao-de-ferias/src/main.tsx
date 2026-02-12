import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GestaoDeFerias from './GestaoDeFerias/ContainerPrincipal'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GestaoDeFerias />
  </StrictMode>,
)
