export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  coinCost: number;
  streak: number;
  completedToday: boolean;
  lastCompletedDate: string | null;
}

export interface User {
  id: string;
  name: string;
  coins: number;
}