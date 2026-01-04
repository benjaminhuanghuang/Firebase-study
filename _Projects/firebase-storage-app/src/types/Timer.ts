export interface Timer {
  id: string;
  name: string;
  type: string;
  duration: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimerInput {
  name: string;
  type: string;
  duration: number;
  description: string;
}
