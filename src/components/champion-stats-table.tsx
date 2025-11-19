import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChampionStats } from '@/lib/api';
import { getWinRateColor } from '@/lib/utils';

interface ChampionStatsTableProps {
  stats: ChampionStats[];
}

export function ChampionStatsTable({ stats }: ChampionStatsTableProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">OVERALL CHAMPION STATS</h2>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-sm font-medium text-gray-300">ICON</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">CHAMPION</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">PICKS</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">BANS</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">PRESENCE%</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">WINRATE%</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">PICKRATE%</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">BANRATE%</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((champion, index) => (
                  <tr key={index} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-750">
                    <td className="p-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src={champion.championId ? `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champion.champion}.png` : '/placeholder-champion.svg'}
                          alt={champion.champion}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-champion.svg';
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-4 text-white font-medium">{champion.champion}</td>
                    <td className="p-4 text-white">{champion.picks}</td>
                    <td className="p-4 text-white">{champion.bans}</td>
                    <td className="p-4 text-white">{champion.presence.toFixed(1)}</td>
                    <td className={`p-4 font-semibold ${getWinRateColor(champion.winRate)}`}>
                      {champion.winRate.toFixed(1)}
                    </td>
                    <td className="p-4 text-white">{champion.pickRate.toFixed(1)}</td>
                    <td className="p-4 text-white">{champion.banRate.toFixed(1)}</td>
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
