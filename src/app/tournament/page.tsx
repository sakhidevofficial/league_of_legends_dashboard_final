'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { ChampionStatsTable } from '@/components/champion-stats-table';
import { gridApi, OverallStats, ChampionStats } from '@/lib/api';

export default function TournamentPage() {
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [championStats, setChampionStats] = useState<ChampionStats[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [stats, championData] = await Promise.all([
        gridApi.getTournamentStats(),
        gridApi.getChampionStats()
      ]);
      setOverallStats(stats);
      setChampionStats(championData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="text-white text-lg">Loading tournament data...</div>
        </div>
      </div>
    );
  }

  if (!overallStats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-red-500 text-6xl">⚠️</div>
          <div className="text-white text-xl">Failed to load tournament data</div>
          <button 
            onClick={fetchData}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Tournament Stats</h1>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={fetchData}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Update Tournament Data
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">View Stats:</span>
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white">
              <option>-- Overall Tournament --</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overall Tournament Statistics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Overall Tournament Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Games"
            games={overallStats.totalGames}
            winRate={0}
            wins={0}
            losses={0}
            className="text-center"
          />
          <StatsCard
            title="Blue Side Win Rate"
            games={overallStats.blueSideGames}
            winRate={overallStats.blueSideWinRate}
            wins={overallStats.blueSideWins}
            losses={overallStats.blueSideLosses}
            side="blue"
          />
          <StatsCard
            title="Red Side Win Rate"
            games={overallStats.redSideGames}
            winRate={overallStats.redSideWinRate}
            wins={overallStats.redSideWins}
            losses={overallStats.redSideLosses}
            side="red"
          />
        </div>
      </div>

      {/* Champion Stats Table */}
      <ChampionStatsTable stats={championStats} />
    </div>
  );
}
