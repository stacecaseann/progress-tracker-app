import type { CheckIn } from "../checkIns/CheckIn";
import {
  addMonth,
  addWeek,
  monthsBetween,
  weeksBetween,
} from "../utils/dateUtil";
import type { FrequencyUnit } from "./FrequencyUnit";
import { Goal } from "./Goal";
import type { GoalType } from "./GoalType";

import type {
  FrequencyGoalData,
  FrequencyGoalUpdates,
} from "./FrequencyGoalData";
import { FrequencyGoalProgress } from "./FrequencyGoalProgress";

//The Frequency Goal class is a goal where you save the value per day and the unit of that value
//For example, 20 min a day, 2 hours a day, 10 pages a day
//You also specify the frequency
//1 day means every day, although as I type it I should probably make this clearer
//frequency: 3, frequency unit: week = 3 days per week
//frequency: 3, frequency unit: month = 3 days per month
//Thedate by is optional
//This class extends the Goal class
export class FrequencyGoal extends Goal {
  public value: number;
  public frequency: number;
  public frequencyUnit: FrequencyUnit;
  public dateBy: Date | undefined;

  readonly type: GoalType = "frequency";
  constructor(data: FrequencyGoalData) {
    super(data);
    this.value = data.value;
    this.frequency = data.frequency;
    this.frequencyUnit = data.frequencyUnit;
    this.dateBy = data.dateBy;
  }

  //The constructor will pass the base data to the Goal class
  calculateFrequency(): string {
    if (this.frequency === 1 && this.frequencyUnit === "day") {
      return "every day";
    }

    if (this.frequencyUnit === "week" || this.frequencyUnit === "month") {
      return `${this.frequency} times per ${this.frequencyUnit}`;
    }

    return "";
  }

  //This overrides the base class and updates the goal class with the updated data
  override updateGoal(updateData: FrequencyGoalUpdates): FrequencyGoal {
    return new FrequencyGoal({
      ...this,
      ...updateData,
    });
  }

  //This is a property that returns the description for this type of goal
  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit} a day ${this.calculateFrequency()}`;
  }

  //This overrides the base class and calculates progress by adding up all the check-ins for this goal
  override calculateProgress(
    checkIns: CheckIn[],
    endDate: Date
  ): FrequencyGoalProgress {
    console.log("Length of checkins" + checkIns.length);
    const filteredCheckIns = checkIns.filter(
      (checkIn) => checkIn.goalId === this.id
    );
    if (this.frequencyUnit === "month") {
      return this.calculateMonthlyProgress(filteredCheckIns, endDate);
    } else {
      return this.calculateDailyOrWeeklyProgress(filteredCheckIns, endDate);
    }
  }

  //Calculates the monthly progress
  calculateMonthlyProgress(
    checkIns: CheckIn[],
    endDate: Date
  ): FrequencyGoalProgress {
    //Don't add up total hours, use 20 min/day, count the days that was reached.
    const daysCompleted: Map<Date, Date[]> = new Map();
    const monthsOfGoal = monthsBetween(this.startDate, endDate);
    let completedMonths = 0;
    let monthStart = this.startDate;
    for (let i = 0; i < monthsOfGoal; i++) {
      let monthEnd = addMonth(monthStart);
      const monthCheckIns = checkIns.filter(
        (checkIn) =>
          checkIn.checkInDate < monthEnd && checkIn.checkInDate >= monthStart
      );

      const totalsByDay = new Map<string, number>();
      //need to loop through months actually
      monthCheckIns.forEach((checkIn) => {
        const day = checkIn.checkInDate.toDateString();
        const currentTotal = totalsByDay.get(day) ?? 0;
        totalsByDay.set(day, currentTotal + checkIn.value);
      });

      const completedDays = [...totalsByDay.values()].filter(
        (total) => total >= this.value
      ).length;
      const completedDaysByDate = [...totalsByDay.entries()]
        .filter(([, total]) => total >= this.value)
        .map(([date]) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      if (completedDays >= this.frequency) {
        completedMonths++;
      }
      daysCompleted.set(monthStart, completedDaysByDate);
      monthEnd = addMonth(monthStart);
    }
    return {
      type: "frequency",
      totalValue: completedMonths,
      valueUnit: this.valueUnit,
      value: this.value,
      description: `You completed ${this.value} ${this.valueUnit} ${this.frequency} days/${this.frequencyUnit} ${completedMonths} out of ${monthsOfGoal} month(s)!`,
      frequency: this.frequency,
      frequencyUnit: this.frequencyUnit,
      progressByDay: daysCompleted,
    };
  }

  //Calculates the progress for daily and weekly goals
  calculateDailyOrWeeklyProgress(
    checkIns: CheckIn[],
    endDate: Date
  ): FrequencyGoalProgress {
    const weeksOfGoal = weeksBetween(this.startDate, endDate);
    const daysCompleted: Map<Date, Date[]> = new Map();
    let completedWeeks = 0;
    let frequency = this.frequency;
    if (this.frequencyUnit === "day") frequency = 7;
    let weekStart = this.startDate;
    for (let i = 0; i < weeksOfGoal; i++) {
      const weekEnd = addWeek(weekStart);
      const weekCheckIns = checkIns.filter(
        (checkIn) =>
          checkIn.checkInDate < weekEnd && checkIn.checkInDate >= weekStart
      );

      const totalsByDay = new Map<string, number>();

      weekCheckIns.forEach((checkIn) => {
        const day = checkIn.checkInDate.toDateString();
        const currentTotal = totalsByDay.get(day) ?? 0;
        totalsByDay.set(day, currentTotal + checkIn.value);
      });
      const completedDays = [...totalsByDay.values()].filter(
        (total) => total >= this.value
      ).length;
      const completedDaysByDate = [...totalsByDay.entries()]
        .filter(([, total]) => total >= this.value)
        .map(([date]) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());
      if (completedDays >= frequency) {
        completedWeeks++;
      }
      daysCompleted.set(weekStart, completedDaysByDate);
      weekStart = weekEnd;
    }
    return {
      type: "frequency",
      totalValue: completedWeeks,
      valueUnit: this.valueUnit,
      value: this.value,
      description:
        this.frequencyUnit === "week"
          ? `You completed ${this.value} ${this.valueUnit} ${this.frequency} days/${this.frequencyUnit} ${completedWeeks} out of ${weeksOfGoal} weeks!`
          : `You completed ${this.value} ${this.valueUnit} every day for ${completedWeeks} out of ${weeksOfGoal} weeks!`,
      frequency: this.frequency,
      frequencyUnit: this.frequencyUnit,
      progressByDay: daysCompleted,
    };
  }

  //This converts the Goal object to the Data object that will be saved in the json file
  override toData(): FrequencyGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "frequency",
      startDate: this.startDate,
      value: this.value,
      valueUnit: this.valueUnit,
      frequency: this.frequency,
      frequencyUnit: this.frequencyUnit,
      dateBy: this.dateBy,
    };
  }
}
