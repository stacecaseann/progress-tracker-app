import { describe, expect, test } from "@jest/globals";
import type {
  CountGoalData,
  CountGoalUpdates,
} from "../src/goals/CountGoalData";
import { CountGoal } from "../src/goals/CountGoal";
import { Goal } from "../src/goals/Goal";
import type { CheckIn } from "../src/checkIns/CheckIn";

describe("description", () => {
  test("expects description", () => {
    const countGoalData: CountGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "count",
      startDate: new Date(2026, 0, 31),
      valueUnit: "min",
    };
    const goal = new CountGoal(countGoalData);
    expect(goal.description).toBe("Practice Piano (count min)");
  });
});

describe("progress", () => {
  test("expects progress", () => {
    const goalId = crypto.randomUUID();
    const countGoalData: CountGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "count",
      startDate: new Date(2026, 0, 31),
      valueUnit: "min",
    };
    const checkIns = [
      {
        goalId,
        checkInDate: new Date(2026, 0, 1),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 2),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 3),
        value: 20,
      },
    ];
    const goal = new CountGoal(countGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 60,
      description: "60 min completed!",
    });
  });
  test("no progress", () => {
    const goalId = crypto.randomUUID();
    const countGoalData: CountGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "count",
      startDate: new Date(2026, 0, 31),
      valueUnit: "min",
    };
    const checkIns: CheckIn[] = [];
    const goal = new CountGoal(countGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 0,
      description: "0 min completed!",
    });
  });
});

describe("update", () => {
  test("is immutable", () => {
    const countGoalData: CountGoalData = {
      id: crypto.randomUUID(),
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
    expect(updatedGoal.name).toBe("Practice Guitar");
    expect(goalList[0].name).toBe("Practice Piano");
  });
});
