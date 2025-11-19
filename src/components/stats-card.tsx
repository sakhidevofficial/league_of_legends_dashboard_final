import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  games: number;
  winRate: number;
  wins: number;
  losses: number;
  side?: 'blue' | 'red';
  className?: string;
}

export function StatsCard({ title, games, winRate, wins, losses, side, className }: StatsCardProps) {
  const getWinRateColor = (rate: number) => {
    if (rate >= 60) return 'text-green-400';
    if (rate >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBorderColor = () => {
    if (side === 'blue') return 'border-l-blue-500';
    if (side === 'red') return 'border-l-red-500';
    return 'border-l-gray-500';
  };

  const getBackgroundGradient = () => {
    if (side === 'blue') return 'from-blue-900/30 to-blue-800/20';
    if (side === 'red') return 'from-red-900/30 to-red-800/20';
    return 'from-gray-800/80 to-gray-900/60';
  };

  const isTotalCard = title === 'Total';
  
  return (
    <Card className={cn(
      'bg-gradient-to-br border-2 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 backdrop-blur-sm border-gray-700',
      getBackgroundGradient(),
      getBorderColor(),
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-white">
            {title}
          </CardTitle>
          <div className={cn(
            'w-3 h-3 rounded-full',
            side === 'blue' ? 'bg-blue-500' : side === 'red' ? 'bg-red-500' : 'bg-gray-500'
          )}></div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-5xl font-bold text-white mb-4 tracking-tight">
          {games}
        </div>
        
        {!isTotalCard && (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
              <span className="text-gray-300 font-medium">Win Rate</span>
              <span className={cn('font-bold text-xl', getWinRateColor(winRate))}>
                {winRate.toFixed(1)}%
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between items-center p-2 bg-green-900/20 rounded-lg border border-green-500/20">
                <span className="text-green-300 text-sm font-medium">Wins</span>
                <span className="text-green-400 font-bold">{wins}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-900/20 rounded-lg border border-red-500/20">
                <span className="text-red-300 text-sm font-medium">Losses</span>
                <span className="text-red-400 font-bold">{losses}</span>
              </div>
            </div>
          </div>
        )}
        
        {isTotalCard && (
          <div className="text-gray-400 font-medium">
            Total Games Played
          </div>
        )}
      </CardContent>
    </Card>
  );
}