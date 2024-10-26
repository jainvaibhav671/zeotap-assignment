import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App2 from "@/App2.tsx"
import App1 from "@/App1.tsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import Layout from './Layout'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
    },
    {
        path: "/app1",
        element: <App1 />
    },
    {
        path: "/app2",
        element: <App2 />,
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
