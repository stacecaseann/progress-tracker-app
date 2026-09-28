import type { CountGoalData } from "./CountGoalData";
import type { FrequencyGoalData } from "./FrequencyGoalData";
import type { ProgressGoalData } from "./ProgressGoalData";
import type { StreakGoalData } from "./StreakGoalData";

//This type includes all types of goal data so they can all be stored in an array together
export type AllGoalData =
  | CountGoalData
  | FrequencyGoalData
  | ProgressGoalData
  | StreakGoalData;
