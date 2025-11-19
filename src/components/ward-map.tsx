'use client';

import { Card, CardContent } from '@/components/ui/card';

interface WardPoint {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  type: 'vision' | 'control' | 'stealth';
}

interface WardMapProps {
  timeRange: string;
  wardCount: number;
  wardPoints: WardPoint[];
  className?: string;
}

export function WardMap({ timeRange, wardCount, wardPoints, className }: WardMapProps) {
  return (
    <Card className={`bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <h3 className="text-sm font-semibold text-white">
            {timeRange} ({wardCount} wards)
          </h3>
        </div>
        
        <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden">
          {/* Summoner's Rift Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png')`,
              backgroundSize: 'cover',
              opacity: 0.8
            }}
          />
          
          {/* Ward Points Overlay */}
          <div className="absolute inset-0">
            {wardPoints.map((ward, index) => (
              <div
                key={index}
                className="absolute w-3 h-3 bg-green-400 rounded-full shadow-lg border-2 border-green-300 animate-pulse"
                style={{
                  left: `${ward.x}%`,
                  top: `${ward.y}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)'
                }}
                title={`Ward ${index + 1} - ${ward.type}`}
              />
            ))}
          </div>
          
          {/* Map Overlay for better visibility */}
          <div className="absolute inset-0 bg-black/20 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}






