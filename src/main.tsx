import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthStart } from './pages/AuthStart.tsx'
import { Config } from './pages/Config.tsx'
import { Privacy } from './pages/Privacy.tsx'
import { TermsOfUse } from './pages/TermsOfUse.tsx'
import { Tab } from './pages/Tab.tsx'
import { Layout } from './components/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/tab',
        element: <Tab />,
      },
      {
        path: '/config',
        element: <Config />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/terms-of-use',
        element: <TermsOfUse />,
      },
    ],
  },
  {
    path: '/auth-start',
    element: <AuthStart />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
