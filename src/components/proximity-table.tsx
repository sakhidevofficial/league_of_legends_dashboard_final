'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProximityData {
  champion: string;
  championId: number;
  games: number;
  winRate: number;
  proximity: {
    top: number;
    mid: number;
    adc: number;
    sup: number;
  };
  timeIntervals: {
    '0-5': { top: number; mid: number; adc: number; sup: number };
    '5-14': { top: number; mid: number; adc: number; sup: number };
    '14-20': { top: number; mid: number; adc: number; sup: number };
    '20-24': { top: number; mid: number; adc: number; sup: number };
    '24-30': { top: number; mid: number; adc: number; sup: number };
    '30+': { top: number; mid: number; adc: number; sup: number };
  };
}

interface ProximityTableProps {
  data: ProximityData[];
  className?: string;
}

export function ProximityTable({ data, className }: ProximityTableProps) {
  const getChampionIconUrl = (championName: string) => {
    if (!championName) return '/placeholder-champion.svg';
    return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${championName}.png`;
  };

  const highlightValue = (value: number) => {
    return value >= 30; // Highlight values >= 30%
  };

  const timeIntervals = ['0-5', '5-14', '14-20', '20-24', '24-30', '30+'] as const;
  const roles = ['top', 'mid', 'adc', 'sup'] as const;

  return (
    <Card className={`bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700 shadow-lg ${className}`}>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  CHAMPION
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  GAMES
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  WINRATE %
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider" colSpan={4}>
                  PROXIMITY %
                </th>
                {timeIntervals.map((interval) => (
                  <th key={interval} className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider" colSpan={4}>
                    {interval === '30+' ? '30+ MIN' : `${interval} MIN`}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {/* Empty for CHAMPION column */}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {/* Empty for GAMES column */}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {/* Empty for WINRATE % column */}
                </th>
                {Array.from({ length: 7 }, (_, i) => (
                  <React.Fragment key={i}>
                    {roles.map((role) => (
                      <th key={role} className="px-2 py-2 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        {role.toUpperCase()}
                      </th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.map((champion, index) => (
                <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
                        <img
                          src={getChampionIconUrl(champion.champion)}
                          alt={champion.champion}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-champion.svg';
                          }}
                        />
                      </div>
                      <span className="font-medium">{champion.champion}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {champion.games}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {champion.winRate}%
                  </td>
                  
                  {/* PROXIMITY % */}
                  <td className="px-2 py-3 text-sm text-center">
                    <span className={cn(
                      highlightValue(champion.proximity.top) ? 'text-orange-400 font-semibold' : 'text-white'
                    )}>
                      {champion.proximity.top}%
                    </span>
                  </td>
                  <td className="px-2 py-3 text-sm text-center">
                    <span className={cn(
                      highlightValue(champion.proximity.mid) ? 'text-orange-400 font-semibold' : 'text-white'
                    )}>
                      {champion.proximity.mid}%
                    </span>
                  </td>
                  <td className="px-2 py-3 text-sm text-center">
                    <span className={cn(
                      highlightValue(champion.proximity.adc) ? 'text-orange-400 font-semibold' : 'text-white'
                    )}>
                      {champion.proximity.adc}%
                    </span>
                  </td>
                  <td className="px-2 py-3 text-sm text-center">
                    <span className={cn(
                      highlightValue(champion.proximity.sup) ? 'text-orange-400 font-semibold' : 'text-white'
                    )}>
                      {champion.proximity.sup}%
                    </span>
                  </td>

                  {/* Time Intervals */}
                  {timeIntervals.map((interval) => (
                    <React.Fragment key={interval}>
                      <td className="px-2 py-3 text-sm text-center">
                        <span className={cn(
                          highlightValue(champion.timeIntervals[interval].top) ? 'text-orange-400 font-semibold' : 'text-white'
                        )}>
                          {champion.timeIntervals[interval].top}%
                        </span>
                      </td>
                      <td className="px-2 py-3 text-sm text-center">
                        <span className={cn(
                          highlightValue(champion.timeIntervals[interval].mid) ? 'text-orange-400 font-semibold' : 'text-white'
                        )}>
                          {champion.timeIntervals[interval].mid}%
                        </span>
                      </td>
                      <td className="px-2 py-3 text-sm text-center">
                        <span className={cn(
                          highlightValue(champion.timeIntervals[interval].adc) ? 'text-orange-400 font-semibold' : 'text-white'
                        )}>
                          {champion.timeIntervals[interval].adc}%
                        </span>
                      </td>
                      <td className="px-2 py-3 text-sm text-center">
                        <span className={cn(
                          highlightValue(champion.timeIntervals[interval].sup) ? 'text-orange-400 font-semibold' : 'text-white'
                        )}>
                          {champion.timeIntervals[interval].sup}%
                        </span>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

