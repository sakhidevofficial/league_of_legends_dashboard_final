'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export function NoSSR<T extends object>(Component: ComponentType<T>) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-700 rounded h-8 w-full"></div>
  });
}




