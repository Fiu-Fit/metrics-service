export enum GoalStatus {
  InProgress = 0,
  Completed = 1,
  CompletedLate = 2,
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  userId: number;
  targetValue: number;
  actualValue?: number;
  deadline?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  exerciseId: string;
  status: GoalStatus;
}
