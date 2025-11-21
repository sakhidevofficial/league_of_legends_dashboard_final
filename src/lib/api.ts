import { jsonlProcessor, GameHistoryEntry, ProximityData } from './jsonl-processor';

const API_BASE_URL = process.env.NEXT_PUBLIC_GRID_API_BASE_URL || 'https://api.grid.gg';
const API_KEY = process.env.NEXT_PUBLIC_GRID_API_KEY;

export interface GridApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Match {
  id: string;
  time: string;
  teams: {
    team1: string;
    team2: string;
    score?: string;
  };
  maps: string[];
  tournament: string;
  files: string[];
}

export interface PlayerStats {
  player: string;
  champion: string;
  championId: number;
  games: number;
  winRate: number;
  kda: number;
  damage: number;
  cs: number;
  side: 'blue' | 'red';
  kills: number;
  deaths: number;
  assists: number;
}

export interface OverallStats {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  blueSideGames: number;
  blueSideWins: number;
  blueSideLosses: number;
  blueSideWinRate: number;
  redSideGames: number;
  redSideWins: number;
  redSideLosses: number;
  redSideWinRate: number;
}

export interface ChampionStats {
  champion: string;
  championId: number;
  picks: number;
  bans: number;
  presence: number;
  winRate: number;
  pickRate: number;
  banRate: number;
  iconUrl?: string;
}

export interface ScrimData {
  matches: Match[];
  players: PlayerStats[];
  overallStats: OverallStats;
}

export interface TournamentData {
  matches: Match[];
  champions: ChampionStats[];
  overallStats: OverallStats;
}

class GridApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.apiKey = API_KEY || '';
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Process JSONL files to get scrim statistics
  async getScrimStats(): Promise<OverallStats> {
    try {
      const data = await jsonlProcessor.processJsonlFiles();
      return data.overallStats;
    } catch (error) {
      console.error('Failed to process JSONL files:', error);
      // Fallback to mock data if processing fails
      return {
        totalGames: 76,
        totalWins: 27,
        totalLosses: 49,
        winRate: 35.5,
        blueSideGames: 40,
        blueSideWins: 16,
        blueSideLosses: 24,
        blueSideWinRate: 40.0,
        redSideGames: 36,
        redSideWins: 11,
        redSideLosses: 25,
        redSideWinRate: 30.6,
      };
    }
  }

  async getPlayerChampionStats(): Promise<PlayerStats[]> {
    try {
      const data = await jsonlProcessor.processJsonlFiles();
      return data.playerStats;
    } catch (error) {
      console.error('Failed to process player stats:', error);
      // Fallback to mock data if processing fails
      return [
        { player: 'IceBreaker', champion: 'Aatrox', championId: 266, games: 16, winRate: 31.2, kda: 2.0, damage: 28125, cs: 190.0, side: 'blue', kills: 32, deaths: 16, assists: 0 },
        { player: 'IceBreaker', champion: 'Sett', championId: 875, games: 11, winRate: 45.5, kda: 1.9, damage: 28868, cs: 254.8, side: 'red', kills: 21, deaths: 11, assists: 0 },
        { player: 'Pallet', champion: 'Darius', championId: 122, games: 13, winRate: 38.5, kda: 3.4, damage: 16848, cs: 174.5, side: 'blue', kills: 44, deaths: 13, assists: 0 },
        { player: 'Pallet', champion: 'Ezreal', championId: 81, games: 11, winRate: 45.5, kda: 4.2, damage: 17302, cs: 138.0, side: 'red', kills: 46, deaths: 11, assists: 0 },
        { player: 'Tsiperakos', champion: 'Syndra', championId: 134, games: 14, winRate: 21.4, kda: 2.7, damage: 24364, cs: 189.4, side: 'blue', kills: 38, deaths: 14, assists: 0 },
        { player: 'Tsiperakos', champion: 'Annie', championId: 1, games: 12, winRate: 33.3, kda: 2.7, damage: 26650, cs: 196.1, side: 'red', kills: 32, deaths: 12, assists: 0 },
        { player: 'Nikiyas', champion: 'Lux', championId: 99, games: 10, winRate: 30.0, kda: 2.4, damage: 20663, cs: 208.9, side: 'blue', kills: 24, deaths: 10, assists: 0 },
        { player: 'Nikiyas', champion: 'Jhin', championId: 202, games: 5, winRate: 60.0, kda: 4.1, damage: 22490, cs: 216.4, side: 'red', kills: 20, deaths: 5, assists: 0 },
      ];
    }
  }

  async getTournamentStats(): Promise<OverallStats> {
    try {
      const data = await jsonlProcessor.processJsonlFiles();
      return data.overallStats;
    } catch (error) {
      console.error('Failed to process tournament stats:', error);
      // Fallback to mock data if processing fails
      return {
        totalGames: 39,
        totalWins: 22,
        totalLosses: 17,
        winRate: 56.4,
        blueSideGames: 20,
        blueSideWins: 11,
        blueSideLosses: 9,
        blueSideWinRate: 56.4,
        redSideGames: 19,
        redSideWins: 11,
        redSideLosses: 8,
        redSideWinRate: 43.6,
      };
    }
  }

  async getChampionStats(): Promise<ChampionStats[]> {
    try {
      const data = await jsonlProcessor.processJsonlFiles();
      return data.championStats;
    } catch (error) {
      console.error('Failed to process champion stats:', error);
      // Fallback to mock data if processing fails
      return [
        { champion: 'Pantheon', championId: 80, picks: 2, bans: 32, presence: 87.2, winRate: 50.0, pickRate: 5.1, banRate: 82.1 },
        { champion: 'Varus', championId: 110, picks: 8, bans: 15, presence: 59.0, winRate: 25.0, pickRate: 20.5, banRate: 38.5 },
        { champion: 'Taliyah', championId: 163, picks: 8, bans: 15, presence: 59.0, winRate: 25.0, pickRate: 20.5, banRate: 38.5 },
        { champion: 'Azir', championId: 268, picks: 5, bans: 17, presence: 56.4, winRate: 60.0, pickRate: 12.8, banRate: 43.6 },
        { champion: 'Orianna', championId: 61, picks: 6, bans: 16, presence: 56.4, winRate: 50.0, pickRate: 15.4, banRate: 41.0 },
      ];
    }
  }

  async getMatchHistory(): Promise<Match[]> {
    try {
      const response = await this.makeRequest<{
        matches: Array<{
          id: string;
          time: string;
          team1: string;
          team2: string;
          score?: string;
          maps: string[];
          tournament: string;
          files: string[];
        }>;
      }>('/api/v1/matches/history');

      return response.matches.map(match => ({
        id: match.id,
        time: match.time,
        teams: {
          team1: match.team1,
          team2: match.team2,
          score: match.score,
        },
        maps: match.maps,
        tournament: match.tournament,
        files: match.files,
      }));
    } catch (error) {
      console.error('Failed to fetch match history:', error);
      // Fallback to mock data if API fails
      return [
        {
          id: '2853955',
          time: '01:00',
          teams: { team1: 'Luminosi...', team2: 'Disguised' },
          maps: [],
          tournament: 'NACL - LTA North Promotion 2025',
          files: ['BO5']
        },
        {
          id: '2846786',
          time: '21:00',
          teams: { team1: 'Berlin Int...', team2: 'Los Heret...', score: '1 x 3' },
          maps: ['Summoner\'s Rift', 'Summoner\'s Rift', 'Summoner\'s Rift', 'Summoner\'s Rift'],
          tournament: 'EMEA Masters - Summer 2025',
          files: ['BO5']
        },
      ];
    }
  }

  // Helper method to get champion icon URL
  getChampionIconUrl(championId: number): string {
    return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${this.getChampionKey(championId)}.png`;
  }

  // Helper method to get champion key for icon URL
  private getChampionKey(championId: number): string {
    const championMap: { [key: number]: string } = {
      1: 'Annie', 61: 'Orianna', 81: 'Ezreal', 99: 'Lux', 110: 'Varus',
      122: 'Darius', 134: 'Syndra', 163: 'Taliyah', 202: 'Jhin', 266: 'Aatrox',
      268: 'Azir', 875: 'Sett', 80: 'Pantheon'
    };
    return championMap[championId] || 'Unknown';
  }

  async getGameHistory(): Promise<GameHistoryEntry[]> {
    try {
      const data = await jsonlProcessor.processJsonlFiles();
      return data.gameHistory;
    } catch (error) {
      console.error('Failed to process game history:', error);
      // Fallback to mock data if processing fails
      return [
        {
          date: '2025-08-10T22:41:45.308Z',
          patch: '15.19',
          blueTeam: 'Movistar Lyon Academy',
          redTeam: 'Zeu5 Esports',
          blueBans: ['Orianna', 'Trundle', 'Pantheon'],
          bluePicks: ['Varus', 'Taliyah', 'Azir', 'Sett', 'Darius'],
          redPicks: ['Pantheon', 'Varus', 'Taliyah', 'Azir', 'Orianna'],
          redBans: ['Azir', 'Orianna', 'Pantheon'],
          result: 'loss',
          duration: '26:42'
        },
        {
          date: '2025-08-10T23:34:39.791Z',
          patch: '15.19',
          blueTeam: 'Movistar Lyon Academy',
          redTeam: 'Zeu5 Esports',
          blueBans: ['Orianna', 'Trundle', 'Pantheon'],
          bluePicks: ['Varus', 'Taliyah', 'Azir', 'Sett', 'Darius'],
          redPicks: ['Pantheon', 'Varus', 'Taliyah', 'Azir', 'Orianna'],
          redBans: ['Azir', 'Orianna', 'Pantheon'],
          result: 'win',
          duration: '29:11'
        },
        {
          date: '2025-08-11T00:20:45.225Z',
          patch: '15.19',
          blueTeam: 'Zeu5 Esports',
          redTeam: 'Movistar Lyon Academy',
          blueBans: ['Orianna', 'Trundle', 'Pantheon'],
          bluePicks: ['Varus', 'Taliyah', 'Azir', 'Sett', 'Darius'],
          redPicks: ['Pantheon', 'Varus', 'Taliyah', 'Azir', 'Orianna'],
          redBans: ['Azir', 'Orianna', 'Pantheon'],
          result: 'win',
          duration: '36:04'
        }
      ];
    }
  }

  async getProximityData(): Promise<ProximityData[]> {
    try {
      const data = await jsonlProcessor.processJsonlFiles();
      return data.proximityData;
    } catch (error) {
      console.error('Failed to process proximity data:', error);
      // Fallback to mock data if processing fails
      return [
        {
          champion: 'Viego',
          championId: 234,
          games: 1,
          winRate: 0,
          proximity: { top: 12, mid: 42, adc: 42, sup: 41 },
          timeIntervals: {
            '0-5': { top: 8, mid: 22, adc: 8, sup: 10 },
            '5-14': { top: 2, mid: 34, adc: 27, sup: 25 },
            '14-20': { top: 18, mid: 24, adc: 52, sup: 49 },
            '20-24': { top: 0, mid: 70, adc: 43, sup: 69 },
            '24-30': { top: 21, mid: 61, adc: 73, sup: 69 },
            '30+': { top: 91, mid: 97, adc: 91, sup: 22 }
          }
        },
        {
          champion: 'Trundle',
          championId: 48,
          games: 1,
          winRate: 0,
          proximity: { top: 15, mid: 30, adc: 35, sup: 40 },
          timeIntervals: {
            '0-5': { top: 10, mid: 25, adc: 15, sup: 20 },
            '5-14': { top: 5, mid: 20, adc: 30, sup: 35 },
            '14-20': { top: 20, mid: 35, adc: 45, sup: 50 },
            '20-24': { top: 25, mid: 40, adc: 50, sup: 55 },
            '24-30': { top: 30, mid: 45, adc: 55, sup: 60 },
            '30+': { top: 35, mid: 50, adc: 60, sup: 65 }
          }
        },
        {
          champion: 'Belveth',
          championId: 200,
          games: 1,
          winRate: 0,
          proximity: { top: 18, mid: 35, adc: 40, sup: 38 },
          timeIntervals: {
            '0-5': { top: 12, mid: 28, adc: 18, sup: 22 },
            '5-14': { top: 8, mid: 25, adc: 35, sup: 30 },
            '14-20': { top: 25, mid: 40, adc: 50, sup: 45 },
            '20-24': { top: 30, mid: 45, adc: 55, sup: 50 },
            '24-30': { top: 35, mid: 50, adc: 60, sup: 55 },
            '30+': { top: 40, mid: 55, adc: 65, sup: 60 }
          }
        },
        {
          champion: 'XinZhao',
          championId: 5,
          games: 1,
          winRate: 0,
          proximity: { top: 17, mid: 25, adc: 50, sup: 44 },
          timeIntervals: {
            '0-5': { top: 7, mid: 37, adc: 14, sup: 14 },
            '5-14': { top: 9, mid: 6, adc: 33, sup: 34 },
            '14-20': { top: 34, mid: 12, adc: 69, sup: 63 },
            '20-24': { top: 7, mid: 39, adc: 73, sup: 41 },
            '24-30': { top: 16, mid: 31, adc: 55, sup: 45 },
            '30+': { top: 32, mid: 39, adc: 68, sup: 67 }
          }
        },
        {
          champion: 'Naafiri',
          championId: 950,
          games: 1,
          winRate: 0,
          proximity: { top: 12, mid: 29, adc: 38, sup: 45 },
          timeIntervals: {
            '0-5': { top: 18, mid: 33, adc: 29, sup: 39 },
            '5-14': { top: 3, mid: 19, adc: 29, sup: 36 },
            '14-20': { top: 12, mid: 30, adc: 49, sup: 63 },
            '20-24': { top: 27, mid: 50, adc: 41, sup: 32 },
            '24-30': { top: 8, mid: 17, adc: 55, sup: 64 },
            '30+': { top: 0, mid: 0, adc: 0, sup: 0 }
          }
        },
        {
          champion: 'Nocturne',
          championId: 56,
          games: 1,
          winRate: 0,
          proximity: { top: 20, mid: 40, adc: 45, sup: 42 },
          timeIntervals: {
            '0-5': { top: 15, mid: 35, adc: 20, sup: 25 },
            '5-14': { top: 10, mid: 30, adc: 40, sup: 35 },
            '14-20': { top: 30, mid: 45, adc: 55, sup: 50 },
            '20-24': { top: 35, mid: 50, adc: 60, sup: 55 },
            '24-30': { top: 40, mid: 55, adc: 65, sup: 60 },
            '30+': { top: 45, mid: 60, adc: 70, sup: 65 }
          }
        },
        {
          champion: 'Gwen',
          championId: 887,
          games: 1,
          winRate: 0,
          proximity: { top: 22, mid: 38, adc: 42, sup: 40 },
          timeIntervals: {
            '0-5': { top: 18, mid: 32, adc: 22, sup: 28 },
            '5-14': { top: 12, mid: 28, adc: 38, sup: 32 },
            '14-20': { top: 32, mid: 42, adc: 52, sup: 48 },
            '20-24': { top: 38, mid: 48, adc: 58, sup: 54 },
            '24-30': { top: 42, mid: 52, adc: 62, sup: 58 },
            '30+': { top: 48, mid: 58, adc: 68, sup: 64 }
          }
        },
        {
          champion: 'Pantheon',
          championId: 80,
          games: 1,
          winRate: 0,
          proximity: { top: 25, mid: 45, adc: 48, sup: 46 },
          timeIntervals: {
            '0-5': { top: 20, mid: 40, adc: 25, sup: 30 },
            '5-14': { top: 15, mid: 35, adc: 45, sup: 40 },
            '14-20': { top: 35, mid: 50, adc: 60, sup: 55 },
            '20-24': { top: 40, mid: 55, adc: 65, sup: 60 },
            '24-30': { top: 45, mid: 60, adc: 70, sup: 65 },
            '30+': { top: 50, mid: 65, adc: 75, sup: 70 }
          }
        }
      ];
    }
  }
}

export const gridApi = new GridApiService();
