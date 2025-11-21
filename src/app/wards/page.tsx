'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { WardMap } from '@/components/ward-map';
import { ClientOnly } from '@/components/client-only';

interface WardPoint {
  x: number;
  y: number;
  type: 'vision' | 'control' | 'stealth';
}

interface WardData {
  timeRange: string;
  wardCount: number;
  wardPoints: WardPoint[];
}

interface WardFilters {
  team: string;
  role: string;
  champion: string;
  lastGames: string;
}

export default function WardsPage() {
  const [filters, setFilters] = useState<WardFilters>({
    team: 'GOAL',
    role: 'MID',
    champion: 'All',
    lastGames: '20'
  });

  const [wardData, setWardData] = useState<WardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate ward data based on filters
  const generateWardData = (filters: WardFilters): WardData[] => {
    const timeRanges = [
      '00:00 - 01:30',
      '01:30 - 03:00', 
      '03:00 - 04:30',
      '04:30 - 06:00',
      '06:00 - 07:30',
      '07:30 - 09:00',
      '09:00 - 10:30',
      '10:30 - 12:00',
      '12:00 - 13:30',
      '13:30 - 15:00'
    ];

    return timeRanges.map((timeRange, index) => {
      // Generate different ward counts and positions based on filters
      let wardCount = 0;
      const wardPoints: WardPoint[] = [];

      // Adjust ward data based on role filter
      if (filters.role === 'MID') {
        wardCount = [6, 2, 6, 8, 7, 4, 5, 3, 6, 4][index] || 4;
      } else if (filters.role === 'JGL') {
        wardCount = [8, 4, 7, 9, 6, 5, 7, 4, 8, 5][index] || 5;
      } else if (filters.role === 'SUP') {
        wardCount = [10, 6, 8, 12, 9, 7, 8, 6, 10, 7][index] || 7;
      } else {
        wardCount = [4, 1, 3, 5, 4, 2, 3, 2, 4, 3][index] || 3;
      }

      // Adjust based on team filter
      if (filters.team === 'GOAL') {
        wardCount = Math.floor(wardCount * 1.2);
      } else if (filters.team === 'HELL') {
        wardCount = Math.floor(wardCount * 0.8);
      }

      // Generate ward points using deterministic positioning
      for (let i = 0; i < wardCount; i++) {
        const seed = (timeRange + i + filters.team + filters.role).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        wardPoints.push({
          x: 10 + (seed % 80), // 10-90% to avoid edges
          y: 10 + ((seed * 7) % 80), // Different multiplier for Y to avoid correlation
          type: ['vision', 'control', 'stealth'][seed % 3] as 'vision' | 'control' | 'stealth'
        });
      }

      return {
        timeRange,
        wardCount,
        wardPoints
      };
    });
  };

  const applyFilters = useCallback(() => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      const newWardData = generateWardData(filters);
      setWardData(newWardData);
      setLoading(false);
    }, 500);
  }, [filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const teamOptions = ['GOAL', 'HELL', 'APM', 'GSMC', 'IN5', 'TP', 'TPX', 'WLG'];
  const roleOptions = ['TOP', 'JGL', 'MID', 'BOT', 'SUP'];
  const championOptions = ['All', 'Ahri', 'Azir', 'Orianna', 'Syndra', 'Zed', 'Yasuo'];
  const gameOptions = ['10', '20', '30', '50', '100'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Warding Patterns</h1>
            <p className="text-gray-400 mt-1">Analyze ward placement strategies across different time intervals</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Team:</label>
              <select
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.team}
                onChange={(e) => setFilters({...filters, team: e.target.value})}
              >
                {teamOptions.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Role:</label>
              <select
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.role}
                onChange={(e) => setFilters({...filters, role: e.target.value})}
              >
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Champion:</label>
              <select
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.champion}
                onChange={(e) => setFilters({...filters, champion: e.target.value})}
              >
                {championOptions.map(champion => (
                  <option key={champion} value={champion}>{champion}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Last Games:</label>
              <select
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.lastGames}
                onChange={(e) => setFilters({...filters, lastGames: e.target.value})}
              >
                {gameOptions.map(games => (
                  <option key={games} value={games}>{games}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={applyFilters}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Apply Filter
            </Button>
          </div>
        </div>

        {/* Ward Maps Grid */}
        <ClientOnly fallback={
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <div className="text-white text-lg">Loading ward data...</div>
            </div>
          </div>
        }>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <div className="text-white text-lg">Loading ward data...</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wardData.map((ward, index) => (
                <WardMap
                  key={index}
                  timeRange={ward.timeRange}
                  wardCount={ward.wardCount}
                  wardPoints={ward.wardPoints}
                  className="hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          )}
        </ClientOnly>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Ward Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <span className="font-medium text-white">Total Wards:</span> {wardData.reduce((sum, ward) => sum + ward.wardCount, 0)}
            </div>
            <div>
              <span className="font-medium text-white">Average per Time Slot:</span> {wardData.length > 0 ? Math.round(wardData.reduce((sum, ward) => sum + ward.wardCount, 0) / wardData.length) : 0}
            </div>
            <div>
              <span className="font-medium text-white">Peak Warding Time:</span> {wardData.length > 0 ? wardData.reduce((max, ward) => ward.wardCount > max.wardCount ? ward : max, wardData[0]).timeRange : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

