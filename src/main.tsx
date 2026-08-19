import React, { lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'

const Game = lazy(() =>
  import('./routes/Game').then((m) => ({ default: m.Game })),
)
const Classic = lazy(() =>
  import('./routes/Classic').then((m) => ({ default: m.Classic })),
)

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Game />} />
          <Route path="/classico" element={<Classic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
