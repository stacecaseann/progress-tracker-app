import { describe, expect, test } from "@jest/globals";
import type {
  CountGoalData,
  CountGoalUpdates,
} from "../src/goals/CountGoalData";
import { CountGoal } from "../src/goals/CountGoal";
import { Goal } from "../src/goals/Goal";
import { addGoal, removeGoal, updateGoal } from "../src/goals/goals";

describe("addGoal", () => {
  test("added to list", () => {
    const countGoalData: CountGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "count",
      startDate: new Date(2026, 0, 31),
      valueUnit: "min",
    };
    const goal = new CountGoal(countGoalData);
    let goalList: Goal[] = [];
    goalList = addGoal(goalList, goal);
    expect(goalList.length).toBe(1);
  });
  //add every type
});

describe("removeGoal", () => {
  test("removed from list", () => {
    const goalId = crypto.randomUUID();
    const countGoalData: CountGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "count",
      startDate: new Date(2026, 0, 31),
      valueUnit: "min",
    };
    const goal = new CountGoal(countGoalData);
    let goalList: Goal[] = [goal];
    goalList = removeGoal(goalList, goal.id);
    expect(goalList.length).toBe(0);
  });
});

describe("updateGoal", () => {
  test("update count goal", () => {
    const goalId = crypto.randomUUID();
    const countGoalData: CountGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "count",
      startDate: new Date(2026, 0, 31),
      valueUnit: "min",
    };
    const goal = new CountGoal(countGoalData);
    let goalList: Goal[] = [goal];
    const updateGoalData: CountGoalUpdates = {
      name: "Practice Guitar",
    };
    const updatedGoal = goal.updateGoal(updateGoalData);
    goalList = updateGoal(goalList, updatedGoal);
    expect(goalList.length).toBe(1);
    expect(goalList[0].name).toBe("Practice Guitar");
  });
  //add every goal
});
