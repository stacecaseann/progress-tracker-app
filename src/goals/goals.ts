import {
  readCheckInsFromStorage,
  readGoalsFromStorage,
  saveCheckInsToStorage,
  saveGoalsToStorage,
} from "@/files/fileUtil";
import type { CheckIn } from "../checkIns/CheckIn";
import { CountGoal } from "./CountGoal";
import { FrequencyGoal } from "./FrequencyGoal";
import { Goal } from "./Goal";
import { ProgressGoal } from "./ProgressGoal";
import { StreakGoal } from "./StreakGoal";

//These are the basic functions used to manipulate goals in the program

//Adds goals to an array, keeps it idempotent, meaning it doesn't change the original array sent in
export function addGoal(goals: Goal[], goal: Goal) {
  return [...goals, goal];
}

//Removes goals from an array
//I need to check this if it's idempotent
export function removeGoal(goals: Goal[], goalId: string) {
  return goals.filter((g) => g.id != goalId);
}

//Updates goals in an array
//I need to check this if it's idempotent
export function updateGoal(goals: Goal[], updatedGoal: Goal): Goal[] {
  return goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal));
}

//Loads goals from the json file
//The file logic is extracted out, but this builds the correct data to send
//And creates the correct classes from the data
//I probably need to handle the utc time zone
//Dates have to be constructed back from the string
export async function loadGoals(): Promise<Goal[]> {
  const goalDataDto = await readGoalsFromStorage();
  if (goalDataDto === undefined) {
    return [];
  }
  const goalData: Goal[] = goalDataDto.map((goal) => {
    switch (goal.type) {
      case "count":
        return new CountGoal({ ...goal, startDate: new Date(goal.startDate) });
      case "frequency":
        return new FrequencyGoal({
          ...goal,
          dateBy: goal.dateBy ? new Date(goal.dateBy) : undefined,
          startDate: new Date(goal.startDate),
        });
      case "progress":
        return new ProgressGoal({
          ...goal,
          dateBy: goal.dateBy ? new Date(goal.dateBy) : undefined,
          startDate: new Date(goal.startDate),
        });
      case "streak":
        return new StreakGoal({
          ...goal,
          dateBy: goal.dateBy ? new Date(goal.dateBy) : undefined,
          startDate: new Date(goal.startDate),
        });
      default:
        throw new Error(`Goal Type is not supported`);
    }
  });
  return goalData;
}

//This saves goals to the storage
//First it converts to the data object, then calls the file util to actually save the file
export async function saveGoals(goals: Goal[]) {
  const goalDataDto = goals.map((goalDto) => goalDto.toData());
  await saveGoalsToStorage(goalDataDto);
}

//Loads check-ins from the json file
//The file logic is extracted out, but this builds the correct data to send
//And creates the correct CheckIn type from the data
export async function loadCheckIns(): Promise<CheckIn[]> {
  const checkInData = await readCheckInsFromStorage();
  if (checkInData === undefined) return [];
  //I did need help to fix my json being in utc time to converting to local time.
  console.log(checkInData);
  const checkIns: CheckIn[] = checkInData.map((checkInDto) => {
    const [year, month, day] = checkInDto.checkInDate.split("-").map(Number);

    return {
      ...checkInDto,
      checkInDate: new Date(year!, month! - 1, day!),
    };
  });

  return checkIns;
}

//Converts the Check-Ins to the data type and saves to the file
//We have to convert the date to a string
export async function saveCheckIns(checkIns: CheckIn[]) {
  const checkInsToSave = checkIns.map((checkIn) => {
    //I tried to save as toLocaleDateString, but then it couldn't be loaded correctly
    //I needed a string with no utc
    const year = checkIn.checkInDate.getFullYear();
    const month = String(checkIn.checkInDate.getMonth() + 1).padStart(2, "0");
    const day = String(checkIn.checkInDate.getDate()).padStart(2, "0");
    return {
      ...checkIn,
      checkInDate: `${year}-${month}-${day}`,
    };
  });

  await saveCheckInsToStorage(checkInsToSave);
}
