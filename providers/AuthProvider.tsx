import { Session } from '@supabase/supabase-js';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Authentication context type definition
 */
interface AuthContextType {
    /** Current user session or null if not authenticated */
    session: Session | null;
    /** Function to manually set session state */
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    /** Loading state for initial auth check */
    isLoading: boolean;
}

/**
 * Props for AuthProvider component
 */
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 * 
 * Manages global authentication state and provides auth context to the app.
 * Handles session persistence, auto-refresh, and auth state changes.
 * 
 * @param children - Child components that will have access to auth context
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        /**
         * Initialize authentication state
         */
        const initializeAuth = async () => {
            try {
                // Get initial session
                const { data, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error('Error getting initial session:', error.message);
                } else if (mounted) {
                    setSession(data.session ?? null);
                }
            } catch (error) {
                console.error('Unexpected error during auth initialization:', error);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log('Auth state changed:', event);
                
                if (mounted) {
                    setSession(session ?? null);
                    setIsLoading(false);
                }
            }
        );

        initializeAuth();

        // Cleanup function
        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const contextValue: AuthContextType = {
        session,
        setSession,
        isLoading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Custom hook to access authentication context
 * 
 * @returns Authentication context containing session, setSession, and isLoading
 * @throws Error if used outside of AuthProvider
 * 
 * @example
 * ```tsx
 * const { session, isLoading } = useAuth();
 * 
 * if (isLoading) return <LoadingScreen />;
 * if (!session) return <LoginScreen />;
 * return <AuthenticatedApp />;
 * ```
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    
    return context;
};