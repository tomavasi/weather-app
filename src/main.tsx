import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DataContextProvider } from "./context/DataContext"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataContextProvider>
    <App />
    </DataContextProvider>
  </React.StrictMode>,
)
