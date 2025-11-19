import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Welcome to Gamespace</h1>
        <p className="text-xl text-gray-300">League of Legends Statistics Dashboard</p>
        <p className="text-gray-400">Powered by Grid API</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader>
            <CardTitle className="text-white">Scrim Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              View detailed scrim statistics including overall performance, player champion stats, and side-specific data.
            </p>
            <Link href="/scrims">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                View Scrims
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader>
            <CardTitle className="text-white">Tournament Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Analyze tournament performance with champion statistics, pick/ban rates, and win rates.
            </p>
            <Link href="/tournament">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                View Tournament
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardHeader>
            <CardTitle className="text-white">Match History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Browse through match history with detailed game information and team statistics.
            </p>
            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-gray-400">
        <p>© 2025 Gamespace - League of Legends Dashboard</p>
      </div>
    </div>
  );
}