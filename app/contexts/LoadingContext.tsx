'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    registerSection: (sectionName: string) => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

// Define all expected sections
const EXPECTED_SECTIONS = [
    'hero',
    'gallery',
    'about',
    'programs',
    'curriculum',
    'features',
    'faculty',
    'footer',
];

interface LoadingProviderProps {
    children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [registeredSections] = useState<Set<string>>(new Set());

    const registerSection = useCallback((sectionName: string) => {
        registeredSections.add(sectionName);

        // Check if all expected sections are registered
        const allRegistered = EXPECTED_SECTIONS.every(section =>
            registeredSections.has(section)
        );

        if (allRegistered) {
            // Small delay to ensure DOM is painted
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        }
    }, [registeredSections]);

    return (
        <LoadingContext.Provider value={{ isLoading, registerSection }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
