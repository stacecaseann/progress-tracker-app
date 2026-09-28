import { GoalProgress } from "./GoalProgress";
//This defines the specific type of Streak for this goal
//The rest of the fields come from GoalStreak

//TODO in the future show history if they click on it, for Streak details
export type StreakGoalProgress = GoalProgress & {
  type: "streak";
  value: number;
  longestStreak: number;
};
