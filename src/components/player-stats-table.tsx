'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayerStats } from '@/lib/api';
import { getWinRateColor, formatKDA, cn } from '@/lib/utils';

interface PlayerStatsTableProps {
  stats: PlayerStats[];
}

export function PlayerStatsTable({ stats }: PlayerStatsTableProps) {
  const [filter, setFilter] = useState<'all' | 'blue' | 'red'>('all');
  
  const filteredStats = filter === 'all' 
    ? stats 
    : stats.filter(stat => stat.side === filter);

  const groupedStats = filteredStats.reduce((acc, stat) => {
    if (!acc[stat.player]) {
      acc[stat.player] = [];
    }
    acc[stat.player].push(stat);
    return acc;
  }, {} as Record<string, PlayerStats[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Player Champion Stats</h2>
        <div className="flex space-x-2">
          {(['all', 'blue', 'red'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className={cn(
                'transition-all duration-300',
                filter === filterType 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              )}
            >
              {filterType === 'all' ? 'All' : filterType === 'blue' ? 'Blue Side' : 'Red Side'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(groupedStats).map(([player, playerStats]) => (
          <Card key={player} className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-white">{player}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-6 gap-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                  <div>ICON</div>
                  <div>G</div>
                  <div>WR%</div>
                  <div>KDA</div>
                  <div>DMG</div>
                  <div>CS</div>
                </div>
                {playerStats.map((stat, index) => (
                  <div key={index} className="grid grid-cols-6 gap-2 items-center text-sm">
                    <div className="w-6 h-6 rounded overflow-hidden">
                      <img 
                        src={stat.championId ? `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${stat.champion}.png` : '/placeholder-champion.svg'}
                        alt={stat.champion}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-champion.svg';
                        }}
                      />
                    </div>
                    <div className="text-white">{stat.games}</div>
                    <div className={getWinRateColor(stat.winRate)}>
                      {stat.winRate.toFixed(1)}
                    </div>
                    <div className="text-white">{formatKDA(stat.kda)}</div>
                    <div className="text-white">{stat.damage.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                    <div className="text-white">{stat.cs.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
