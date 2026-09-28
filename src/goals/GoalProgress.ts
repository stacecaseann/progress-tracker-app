import type { GoalType } from "./GoalType";
//Every goal must have a method to return the Goal Progress
// This is the structure that must be returned.
export type GoalProgress = {
  totalValue: number;
  valueUnit: string;
  description: string;
  type: GoalType;
};
