import { describe, expect, test } from "@jest/globals";
import type { ProgressGoalData } from "../src/goals/ProgressGoalData";
import { ProgressGoal } from "../src/goals/ProgressGoal";
describe("description", () => {
  test("with no dateBy", () => {
    const progressGoalData: ProgressGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "progress",
      startDate: new Date(2026, 0, 31),
      value: 200,
      valueUnit: "min",
      dateBy: undefined,
    };
    const goal = new ProgressGoal(progressGoalData);
    expect(goal.description).toBe("Practice Piano 200 min");
  });
  test("with dateBy", () => {
    const progressGoalData: ProgressGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "progress",
      startDate: new Date(2026, 0, 31),
      value: 200,
      valueUnit: "min",
      dateBy: new Date(2026, 11, 31),
    };
    const goal = new ProgressGoal(progressGoalData);
    expect(goal.description).toBe("Practice Piano 200 min by 12/31/2026");
  });
});

describe("progress", () => {
  test("pass", () => {
    const goalId = crypto.randomUUID();
    const progressGoalData: ProgressGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "progress",
      startDate: new Date(2026, 0, 1),
      value: 100,
      valueUnit: "min",
      dateBy: new Date(2026, 0, 31),
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
    const goal = new ProgressGoal(progressGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 60,
      description: "You completed 60/100 min!",
    });
  });
  test("fail", () => {
    const goalId = crypto.randomUUID();
    const progressGoalData: ProgressGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "progress",
      startDate: new Date(2026, 0, 1),
      value: 100,
      valueUnit: "min",
      dateBy: new Date(2026, 0, 31),
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
        value: 60,
      },
    ];
    const goal = new ProgressGoal(progressGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 100,
      description: "You completed 100/100 min!",
    });
  });
  test("last checkIn after date", () => {
    const goalId = crypto.randomUUID();
    const progressGoalData: ProgressGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "progress",
      startDate: new Date(2026, 0, 1),
      value: 100,
      valueUnit: "min",
      dateBy: new Date(2026, 0, 31),
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
        checkInDate: new Date(2026, 1, 1),
        value: 80,
      },
    ];
    const goal = new ProgressGoal(progressGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 40,
      description: "You completed 40/100 min!",
    });
  });
  test("no date", () => {
    const goalId = crypto.randomUUID();
    const progressGoalData: ProgressGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "progress",
      startDate: new Date(2026, 0, 1),
      value: 100,
      valueUnit: "min",
      dateBy: undefined,
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
    const goal = new ProgressGoal(progressGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 60,
      description: "You completed 60/100 min!",
    });
  });
});
