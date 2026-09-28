import { CountGoal } from "../CountGoal";
import { FrequencyGoal } from "../FrequencyGoal";
import { Goal } from "../Goal";
import { ProgressGoal } from "../ProgressGoal";
import { StreakGoal } from "../StreakGoal";

//Initial goals for testing
export const initialGoals: Goal[] = [
  new CountGoal({
    id: "1",
    name: "Read",
    type: "count",
    startDate: new Date(2026, 7, 1),
    valueUnit: "pages",
  }),
  new ProgressGoal({
    id: "2",
    name: "Practice Spanish",
    type: "progress",
    startDate: new Date(2026, 7, 1),
    value: 500,
    valueUnit: "min",
    dateBy: new Date(2026, 7, 31),
  }),
  new FrequencyGoal({
    id: "3",
    name: "Practice the piano",
    type: "frequency",
    startDate: new Date(2026, 7, 1),
    value: 20,
    valueUnit: "min",
    frequency: 5,
    frequencyUnit: "week",
    dateBy: new Date(2026, 7, 31),
  }),
  new StreakGoal({
    id: "4",
    name: "Exercise",
    type: "streak",
    startDate: new Date(2026, 7, 1),
    value: 20,
    valueUnit: "min",
    dateBy: new Date(2026, 7, 31),
  }),
];
