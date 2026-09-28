import { describe, expect, test } from "@jest/globals";
import type { StreakGoalData } from "../src/goals/StreakGoalData";
import { StreakGoal } from "../src/goals/StreakGoal";
describe("description", () => {
  test("with no dateBy", () => {
    const streakGoalData: StreakGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "streak",
      startDate: new Date(2026, 0, 31),
      value: 20,
      valueUnit: "min",
      dateBy: undefined,
    };
    const goal = new StreakGoal(streakGoalData);
    expect(goal.description).toBe("Practice Piano 20 min every day");
  });
  test("with dateBy", () => {
    const StreakGoalData: StreakGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "streak",
      startDate: new Date(2026, 0, 31),
      value: 20,
      valueUnit: "min",
      dateBy: new Date(2026, 11, 31),
    };
    const goal = new StreakGoal(StreakGoalData);
    expect(goal.description).toBe(
      "Practice Piano 20 min every day until 12/31/2026"
    );
  });
});

describe("progress", () => {
  test("progress every day", () => {
    const goalId = crypto.randomUUID();
    const streakGoalData: StreakGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "streak",
      startDate: new Date(2026, 0, 1),
      value: 20,
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
    const goal = new StreakGoal(streakGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 3,
      description: "You have a streak of 3 days!",
    });
  });
  test("add total by days", () => {
    const goalId = crypto.randomUUID();
    const streakGoalData: StreakGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "streak",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      dateBy: undefined,
    };
    const checkIns = [
      {
        goalId,
        checkInDate: new Date(2026, 0, 1),
        value: 10,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 1),
        value: 10,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 2),
        value: 18,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 3),
        value: 20,
      },
    ];
    const goal = new StreakGoal(streakGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 1,
      description: "You have a streak of 1 days!",
    });
  });

  test("progress entered out of order", () => {
    const goalId = crypto.randomUUID();
    const streakGoalData: StreakGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "streak",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      dateBy: undefined,
    };
    const checkIns = [
      {
        goalId,
        checkInDate: new Date(2026, 0, 3),
        value: 20,
      },
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
    ];
    const goal = new StreakGoal(streakGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 3,
      description: "You have a streak of 3 days!",
    });
  });
  test("miss a day", () => {
    const goalId = crypto.randomUUID();
    const streakGoalData: StreakGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "streak",
      startDate: new Date(2026, 0, 1),
      value: 20,
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
        checkInDate: new Date(2026, 0, 4),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 5),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 6),
        value: 20,
      },
    ];
    const goal = new StreakGoal(streakGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 3,
      description: "You have a streak of 3 days!",
    });
  });

  test("miss 2 days", () => {
    const goalId = crypto.randomUUID();
    const streakGoalData: StreakGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "streak",
      startDate: new Date(2026, 0, 1),
      value: 20,
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
        checkInDate: new Date(2026, 0, 4),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 5),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 7),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 8),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 9),
        value: 20,
      },
    ];
    const goal = new StreakGoal(streakGoalData);
    const goalProgress = goal.calculateProgress(checkIns);
    expect(goalProgress).toEqual({
      value: 3,
      description: "You have a streak of 3 days!",
    });
  });
});
