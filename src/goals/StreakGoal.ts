import type { CheckIn } from "../checkIns/CheckIn";
import { addDay } from "../utils/dateUtil";
import { Goal } from "./Goal";
import type { GoalType } from "./GoalType";
import type { StreakGoalData, StreakGoalUpdates } from "./StreakGoalData";
import type { StreakGoalProgress } from "./StreakGoalProgress";

//The Streak Goal class is a goal where you try to get a streak
//For example practice the piano 30 minutes every day
//Exercise 20 min every day
//Read 10 pages every day
//The deadline is optional
//This class extends the Goal class
export class StreakGoal extends Goal {
  readonly type: GoalType = "streak";
  public value: number;
  public dateBy: Date | undefined;

  //The constructor will pass the base data to the Goal class
  constructor(data: StreakGoalData) {
    super(data);
    this.value = data.value;
    this.dateBy = data.dateBy;
  }

  //This overrides the base class and updates the goal class with the updated data
  override updateGoal(updateData: StreakGoalUpdates): StreakGoal {
    return new StreakGoal({
      ...this,
      ...updateData,
    });
  }

  //This is a property that returns the description for this type of goal
  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit} every day`;
  }

  //This overrides the base class and calculates progress by adding up all the check-ins for this goal
  override calculateProgress(checkIns: CheckIn[]): StreakGoalProgress {
    //need to see how many days in a row they have made it
    //You have a streak of _ days
    const filteredCheckIns = checkIns.filter(
      (checkIn) => checkIn.goalId === this.id
    );
    return this.calculateStreak(filteredCheckIns);
  }

  //Calculates the streak for reporting progress
  calculateStreak(checkIns: CheckIn[]): StreakGoalProgress {
    const totalsByDay = new Map<string, number>();
    checkIns.forEach((checkIn) => {
      const day = checkIn.checkInDate.toDateString();
      const currentTotal = totalsByDay.get(day) ?? 0;
      totalsByDay.set(day, currentTotal + checkIn.value);
    });

    const completedDays: string[] = [...totalsByDay.entries()] //flatten to array
      .filter(([, total]) => total >= this.value) //destructure array, forget the first field
      .map(([day]) => day) //grab the first item
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); //sort loops through and gives a and b to compare

    //now I have the dates in order that meet the requirement of the daily value

    let streak = completedDays.length > 0 ? 1 : 0;
    let longestStreak = 0;
    for (let i = 1; i < completedDays.length; i++) {
      const currentDate = new Date(completedDays[i]!);
      const prevDate = new Date(completedDays[i - 1]!);
      if (addDay(prevDate).getTime() === currentDate.getTime()) {
        streak += 1;
      } else {
        if (streak > longestStreak) longestStreak = streak;
        streak = 1;
      }
    }
    if (streak > longestStreak) longestStreak = streak;

    return {
      type: "streak",
      totalValue: streak,
      value: this.value,
      valueUnit: this.valueUnit,
      description: `You have a streak of ${streak} days!`,
      longestStreak: longestStreak,
    };
  }

  //This converts the Goal object to the Data object that will be saved in the json file
  override toData(): StreakGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "streak",
      startDate: this.startDate,
      value: this.value,
      valueUnit: this.valueUnit,
      dateBy: this.dateBy,
    };
  }
}
