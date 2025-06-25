'use client'

import { useLayoutEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { authVerify } from '@/libs/utils/utils';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useLayoutEffect(() => {
    const verifyAuth = async () => {
      setAuthStatus('loading');
      const { status, session } = await authVerify();
      setAuthStatus(status);

      if (status === 'unauthenticated') {
        router.push('/login');
      }
    };

    verifyAuth();
  }, [pathname, searchParams, router]);

  if (authStatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') return null;

  return <>{children}</>;
}
