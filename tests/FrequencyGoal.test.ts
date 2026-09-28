import { describe, expect, test } from "@jest/globals";
import type { FrequencyGoalData } from "../src/goals/FrequencyGoalData";
import { FrequencyGoal } from "../src/goals/FrequencyGoal";
describe("description", () => {
  test("daily no date", () => {
    const frequencyGoalData: FrequencyGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 31),
      value: 20,
      valueUnit: "min",
      frequency: 1,
      frequencyUnit: "day",
      dateBy: undefined,
    };
    const goal = new FrequencyGoal(frequencyGoalData);
    expect(goal.description).toBe("Practice Piano 20 min a day every day");
  });
  test("daily with date", () => {
    const frequencyGoalData: FrequencyGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 31),
      value: 20,
      valueUnit: "min",
      frequency: 1,
      frequencyUnit: "day",
      dateBy: new Date(2026, 0, 31),
    };
    const goal = new FrequencyGoal(frequencyGoalData);
    expect(goal.description).toBe(
      "Practice Piano 20 min a day every day until 1/31/2026"
    );
  });

  test("weekly with date", () => {
    const frequencyGoalData: FrequencyGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 31),
      value: 20,
      valueUnit: "min",
      frequency: 3,
      frequencyUnit: "week",
      dateBy: new Date(2026, 0, 31),
    };

    const goal = new FrequencyGoal(frequencyGoalData);

    expect(goal.description).toBe(
      "Practice Piano 20 min a day 3 times per week until 1/31/2026"
    );
  });

  test("monthly with date", () => {
    const frequencyGoalData: FrequencyGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 31),
      value: 20,
      valueUnit: "min",
      frequency: 3,
      frequencyUnit: "month",
      dateBy: new Date(2026, 0, 31),
    };

    const goal = new FrequencyGoal(frequencyGoalData);

    expect(goal.description).toBe(
      "Practice Piano 20 min a day 3 times per month until 1/31/2026"
    );
  });
});

describe("frequency", () => {
  test("every day should fail", () => {
    const goalId = crypto.randomUUID();
    const frequencyGoalData: FrequencyGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      frequency: 1,
      frequencyUnit: "day",
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
    const goal = new FrequencyGoal(frequencyGoalData);
    const goalProgress = goal.calculateProgress(
      checkIns,
      new Date(2026, 0, 31)
    );
    expect(goalProgress).toEqual({
      value: 0,
      description: "You completed 20 min every day for 0 out of 5 weeks!",
    });
  });
  test("every day should pass", () => {
    const goalId = crypto.randomUUID();
    const frequencyGoalData: FrequencyGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      frequency: 1,
      frequencyUnit: "day",
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
      {
        goalId,
        checkInDate: new Date(2026, 0, 7),
        value: 20,
      },
    ];
    const goal = new FrequencyGoal(frequencyGoalData);
    const goalProgress = goal.calculateProgress(
      checkIns,
      new Date(2026, 0, 31)
    );
    expect(goalProgress).toEqual({
      value: 1,
      description: "You completed 20 min every day for 1 out of 5 weeks!",
    });
  });
  test("3 days a week should fail", () => {
    const goalId = crypto.randomUUID();
    const frequencyGoalData: FrequencyGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      frequency: 3,
      frequencyUnit: "week",
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
        value: 19,
      },
    ];
    const goal = new FrequencyGoal(frequencyGoalData);
    const goalProgress = goal.calculateProgress(
      checkIns,
      new Date(2026, 0, 31)
    );
    expect(goalProgress).toEqual({
      value: 0,
      description: "You completed 20 min 3 days/week 0 out of 5 weeks!",
    });
  });
  test("3 days a week", () => {
    const goalId = crypto.randomUUID();
    const frequencyGoalData: FrequencyGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      frequency: 3,
      frequencyUnit: "week",
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
      {
        goalId,
        checkInDate: new Date(2026, 0, 9),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 10),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 11),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 16),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 17),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 18),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 23),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 24),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 25),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 30),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 31),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 1, 1),
        value: 20,
      },
    ];
    const goal = new FrequencyGoal(frequencyGoalData);
    const goalProgress = goal.calculateProgress(
      checkIns,
      new Date(2026, 0, 31)
    );
    expect(goalProgress).toEqual({
      value: 5,
      description: "You completed 20 min 3 days/week 5 out of 5 weeks!",
    });
  });
  test("3 days a month pass", () => {
    const goalId = crypto.randomUUID();
    const frequencyGoalData: FrequencyGoalData = {
      id: goalId,
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      frequency: 3,
      frequencyUnit: "month",
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
        checkInDate: new Date(2026, 0, 10),
        value: 20,
      },
      {
        goalId,
        checkInDate: new Date(2026, 0, 30),
        value: 20,
      },
    ];
    const goal = new FrequencyGoal(frequencyGoalData);
    const goalProgress = goal.calculateProgress(
      checkIns,
      new Date(2026, 0, 31)
    );
    expect(goalProgress).toEqual({
      value: 1,
      description: "You completed 20 min 3 days/month 1 out of 1 month(s)!",
    });
  });
});
