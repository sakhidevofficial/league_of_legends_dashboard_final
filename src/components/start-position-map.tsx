'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PlayerPosition {
  id: string;
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  team: 'blue' | 'red';
  champion: string;
  role: 'TOP' | 'JGL' | 'MID' | 'BOT' | 'SUP';
}

interface StartPositionMapProps {
  gameTitle: string;
  result: 'Win' | 'Loss';
  playerPositions: PlayerPosition[];
  currentTime?: string;
  className?: string;
}

const mapImageUrl = 'https://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png';

export function StartPositionMap({ 
  gameTitle, 
  result, 
  playerPositions, 
  currentTime,
  className 
}: StartPositionMapProps) {
  const getChampionIconUrl = (championName: string) => {
    if (!championName) return '/placeholder-champion.svg';
    return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${championName}.png`;
  };

  return (
    <Card className={cn(
      'bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300',
      className
    )}>
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <h3 className="text-sm font-semibold text-white mb-1">
            {gameTitle}
          </h3>
          <p className={cn(
            'text-xs font-medium',
            result === 'Win' ? 'text-green-400' : 'text-red-400'
          )}>
            Result: {result}
          </p>
        </div>
        
        <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
          {/* Summoner's Rift Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${mapImageUrl})` }}
          />
          
          {/* Player Positions */}
          {playerPositions.map((player) => (
            <div
              key={player.id}
              className={cn(
                'absolute w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer',
                'hover:scale-125 hover:z-10',
                player.team === 'blue' 
                  ? 'border-blue-400 bg-blue-500/80 shadow-lg shadow-blue-500/50' 
                  : 'border-red-400 bg-red-500/80 shadow-lg shadow-red-500/50'
              )}
              style={{ 
                left: `${player.x}%`, 
                top: `${player.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={`${player.champion} (${player.role})`}
            >
              <img
                src={getChampionIconUrl(player.champion)}
                alt={player.champion}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-champion.svg';
                }}
              />
            </div>
          ))}
        </div>
        
        {currentTime && (
          <div className="text-center mt-2">
            <p className="text-xs text-gray-400">Time: {currentTime}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

