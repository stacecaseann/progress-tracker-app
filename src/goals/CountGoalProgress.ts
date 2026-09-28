import { GoalProgress } from "./GoalProgress";
//This defines the specific type of Progress for this goal
//The rest of the fields come from GoalProgress

export type CountGoalProgress = GoalProgress & {
  type: "count";
};
