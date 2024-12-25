import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import myRouter from './route/Router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter} />
  </StrictMode>,
)
