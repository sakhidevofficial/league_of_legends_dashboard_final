'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { StartPositionMap } from '@/components/start-position-map';
import { ClientOnly } from '@/components/client-only';
import { cn } from '@/lib/utils';

interface PlayerPosition {
  id: string;
  x: number;
  y: number;
  team: 'blue' | 'red';
  champion: string;
  role: 'TOP' | 'JGL' | 'MID' | 'BOT' | 'SUP';
}

interface GameData {
  id: string;
  title: string;
  result: 'Win' | 'Loss';
  playerPositions: PlayerPosition[];
}

interface StartPositionFilters {
  team: string;
  champion: string;
  lastGames: string;
}

export default function StartPositionsPage() {
  const [filters, setFilters] = useState<StartPositionFilters>({
    team: '',
    champion: 'All',
    lastGames: '10'
  });

  const [gameData, setGameData] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState('01:40');
  const [timelineValue, setTimelineValue] = useState(40);

  // Generate game data based on filters
  const generateGameData = (filters: StartPositionFilters): GameData[] => {
    if (!filters.team) return [];

    const teams = ['APM', 'GOAL', 'GSMC', 'HELL', 'IN5', 'TP', 'TPX', 'WLG'];
    const opponents = teams.filter(t => t !== filters.team);
    const numGames = parseInt(filters.lastGames) || 10;
    const games: GameData[] = [];

    // Generate starting positions for each role
    const getStartingPosition = (role: string, team: 'blue' | 'red'): { x: number; y: number } => {
      const positions: { [key: string]: { blue: { x: number; y: number }, red: { x: number; y: number } } } = {
        'TOP': { blue: { x: 12, y: 12 }, red: { x: 88, y: 88 } },
        'JGL': { blue: { x: 30, y: 35 }, red: { x: 70, y: 65 } },
        'MID': { blue: { x: 48, y: 48 }, red: { x: 52, y: 52 } },
        'BOT': { blue: { x: 15, y: 85 }, red: { x: 85, y: 15 } },
        'SUP': { blue: { x: 18, y: 88 }, red: { x: 82, y: 12 } }
      };

      const rolePos = positions[role] || positions['MID'];
      return team === 'blue' ? rolePos.blue : rolePos.red;
    };

    const champions = ['Viego', 'Trundle', 'Belveth', 'XinZhao', 'Naafiri', 'Nocturne', 'Gwen', 'Pantheon', 'Azir', 'Orianna'];
    const roles: Array<'TOP' | 'JGL' | 'MID' | 'BOT' | 'SUP'> = ['TOP', 'JGL', 'MID', 'BOT', 'SUP'];

    for (let i = 0; i < Math.min(numGames, 3); i++) {
      const opponent = opponents[i % opponents.length];
      const isBlueTeam = i % 2 === 0;
      const result: 'Win' | 'Loss' = Math.random() > 0.5 ? 'Win' : 'Loss';

      const playerPositions: PlayerPosition[] = [];

      // Add blue team players
      roles.forEach((role, index) => {
        const pos = getStartingPosition(role, 'blue');
        playerPositions.push({
          id: `blue-${role}-${i}`,
          x: Math.max(5, Math.min(95, pos.x + (Math.random() * 4 - 2))), // Small random variation, clamped
          y: Math.max(5, Math.min(95, pos.y + (Math.random() * 4 - 2))),
          team: 'blue',
          champion: champions[index % champions.length],
          role
        });
      });

      // Add red team players
      roles.forEach((role, index) => {
        const pos = getStartingPosition(role, 'red');
        playerPositions.push({
          id: `red-${role}-${i}`,
          x: Math.max(5, Math.min(95, pos.x + (Math.random() * 4 - 2))), // Small random variation, clamped
          y: Math.max(5, Math.min(95, pos.y + (Math.random() * 4 - 2))),
          team: 'red',
          champion: champions[(index + 5) % champions.length],
          role
        });
      });

      games.push({
        id: `game-${i}`,
        title: isBlueTeam ? `${filters.team} vs ${opponent}` : `${opponent} vs ${filters.team}`,
        result,
        playerPositions
      });
    }

    return games;
  };

  const applyFilters = () => {
    if (!filters.team) {
      setGameData([]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newData = generateGameData(filters);
      setGameData(newData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    applyFilters();
  }, [filters.team, filters.lastGames]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  // Update timeline when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimelineValue(prev => {
        const newValue = Math.min(prev + playbackSpeed, 100);
        if (newValue >= 100) {
          setIsPlaying(false);
          return 100;
        }
        
        // Convert to time format (MM:SS)
        const totalSeconds = Math.floor((newValue / 100) * 1800); // Max 30 minutes
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setCurrentTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        
        return newValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const teamOptions = ['APM', 'GOAL', 'GSMC', 'HELL', 'IN5', 'TP', 'TPX', 'WLG'];
  const gameOptions = ['5', '10', '15', '20', 'All'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Start Positions Analysis</h1>
            <p className="text-gray-400 mt-1">Analyze player starting positions across different games</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-300">Team:</label>
              <select
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
                value={filters.team}
                onChange={(e) => setFilters({...filters, team: e.target.value})}
              >
                <option value="">-- Select Team --</option>
                {teamOptions.map(team => (
                  <option key={team} value={team}>{team}</option>
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
                <option value="All">All</option>
                <option value="Viego">Viego</option>
                <option value="Trundle">Trundle</option>
                <option value="Belveth">Belveth</option>
                <option value="XinZhao">XinZhao</option>
                <option value="Naafiri">Naafiri</option>
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
          </div>
        </div>

        {/* Controls and Timeline */}
        {filters.team && (
          <div className="mb-8 flex items-center justify-between bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handlePlay}
                className={cn(
                  'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2',
                  isPlaying && 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                )}
              >
                {isPlaying ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Start</span>
                  </>
                )}
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Speed:</span>
                {[1.5, 2, 2.5, 3, 4].map(speed => (
                  <Button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={cn(
                      'px-3 py-1 text-xs rounded',
                      playbackSpeed === speed
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    )}
                  >
                    x{speed}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-300">Timeline:</label>
              <input
                type="range"
                min="0"
                max="100"
                value={timelineValue}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setTimelineValue(value);
                  const totalSeconds = Math.floor((value / 100) * 1800);
                  const minutes = Math.floor(totalSeconds / 60);
                  const seconds = totalSeconds % 60;
                  setCurrentTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
                }}
                className="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-sm text-white font-medium min-w-[60px]">{currentTime}</span>
            </div>
          </div>
        )}

        {/* Game Maps */}
        {!filters.team ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-xl text-gray-400">Please select a team to view starting positions.</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <div className="text-white text-lg">Loading game data...</div>
            </div>
          </div>
        ) : (
          <ClientOnly fallback={
            <div className="flex items-center justify-center h-96">
              <div className="text-white">Loading maps...</div>
            </div>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameData.map((game) => (
                <StartPositionMap
                  key={game.id}
                  gameTitle={game.title}
                  result={game.result}
                  playerPositions={game.playerPositions}
                  currentTime={isPlaying ? currentTime : undefined}
                />
              ))}
            </div>
          </ClientOnly>
        )}
      </div>
    </div>
  );
}
