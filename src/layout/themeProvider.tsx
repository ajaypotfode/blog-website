"use client"
import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemeProvider>) => {
    return (
        <NextThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            {...props}
        >
            {children}
        </NextThemeProvider>
    )
}

export default ThemeProvider