import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthStart } from './pages/AuthStart.tsx'
import { Config } from './pages/Config.tsx'
import { Privacy } from './pages/Privacy.tsx'
import { TermsOfUse } from './pages/TermsOfUse.tsx'
import { Tab } from './pages/Tab.tsx'
import { Layout } from './components/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="tab" element={<Tab />} />
          <Route path="config" element={<Config />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms-of-use" element={<TermsOfUse />} />
        </Route>
        <Route path="/auth-start" element={<AuthStart />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
