'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Add no-transition class to prevent flash on load
        document.documentElement.classList.add('no-transition');

        // Always default to light mode
        setIsDarkMode(false);

        // Remove no-transition class after a brief delay to enable smooth transitions
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.classList.remove('no-transition');
            });
        });
    }, []);

    useEffect(() => {
        if (mounted) {
            // Update document class and localStorage
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }, [isDarkMode, mounted]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    // Return default values if context is not available (during SSR)
    if (context === undefined) {
        return {
            isDarkMode: false,
            toggleDarkMode: () => { },
        };
    }
    return context;
}
