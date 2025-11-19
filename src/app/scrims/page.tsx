'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { PlayerStatsTable } from '@/components/player-stats-table';
import { GameHistoryTable } from '@/components/game-history-table';
import { ClientOnly } from '@/components/client-only';
import { gridApi, OverallStats, PlayerStats } from '@/lib/api';
import { GameHistoryEntry } from '@/lib/jsonl-processor';

export default function ScrimsPage() {
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [gameHistory, setGameHistory] = useState<GameHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all');

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching scrim data...');
      const [stats, playerData, historyData] = await Promise.all([
        gridApi.getScrimStats(),
        gridApi.getPlayerChampionStats(),
        gridApi.getGameHistory()
      ]);
      console.log('Stats received:', stats);
      console.log('Player data received:', playerData);
      console.log('Game history received:', historyData);
      setOverallStats(stats);
      setPlayerStats(playerData);
      setGameHistory(historyData);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-blue-200 opacity-20"></div>
          </div>
          <div className="text-white text-xl font-medium">Loading scrim data...</div>
          <div className="text-gray-400 text-sm">Processing JSONL files</div>
        </div>
      </div>
    );
  }

  if (!overallStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-red-500 text-8xl">⚠️</div>
          <div className="text-white text-2xl font-semibold">Failed to load scrim data</div>
          <div className="text-gray-400 text-center max-w-md">
            There was an error processing the JSONL files. Please check the file format and try again.
          </div>
          <button 
            onClick={fetchData}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Scrim Statistics</h1>
            <p className="text-gray-400">Real-time performance analytics from JSONL data</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={fetchData}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              🔄 Update Scrims (JSONL Data)
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 font-medium">Filter:</span>
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">Overall Statistics</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <StatsCard
                title="Total"
                games={overallStats.totalGames}
                winRate={overallStats.winRate}
                wins={overallStats.totalWins}
                losses={overallStats.totalLosses}
                className="relative z-10"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <StatsCard
                title="Blue Side"
                games={overallStats.blueSideGames}
                winRate={overallStats.blueSideWinRate}
                wins={overallStats.blueSideWins}
                losses={overallStats.blueSideLosses}
                side="blue"
                className="relative z-10"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <StatsCard
                title="Red Side"
                games={overallStats.redSideGames}
                winRate={overallStats.redSideWinRate}
                wins={overallStats.redSideWins}
                losses={overallStats.redSideLosses}
                side="red"
                className="relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Player Champion Stats */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">Player Champion Stats</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative z-10">
              <PlayerStatsTable stats={playerStats} />
            </div>
          </div>
        </div>

        {/* Game History */}
        <div className="space-y-6 mt-10">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white">Game History</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative z-10">
              <ClientOnly fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="text-white">Loading game history...</div>
                </div>
              }>
                <GameHistoryTable games={gameHistory} />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}