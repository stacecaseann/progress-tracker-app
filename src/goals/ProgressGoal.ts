import type { CheckIn } from "../checkIns/CheckIn";
import { Goal } from "./Goal";
import type { GoalType } from "./GoalType";
import type { ProgressGoalData, ProgressGoalUpdates } from "./ProgressGoalData";
import { ProgressGoalProgress } from "./ProgressGoalProgress";

//The Progress Goal class is a like a Count Goal but has a value and optional date by to complete
//For example, 300 min of practicing the guitar
//Or 1000 hours practicing programming by the end of the year
//This class extends the Goal class

export class ProgressGoal extends Goal {
  public value: number;
  public dateBy: Date | undefined;
  readonly type: GoalType = "progress";

  //The constructor will pass the base data to the Goal class
  constructor(data: ProgressGoalData) {
    super(data);
    this.value = data.value;
    this.dateBy = data.dateBy;
  }

  //This overrides the base class and updates the goal class with the updated data
  override updateGoal(updateData: ProgressGoalUpdates): ProgressGoal {
    return new ProgressGoal({
      ...this,
      ...updateData,
    });
  }

  //This overrides the base class and calculates progress by adding up all the check-ins for this goal
  override calculateProgress(checkIns: CheckIn[]): ProgressGoalProgress {
    const filteredCheckIns = checkIns.filter(
      (checkIn) => checkIn.goalId === this.id
    );
    let total = 0;
    const dateBy = this.dateBy; //for this narrowing to work, I can't use this.dateBy in my else and have it assume it's undefined
    if (dateBy === undefined) {
      total = filteredCheckIns.reduce(
        (total, checkIn) => total + checkIn.value,
        0
      );
    } else {
      total = filteredCheckIns
        .filter((checkIn) => checkIn.checkInDate <= dateBy)
        .reduce((total, checkIn) => total + checkIn.value, 0);
    }
    return {
      type: "progress",
      totalValue: total,
      valueUnit: this.valueUnit,
      description: `You completed ${total}/${this.value} ${this.valueUnit}!`,
      value: this.value,
    };
  }

  //This is a property that returns the description for this type of goal
  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit}`;
  }

  //This converts the Goal object to the Data object that will be saved in the json file
  override toData(): ProgressGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "progress",
      startDate: this.startDate,
      value: this.value,
      valueUnit: this.valueUnit,
      dateBy: this.dateBy,
    };
  }
}
