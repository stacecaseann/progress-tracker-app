import type { GoalType } from "./GoalType";
import type { ValueUnit } from "./ValueUnit";

//These are the fields that must exist on every goal. 
export type GoalData = {
  id: string;
  name: string;
  type: GoalType;
  startDate: Date;
  valueUnit: ValueUnit;
};

//These are the fields for updating a goal, which excludes the id
export type GoalUpdates = Partial<Omit<GoalData, "id">>;
