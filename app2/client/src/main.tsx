import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import Layout, { loader as layoutLoader } from "@/Layout.tsx"
import LoginForm, { loader as loginLoader } from '@/components/LoginForm.tsx'
import RegisterForm, { loader as registerLoader } from '@/components/RegisterForm.tsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { loginAction, registerAction } from '@/lib/actions.ts'
import WeatherModal, { loader as weatherModalLoader } from '@/components/WeatherModal.tsx'

import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        loader: layoutLoader,
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />,
                children: [
                    {
                        path: "/:city",
                        loader: weatherModalLoader,
                        element: <WeatherModal />
                    }
                ]
            },
        ],
    },
    {
        path: "/login",
        action: loginAction,
        loader: loginLoader,
        element: <LoginForm />
    },
    {
        path: "/register",
        loader: registerLoader,
        action: registerAction,
        element: <RegisterForm />
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
