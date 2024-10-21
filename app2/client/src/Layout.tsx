import { LoaderFunction, Outlet, redirect, useLoaderData } from "react-router-dom"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { isAuthenticated } from "@/lib/utils"

export const loader: LoaderFunction = async () => {
    const authorized = await isAuthenticated()
    console.log(authorized)

    if (!authorized) return redirect("/login")

    return {
        authorized
    }
}

const Layout = () => {

    const loaderData: any = useLoaderData()

    return (
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <div className="flex flex-col h-screen">
                <Header authorized={loaderData.authorized} />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Layout
