export const BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    : process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
export const DOMAIN_SUFFIX = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN_SUFFIX || 'hyperdocs.cloud';
export const DEV_USER_ID = process.env.NEXT_PUBLIC_DEV_USER_ID || 'cf1fa78a-ab9e-4ae2-8246-6cfae4abe65a';
export const PROTECTED_ROUTES = ['/admin', '/connect-repo', '/site-details', '/onboarding'];