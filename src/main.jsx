import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import myRouter from './route/Router'
import { RouterProvider } from 'react-router-dom'
import Provider from './lib/Provider'
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <Provider>
    <Toaster />
    <RouterProvider router={myRouter} />
    </Provider>
  </StrictMode>,
)
