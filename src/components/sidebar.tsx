'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Scrims', href: '/scrims' },
  { name: 'Tournament', href: '/tournament' },
  { name: 'Wards', href: '/wards' },
  { name: 'Proximity', href: '/proximity' },
  { name: 'Start Positions', href: '/start-positions' },
  { name: 'SoloQ Stats', href: '/soloq' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-white">Gamespace</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4">
        <p className="text-xs text-gray-400">© 2025</p>
      </div>
    </div>
  );
}
