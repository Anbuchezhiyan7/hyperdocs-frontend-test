'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { apiGoogleLogin, apiGetUserDetails } from '@/lib/api/auth';
import { apiGetGithubStatus } from '@/lib/api/github';

export interface AuthUser {
    user_id: string;
    email: string;
    name: string;
    picture: string;
    access_token: string;
    published: boolean;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    loginWithGoogle: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const protectedRoutes = ['/admin', '/site-details', '/connect-repo'];

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const stored = Cookies.get('user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const token = Cookies.get('token');

    useQuery({
        queryKey: ['user_details'],
        enabled: !!token,
        queryFn: async () => {
            setIsLoading(true);
            try {
                const response = await apiGetUserDetails();
                setUser(response.data);
                return response.data;
            } catch {
                Cookies.remove('token');
                Cookies.remove('user');
                router.replace('/login');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
    });

    const signOut = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        Cookies.remove('email');
        Cookies.remove('username');
        Cookies.remove('hd_user_id');
        setUser(null);
        router.push('/login');
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            setIsLoading(true);

            const response = await apiGoogleLogin(access_token);
            const { success, data, message } = response;

            if (success) {
                Cookies.set('token', data?.access_token, { expires: 30 });
                Cookies.set('user', JSON.stringify(data), { expires: 30 });
                setUser(data);

                if (data?.is_new_user) {
                    router.push('/onboarding');
                } else {
                    router.push('/admin');
                }
            } else {
                toast.error(message || 'Login failed. Please try again.');
            }

            setIsLoading(false);
        },
        onError: () => {
            setIsLoading(false);
            toast.error('Google sign-in was cancelled or failed. Please try again.');
        },
    });

    return (
        <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
