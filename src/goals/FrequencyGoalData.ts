import type { FrequencyUnit } from "./FrequencyUnit";
import type { GoalData } from "./GoalData";

//This defines the specific type for this goal
//The rest of the fields come from GoalData
//Adding the type let's the type be used for narrowing down later
export type FrequencyGoalData = GoalData & {
  type: "frequency";
  value: number;
  frequency: number;
  frequencyUnit: FrequencyUnit;
  dateBy: Date | undefined;
};

//This type excludes the id and let's you set the data to be updated on the object
export type FrequencyGoalUpdates = Partial<Omit<FrequencyGoalData, "id">>;
