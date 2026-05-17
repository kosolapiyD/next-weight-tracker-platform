export interface IWeightEntry {
  _id: string;
  userId: string;
  weight: number;
  weekNumber: number;
  year: number;
  recordedAt: string;
  createdAt: string;
}

export interface WeightLogPayload {
  weight: number;
}
