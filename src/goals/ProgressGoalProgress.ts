import { GoalProgress } from "./GoalProgress";
//This defines the specific type of Progress for this goal
//The rest of the fields come from GoalProgress

//To show 2/3 days this week I need
//value, Progress, frequencunit
//and each day that it was accomplished by week?
//Daily: Show circles for last week, filled in if it's complete
//Days a week: show # of days of goal and filled in for this week
//Monthly: Show circle checked

//TODO in the future show history if they click on it, for progress details
export type ProgressGoalProgress = GoalProgress & {
  type: "progress";
  value: number;
};
