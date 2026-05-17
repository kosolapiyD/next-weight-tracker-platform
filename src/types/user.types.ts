export type UserRole = 'user' | 'admin';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  startWeight?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  startWeight: number;
  currentWeight: number;
  lossPercent: number;
  rank: number;
  totalEntries: number;
}
