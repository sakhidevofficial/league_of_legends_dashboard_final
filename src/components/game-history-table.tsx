'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameHistoryEntry {
  date: string;
  patch: string;
  blueTeam: string;
  redTeam: string;
  blueBans: string[];
  bluePicks: string[];
  redPicks: string[];
  redBans: string[];
  result: 'win' | 'loss';
  duration: string;
}

interface GameHistoryTableProps {
  games: GameHistoryEntry[];
}

export function GameHistoryTable({ games }: GameHistoryTableProps) {
  const getChampionIconUrl = (championName: string) => {
    if (!championName || championName === '?') return '/placeholder-champion.svg';
    return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${championName}.png`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Use deterministic formatting to avoid hydration issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Game History (All Time)</h2>
      
      <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700 shadow-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">DATE</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">PATCH</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">BLUE TEAM</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">B BANS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">B PICKS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">R PICKS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">R BANS</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">RED TEAM</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">RESULT</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">DURATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {games.map((game, index) => (
                  <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-300 font-mono">
                      {formatDate(game.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      {game.patch}
                    </td>
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {game.blueTeam}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-1">
                        {game.blueBans.map((champion, i) => (
                          <div key={i} className="w-6 h-6 rounded border border-gray-600 overflow-hidden">
                            <img
                              src={getChampionIconUrl(champion)}
                              alt={champion}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-champion.svg';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-1">
                        {game.bluePicks.map((champion, i) => (
                          <div key={i} className="w-6 h-6 rounded border border-gray-600 overflow-hidden">
                            <img
                              src={getChampionIconUrl(champion)}
                              alt={champion}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-champion.svg';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-1">
                        {game.redPicks.map((champion, i) => (
                          <div key={i} className="w-6 h-6 rounded border border-gray-600 overflow-hidden">
                            <img
                              src={getChampionIconUrl(champion)}
                              alt={champion}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-champion.svg';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-1">
                        {game.redBans.map((champion, i) => (
                          <div key={i} className="w-6 h-6 rounded border border-gray-600 overflow-hidden">
                            <img
                              src={getChampionIconUrl(champion)}
                              alt={champion}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-champion.svg';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {game.redTeam}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'text-sm font-medium px-2 py-1 rounded',
                        game.result === 'win' 
                          ? 'text-green-400 bg-green-400/10' 
                          : 'text-red-400 bg-red-400/10'
                      )}>
                        {game.result === 'win' ? 'Win' : 'Loss'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300 font-mono">
                      {game.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

