import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWinRate(winRate: number): string {
  return `${winRate.toFixed(1)}%`;
}

export function getWinRateColor(winRate: number): string {
  if (winRate >= 60) return 'text-green-500';
  if (winRate >= 50) return 'text-yellow-500';
  return 'text-red-500';
}

export function formatNumber(num: number): string {
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatKDA(kda: number): string {
  return kda.toFixed(1);
}
