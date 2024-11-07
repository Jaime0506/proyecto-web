import React from "react"

interface AuthLayoutProps {
    children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main
            className="w-full flex items-center justify-center h-screen"
        >
            {children}
        </main>
    )
}
