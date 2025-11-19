'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProximityTable } from '@/components/proximity-table';
import { ClientOnly } from '@/components/client-only';
import { gridApi } from '@/lib/api';
import { ProximityData } from '@/lib/jsonl-processor';


interface ProximityFilters {
  team: string;
  role: string;
  lastGames: string;
}

export default function ProximityPage() {
  const [filters, setFilters] = useState<ProximityFilters>({
    team: 'APM',
    role: 'JUNGLE',
    lastGames: '20'
  });

  const [proximityData, setProximityData] = useState<ProximityData[]>([]);
  const [loading, setLoading] = useState(true);


  const applyFilters = async () => {
    setLoading(true);
    try {
      const newData = await gridApi.getProximityData();
      setProximityData(newData);
    } catch (error) {
      console.error('Failed to fetch proximity data:', error);
      // Keep existing data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, []);

  const teamOptions = ['APM', 'GOAL', 'GSMC', 'HELL', 'IN5', 'TP', 'TPX', 'WLG'];
  const roleOptions = ['TOP', 'JGL', 'MID', 'BOT', 'SUP'];
  const gameOptions = ['5', '10', '20', '30', '50', 'All'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Proximity Statistics</h1>
            <p className="text-gray-400 mt-1">
              Proximity for {filters.team} - {filters.role} (Last {filters.lastGames} games)
            </p>
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

        {/* Proximity Table */}
        <ClientOnly fallback={
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <div className="text-white text-lg">Loading proximity data...</div>
            </div>
          </div>
        }>
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <div className="text-white text-lg">Loading proximity data...</div>
              </div>
            </div>
          ) : (
            <ProximityTable data={proximityData} />
          )}
        </ClientOnly>

        {/* Summary Statistics */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Proximity Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-300">
            <div>
              <span className="font-medium text-white">Total Champions:</span> {proximityData.length}
            </div>
            <div>
              <span className="font-medium text-white">Average Proximity:</span> 32%
            </div>
            <div>
              <span className="font-medium text-white">Highest Proximity:</span> 97%
            </div>
            <div>
              <span className="font-medium text-white">Most Active Time:</span> 20-24 MIN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
